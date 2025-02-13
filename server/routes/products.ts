import { Router } from "express";
import { storage } from "../storage";
import type { Request, Response } from "express";

const router = Router();

// Get all active products
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await storage.getProducts();
    // Filter for active products and apply category filter if provided
    const activeProducts = products.filter(p => p.isActive && p.stock > 0);

    // If category is specified, filter by it
    const category = req.query.category as string;
    const filteredProducts = category 
      ? activeProducts.filter(p => p.category === category)
      : activeProducts;

    res.json(filteredProducts);
  } catch (error) {
    console.error("[Products] Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get product by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await storage.getProduct(id);

    if (!product || !product.isActive) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("[Products] Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

export default router;