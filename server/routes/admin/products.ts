import { Router } from "express";
import { storage } from "../../storage";
import { insertProductSchema, type Product, UserRole, type User } from "@shared/schema";
import type { Request, Response } from "express";
import { authenticateJWT, requireRole } from "../../auth";

const router = Router();

// Update the request type to include the user property
interface AuthRequest extends Request {
  user?: User;
}

// Get all products - Admin only
router.get("/", authenticateJWT, requireRole([UserRole.ADMIN]), async (_req: AuthRequest, res: Response) => {
  try {
    const products = await storage.getProducts();
    res.json(products);
  } catch (error) {
    console.error("[Admin Products] Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Create new product - Admin only
router.post("/", authenticateJWT, requireRole([UserRole.ADMIN]), async (req: AuthRequest, res: Response) => {
  try {
    const result = insertProductSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid request body", 
        details: result.error.errors 
      });
    }

    const product = await storage.createProduct(result.data);
    res.status(201).json(product);
  } catch (error) {
    console.error("[Admin Products] Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update product - Admin only
router.patch("/:id", authenticateJWT, requireRole([UserRole.ADMIN]), async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Use partial schema validation for updates
    const result = insertProductSchema.partial().safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid request body", 
        details: result.error.errors 
      });
    }

    // Verify product exists before update
    const existingProduct = await storage.getProduct(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = await storage.updateProduct(id, result.data);
    res.json(product);
  } catch (error) {
    console.error("[Admin Products] Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Sample products data
const sampleProducts = [
  {
    name: "Mock Exam - Mathematics",
    description: "Test your skills in Algebra, Geometry, and Trigonometry.",
    price: "10.99",
    category: "mathematics",
    stock: 100,
    isActive: true,
  },
  {
    name: "Mock Exam - Science",
    description: "Prepare for Physics, Chemistry, and Biology exams.",
    price: "12.99",
    category: "science",
    stock: 100,
    isActive: true,
  },
  {
    name: "English Comprehension Bundle",
    description: "Complete set of English comprehension practice papers",
    price: "15.99",
    category: "english",
    stock: 100,
    isActive: true,
  },
  {
    name: "Complete Mock Exam Package",
    description: "Full set of mock exams covering all subjects",
    price: "29.99",
    category: "bundle",
    stock: 100,
    isActive: true,
  }
];

// New endpoint to seed sample products - Admin only
router.post("/seed", authenticateJWT, requireRole([UserRole.ADMIN]), async (_req: AuthRequest, res: Response) => {
  try {
    const products = await Promise.all(
      sampleProducts.map(product => storage.createProduct(product))
    );
    res.status(201).json(products);
  } catch (error) {
    console.error("[Admin Products] Error seeding products:", error);
    res.status(500).json({ error: "Failed to seed products" });
  }
});

// Delete product - Admin only
router.delete("/:id", authenticateJWT, requireRole([UserRole.ADMIN]), async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const existingProduct = await storage.getProduct(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    await storage.deleteProduct(id);
    res.sendStatus(200);
  } catch (error) {
    console.error("[Admin Products] Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;