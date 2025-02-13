import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { type User, UserRole, UserStatus } from "@shared/schema";
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

const scryptAsync = promisify(scrypt);
const JWT_SECRET = process.env.REPL_ID || 'dev-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-dev-secret';

// Generate a random password
function generateRandomPassword() {
  return randomBytes(12).toString('hex');
}

// Rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again later'
});

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

function generateTokens(user: User) {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}

export function setupAuth(app: Express) {
  // Session setup
  app.use(session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: app.get("env") === "production",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  app.use(passport.initialize());

  // Regular login endpoint
  app.post("/api/login", loginLimiter, async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await comparePasswords(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const tokens = generateTokens(user);
      await storage.updateUserRefreshToken(user.id, tokens.refreshToken);

      // Send user data without password
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        user: userWithoutPassword,
        tokens
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const existingUser = await storage.getUserByEmail(req.body.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await hashPassword(req.body.password);
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword,
        status: UserStatus.ACTIVE,
        role: UserRole.STUDENT
      });

      const tokens = generateTokens(user);
      await storage.updateUserRefreshToken(user.id, tokens.refreshToken);

      // Send user data without password
      const { password: _, ...userWithoutPassword } = user;

      res.status(201).json({
        user: userWithoutPassword,
        tokens
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  // Token refresh endpoint
  app.post("/api/refresh-token", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    try {
      const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: number };
      const user = await storage.getUser(payload.id);

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const tokens = generateTokens(user);
      await storage.updateUserRefreshToken(user.id, tokens.refreshToken);

      res.json({ tokens });
    } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  });

  // Logout endpoint
  app.post("/api/logout", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = jwt.verify(token, JWT_SECRET) as { id: number };
        await storage.updateUserRefreshToken(payload.id, null);
      } catch (error) {
        // Token verification failed, but we'll still clear the session
      }
    }
    res.sendStatus(200);
  });

  // User info endpoint
  app.get("/api/user", authenticateJWT, (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  });

  // Add new endpoint for inviting teachers
  app.post("/api/admin/invite-teacher", authenticateJWT, requireRole([UserRole.ADMIN]), async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Generate random password
      const password = generateRandomPassword();
      const hashedPassword = await hashPassword(password);

      // Create teacher account
      const user = await storage.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: UserRole.TEACHER,
        status: UserStatus.ACTIVE
      });

      // Return user info and generated password
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({
        ...userWithoutPassword,
        password // Include the generated password in response
      });
    } catch (error) {
      console.error('Teacher invitation error:', error);
      res.status(500).json({ message: "Failed to invite teacher" });
    }
  });


  // Only setup Google OAuth if credentials are available
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await storage.getUserByEmail(profile.emails?.[0]?.value || `${profile.id}@google.com`);
        if (!user) {
          user = await storage.createUser({
            firstName: profile.displayName?.split(' ')[0] || 'Google',
            lastName: profile.displayName?.split(' ')[1] || 'User',
            email: profile.emails?.[0]?.value || `${profile.id}@google.com`,
            password: await hashPassword(randomBytes(16).toString('hex')),
            role: UserRole.STUDENT,
            status: UserStatus.ACTIVE
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }));

    // Add Google OAuth routes
    app.get('/api/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    app.get('/api/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/auth' }),
      (req, res) => {
        const tokens = generateTokens(req.user as User);
        res.redirect(`/auth?tokens=${encodeURIComponent(JSON.stringify(tokens))}`);
      }
    );
  }

  // Only setup Facebook OAuth if credentials are available
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ['id', 'emails', 'name']
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await storage.getUserByEmail(profile.emails?.[0]?.value || `${profile.id}@facebook.com`);
        if (!user) {
          user = await storage.createUser({
            firstName: profile.name?.givenName || 'Facebook',
            lastName: profile.name?.familyName || 'User',
            email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`,
            password: await hashPassword(randomBytes(16).toString('hex')),
            role: UserRole.STUDENT,
            status: UserStatus.ACTIVE
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }));

    // Add Facebook OAuth routes
    app.get('/api/auth/facebook',
      passport.authenticate('facebook', { scope: ['email'] })
    );

    app.get('/api/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/auth' }),
      (req, res) => {
        const tokens = generateTokens(req.user as User);
        res.redirect(`/auth?tokens=${encodeURIComponent(JSON.stringify(tokens))}`);
      }
    );
  }


  app.use(passport.session());
  createAdminUserIfNeeded();
}

async function createAdminUserIfNeeded() {
  try {
    const adminUser = await storage.getUserByEmail('admin@example.com');
    if (!adminUser) {
      const hashedPassword = await hashPassword('admin123'); // Default admin password
      await storage.createUser({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE
      });
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Failed to create admin user:', error);
  }
}

export function authenticateJWT(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(roles: (typeof UserRole)[keyof typeof UserRole][]) {
  return (req: Request & { user?: User }, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}