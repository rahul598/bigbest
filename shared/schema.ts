import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const UserRole = {
  ADMIN: 'admin',
  TEACHER: 'teacher', 
  STUDENT: 'student',
  PARENT: 'parent',
} as const;

export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export const OrderStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export const SubscriptionStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.PARENT] }).notNull().default(UserRole.STUDENT),
  status: text("status", { enum: [UserStatus.ACTIVE, UserStatus.INACTIVE] }).notNull().default(UserStatus.ACTIVE),
  createdAt: timestamp("created_at").defaultNow(),
  emailVerified: boolean("email_verified").default(false),
  refreshToken: text("refresh_token"),
  inviteToken: text("invite_token"),
});

// Children table for parent-child relationships
export const children = pgTable("children", {
  id: serial("id").primaryKey(),
  parentId: integer("parent_id").references(() => users.id).notNull(),
  childId: integer("child_id").references(() => users.id).notNull(),
  relationship: text("relationship").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  authorId: integer("author_id").references(() => users.id),
  thumbnail: text("thumbnail"),
  content: jsonb("content"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Products table for store items
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  imageUrl: text("image_url"),
  stock: integer("stock").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

// Subscription Plans table
export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  interval: text("interval").notNull(), // monthly, yearly
  features: jsonb("features"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Subscriptions table
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  planId: integer("plan_id").references(() => subscriptionPlans.id),
  status: text("status", { 
    enum: [SubscriptionStatus.ACTIVE, SubscriptionStatus.INACTIVE, 
           SubscriptionStatus.CANCELLED, SubscriptionStatus.EXPIRED] 
  }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Shopping Cart table
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

// Cart Items table
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id").references(() => carts.id),
  productType: text("product_type").notNull(), // 'exam' or 'course'
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  status: text("status", { 
    enum: [OrderStatus.PENDING, OrderStatus.COMPLETED, 
           OrderStatus.FAILED, OrderStatus.REFUNDED] 
  }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  paymentIntentId: text("payment_intent_id"),
  shippingAddress: jsonb("shipping_address"),
  billingAddress: jsonb("billing_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Order Items table
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  productType: text("product_type").notNull(), // 'exam' or 'course'
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Questions table
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory").notNull(),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Exams table with additional fields
export const exams = pgTable("exams", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  authorId: integer("author_id").references(() => users.id),
  questions: jsonb("questions").notNull(),
  pdfUrl: text("pdf_url"),
  duration: integer("duration").notNull(),
  scheduledFor: timestamp("scheduled_for"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Exam Results table
export const examResults = pgTable("exam_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  examId: integer("exam_id").references(() => exams.id),
  score: integer("score").notNull(),
  grade: text("grade").notNull(),
  status: text("status", { enum: ["passed", "failed", "pending"] }).notNull(),
  date: timestamp("date").defaultNow(),
});

// Progress Reports table
export const progressReports = pgTable("progress_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(),
  period: text("period").notNull(),
  subject: text("subject").notNull(),
  performance: text("performance", { 
    enum: ["excellent", "good", "average", "poor"] 
  }).notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Add types exports
export type User = typeof users.$inferSelect;
export type Child = typeof children.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Cart = typeof carts.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type Exam = typeof exams.$inferSelect;
export type ExamResult = typeof examResults.$inferSelect;
export type ProgressReport = typeof progressReports.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;

// Add insert types
export type InsertUser = typeof users.$inferInsert;
export type InsertChild = typeof children.$inferInsert;
export type InsertCourse = typeof courses.$inferInsert;
export type InsertSubscriptionPlan = typeof subscriptionPlans.$inferInsert;
export type InsertSubscription = typeof subscriptions.$inferInsert;
export type InsertCart = typeof carts.$inferInsert;
export type InsertCartItem = typeof cartItems.$inferInsert;
export type InsertOrder = typeof orders.$inferInsert;
export type InsertOrderItem = typeof orderItems.$inferInsert;
export type InsertQuestion = typeof questions.$inferInsert;
export type InsertExam = typeof exams.$inferInsert;
export type InsertExamResult = typeof examResults.$inferInsert;
export type InsertProgressReport = typeof progressReports.$inferInsert;
export type InsertProduct = typeof products.$inferInsert;
export type InsertCategory = typeof categories.$inferInsert;

// Insert schemas
export const insertUserSchema = createInsertSchema(users);
export const insertChildSchema = createInsertSchema(children);
export const insertCourseSchema = createInsertSchema(courses);
export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);
export const insertSubscriptionSchema = createInsertSchema(subscriptions);
export const insertCartSchema = createInsertSchema(carts);
export const insertCartItemSchema = createInsertSchema(cartItems);
export const insertOrderSchema = createInsertSchema(orders);
export const insertOrderItemSchema = createInsertSchema(orderItems);
export const insertQuestionSchema = createInsertSchema(questions);
export const insertExamSchema = createInsertSchema(exams);
export const insertExamResultSchema = createInsertSchema(examResults);
export const insertProgressReportSchema = createInsertSchema(progressReports);
export const insertProductSchema = createInsertSchema(products);
export const insertCategorySchema = createInsertSchema(categories);

// Add validation
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email format"),
});