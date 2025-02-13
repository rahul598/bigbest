import { comparePasswords } from './passwordUtils';
import type { Express, Request as ExpressRequest, Response } from "express";
import { createServer, type Server } from "http";
import { setupAuth, requireRole, authenticateJWT } from "./auth";
import { storage } from "./storage";
import { UserRole } from "@shared/schema";
import sgMail from '@sendgrid/mail';
import { hashPassword } from './passwordUtils';
import cartRouter from "./routes/cart";
import productsRouter from "./routes/products";
import adminProductsRouter from "./routes/admin/products";
import seedRouter from "./routes/admin/seed";

// Define AuthUser type that matches JWT payload
interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: typeof UserRole[keyof typeof UserRole];
  status: 'active' | 'inactive';
}

// Define AuthRequest type that extends Express Request
interface AuthRequest extends ExpressRequest {
  user?: AuthUser;
}

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export function registerRoutes(app: Express): Server {
  // Setup authentication
  setupAuth(app);

  // Register public routes first
  app.use("/api/products", productsRouter);

  // Register cart routes
  app.use("/api/cart", cartRouter);

  // Admin routes
  app.use("/api/admin/products", adminProductsRouter);
  app.use("/api/admin/seed", seedRouter);

  // Mock exam routes - using the same products router but with category filter
  app.get("/api/mock-exams", async (req: AuthRequest, res: Response) => {
    try {
      const products = await storage.getProducts();
      // Filter for mock exam products only
      const mockExams = products.filter(p =>
        p.isActive &&
        p.stock > 0 &&
        (p.category === "mathematics" || p.category === "science" || p.category === "english")
      );
      res.json(mockExams);
    } catch (error) {
      console.error("[Mock Exams] Error fetching mock exams:", error);
      res.status(500).json({ error: "Failed to fetch mock exams" });
    }
  });

  app.get("/api/admin/users", requireRole([UserRole.ADMIN]), async (req: AuthRequest, res: Response) => {
    const users = await storage.getAllUsers();
    res.json(users);
  });

  app.post("/api/admin/users", requireRole([UserRole.ADMIN]), async (req: AuthRequest, res: Response) => {
    try {
      const existingUser = await storage.getUserByEmail(req.body.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.delete("/api/admin/users/:id", requireRole([UserRole.ADMIN]), async (req: AuthRequest, res: Response) => {
    try {
      await storage.deleteUser(parseInt(req.params.id));
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  app.post("/api/admin/users/:id/invite", requireRole([UserRole.ADMIN]), async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!process.env.SENDGRID_API_KEY) {
        return res.status(500).json({ message: "Email service not configured" });
      }

      // Generate invite link
      const inviteToken = Math.random().toString(36).substring(7);
      await storage.updateUserInviteToken(user.id, inviteToken);

      const inviteLink = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/auth?invite=${inviteToken}`;

      // Send invitation email
      await sgMail.send({
        to: user.email,
        from: 'noreply@yourdomain.com', // Update this
        subject: 'Invitation to join LMS Platform',
        text: `You've been invited to join the LMS Platform. Click here to accept: ${inviteLink}`,
        html: `
          <h1>Welcome to LMS Platform</h1>
          <p>You've been invited to join as a ${user.role}.</p>
          <p>Click the link below to set up your account:</p>
          <a href="${inviteLink}">Accept Invitation</a>
        `,
      });

      res.sendStatus(200);
    } catch (error) {
      console.error('Invitation error:', error);
      res.status(500).json({ message: "Failed to send invitation" });
    }
  });

  // Questions routes
  app.get("/api/questions", requireRole([UserRole.ADMIN, UserRole.TEACHER]), async (req: AuthRequest, res: Response) => {
    const questions = await storage.getQuestions();
    res.json(questions);
  });

  app.post("/api/questions", requireRole([UserRole.ADMIN, UserRole.TEACHER]), async (req: AuthRequest, res: Response) => {
    const question = await storage.createQuestion({
      ...req.body,
      authorId: req.user!.id
    });
    res.status(201).json(question);
  });

  // Exams routes
  app.get("/api/exams", authenticateJWT, async (req: AuthRequest, res: Response) => {
    const exams = await storage.getExams();
    res.json(exams);
  });

  app.post("/api/exams", authenticateJWT, requireRole([UserRole.ADMIN, UserRole.TEACHER]), async (req: AuthRequest, res: Response) => {
    const exam = await storage.createExam({
      ...req.body,
      authorId: req.user!.id
    });
    res.status(201).json(exam);
  });

  // Exam Results route
  app.get("/api/exams/results", authenticateJWT, async (req: AuthRequest, res: Response) => {
    try {
      // Get exam results for the authenticated user
      const results = await storage.getExamResults(req.user!.id);
      res.json(results);
    } catch (error) {
      console.error('Failed to fetch exam results:', error);
      res.status(500).json({ message: "Failed to fetch exam results" });
    }
  });

  // Progress Reports route
  app.get("/api/reports", authenticateJWT, async (req: AuthRequest, res: Response) => {
    try {
      // Get progress reports for the authenticated user
      const reports = await storage.getProgressReports(req.user!.id);
      res.json(reports);
    } catch (error) {
      console.error('Failed to fetch progress reports:', error);
      res.status(500).json({ message: "Failed to fetch progress reports" });
    }
  });

  // Subscription routes
  app.post("/api/subscriptions", authenticateJWT, async (req: AuthRequest, res: Response) => {
    const subscription = await storage.createSubscription({
      userId: req.user!.id,
      ...req.body
    });
    res.status(201).json(subscription);
  });

  // Cart routes are now handled by cartRouter


  app.delete("/api/cart/:itemId", authenticateJWT, async (req: AuthRequest, res: Response) => {
    try {
      const cart = await storage.getCart(req.user!.id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      await storage.removeFromCart(cart.id, parseInt(req.params.itemId));
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  app.post("/api/cart/clear", authenticateJWT, async (req: AuthRequest, res: Response) => {
    try {
      const cart = await storage.getCart(req.user!.id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      await storage.clearCart(cart.id);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  app.get("/api/user", authenticateJWT, (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  });

  app.put("/api/user/profile", authenticateJWT, async (req: AuthRequest, res: Response) => {
    try {
      const { firstName, lastName, email, currentPassword, newPassword } = req.body;
      if (!req.user?.id) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const userId = req.user.id;

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValidPassword = await comparePasswords(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      const updates: Partial<User> = { firstName, lastName, email };
      if (newPassword) {
        updates.password = await hashPassword(newPassword);
      }

      const updatedUser = await storage.updateUser(userId, updates);
      const { password: _, ...userWithoutPassword } = updatedUser;

      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });


  // Children routes
  app.get("/api/children", authenticateJWT, requireRole([UserRole.PARENT]), async (req: AuthRequest, res: Response) => {
    try {
      const children = await storage.getChildren(req.user!.id);
      res.json(children);
    } catch (error) {
      console.error('Failed to fetch children:', error);
      res.status(500).json({ message: "Failed to fetch children" });
    }
  });

  app.post("/api/children", authenticateJWT, requireRole([UserRole.PARENT]), async (req: AuthRequest, res: Response) => {
    try {
      const { email, relationship } = req.body;

      // Get the child's user account
      const child = await storage.getUserByEmail(email);
      if (!child) {
        return res.status(404).json({ message: "No user found with this email" });
      }

      if (child.role !== UserRole.STUDENT) {
        return res.status(400).json({ message: "The specified user is not a student" });
      }

      // Add child relationship
      const childRelation = await storage.addChild({
        parentId: req.user!.id,
        childId: child.id,
        relationship,
      });

      res.status(201).json(childRelation);
    } catch (error) {
      console.error('Failed to add child:', error);
      res.status(500).json({ message: "Failed to add child" });
    }
  });

  app.delete("/api/children/:id", authenticateJWT, requireRole([UserRole.PARENT]), async (req: AuthRequest, res: Response) => {
    try {
      const childId = parseInt(req.params.id);
      await storage.removeChild(req.user!.id, childId);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to remove child:', error);
      res.status(500).json({ message: "Failed to remove child" });
    }
  });

  app.get("/api/children/:id/exams", authenticateJWT, requireRole([UserRole.PARENT]), async (req: AuthRequest, res: Response) => {
    try {
      const childId = parseInt(req.params.id);

      // Verify parent-child relationship
      const children = await storage.getChildren(req.user!.id);
      if (!children.some(child => child.childId === childId)) {
        return res.status(403).json({ message: "Not authorized to view this child's exams" });
      }

      const results = await storage.getExamResults(childId);
      res.json(results);
    } catch (error) {
      console.error('Failed to fetch child exam results:', error);
      res.status(500).json({ message: "Failed to fetch exam results" });
    }
  });

  app.get("/api/children/:id/reports", authenticateJWT, requireRole([UserRole.PARENT]), async (req: AuthRequest, res: Response) => {
    try {
      const childId = parseInt(req.params.id);

      // Verify parent-child relationship
      const children = await storage.getChildren(req.user!.id);
      if (!children.some(child => child.childId === childId)) {
        return res.status(403).json({ message: "Not authorized to view this child's reports" });
      }

      const reports = await storage.getProgressReports(childId);
      res.json(reports);
    } catch (error) {
      console.error('Failed to fetch child progress reports:', error);
      res.status(500).json({ message: "Failed to fetch progress reports" });
    }
  });


  const httpServer = createServer(app);
  return httpServer;
}