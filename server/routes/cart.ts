import { Router } from "express";
import { storage } from "../storage";
import { insertCartItemSchema, UserRole } from "@shared/schema";
import type { Request, Response } from "express";
import { authenticateJWT } from "../auth";

// Define AuthUser type that matches JWT payload
interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: typeof UserRole[keyof typeof UserRole];
  status: 'active' | 'inactive';
}

// Define a complete AuthRequest type that matches the schema
interface AuthRequest extends Request {
  user?: AuthUser;
}

const router = Router();
let stripe: any;

// Initialize Stripe if key is available
if (process.env.STRIPE_SECRET_KEY) {
  import('stripe').then((Stripe) => {
    stripe = new Stripe.default(process.env.STRIPE_SECRET_KEY!);
  }).catch(err => {
    console.error('Failed to initialize Stripe:', err);
  });
}

// Get cart items
router.get("/items", authenticateJWT, async (req: AuthRequest, res: Response) => {
  console.log("[Cart] Getting cart items for user:", req.user?.id);

  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const cart = await storage.getCart(req.user.id);
    if (!cart) {
      console.log("[Cart] Creating new cart for user:", req.user.id);
      await storage.createCart({ userId: req.user.id });
      return res.json([]);
    }

    const items = await storage.getCartItems(cart.id);
    console.log("[Cart] Found items:", items.length);
    res.json(items);
  } catch (error) {
    console.error("[Cart] Error fetching cart items:", error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// Add item to cart
router.post("/items", authenticateJWT, async (req: AuthRequest, res: Response) => {
  console.log("[Cart] Adding item to cart for user:", req.user?.id, "Item:", req.body);

  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = insertCartItemSchema.safeParse({
      ...req.body,
      price: String(req.body.price), // Convert price to string
      quantity: 1 // Force quantity to be 1
    });

    if (!result.success) {
      console.log("[Cart] Invalid request body:", result.error);
      return res.status(400).json({ error: "Invalid request body", details: result.error.errors });
    }

    let cart = await storage.getCart(req.user.id);
    if (!cart) {
      console.log("[Cart] Creating new cart for user:", req.user.id);
      cart = await storage.createCart({ userId: req.user.id });
    }

    // Check if item already exists in cart
    const existingItems = await storage.getCartItems(cart.id);
    const isDuplicate = existingItems.some(
      item => item.productType === result.data.productType &&
              item.productId === result.data.productId
    );

    if (isDuplicate) {
      return res.status(400).json({ error: "Item already exists in cart" });
    }

    const cartItem = await storage.addToCart({
      cartId: cart.id,
      ...result.data
    });

    console.log("[Cart] Successfully added item:", cartItem);
    res.status(201).json(cartItem);
  } catch (error) {
    console.error("[Cart] Error adding item to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// Remove item from cart
router.delete("/items/:itemId", authenticateJWT, async (req: AuthRequest, res: Response) => {
  console.log("[Cart] Removing item for user:", req.user?.id, "Item ID:", req.params.itemId);

  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const cart = await storage.getCart(req.user.id);
    if (!cart) {
      console.log("[Cart] Cart not found for user:", req.user.id);
      return res.status(404).json({ error: "Cart not found" });
    }

    await storage.removeFromCart(cart.id, parseInt(req.params.itemId));
    console.log("[Cart] Successfully removed item");
    res.sendStatus(200);
  } catch (error) {
    console.error("[Cart] Error removing item from cart:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

// Create checkout session
router.post("/checkout", authenticateJWT, async (req: AuthRequest, res: Response) => {
  console.log("[Cart] Creating checkout session for user:", req.user?.id);

  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!stripe) {
      return res.status(503).json({
        error: "Payment system is currently unavailable",
        message: "Payment system will be available soon"
      });
    }

    const cart = await storage.getCart(req.user.id);
    if (!cart) {
      console.log("[Cart] Cart not found for user:", req.user.id);
      return res.status(404).json({ error: "Cart not found" });
    }

    const items = await storage.getCartItems(cart.id);
    if (!items.length) {
      console.log("[Cart] Cart is empty for user:", req.user.id);
      return res.status(400).json({ error: "Cart is empty" });
    }

    console.log("[Cart] Creating Stripe checkout session with items:", items);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productType === "exam" ? "Exam" : "Subscription",
          },
          unit_amount: Math.round(Number(item.price) * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL || 'http://localhost:3000'}/cart`,
      customer_email: req.user.email,
    });

    console.log("[Cart] Checkout session created:", session.id);
    res.json({ url: session.url });
  } catch (error) {
    console.error("[Cart] Checkout error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;