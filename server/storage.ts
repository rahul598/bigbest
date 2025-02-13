import { 
  users, children, courses, subscriptionPlans, subscriptions,
  carts, cartItems, orders, orderItems, questions, exams,
  progressReports, type User, type Child, type Course,
  type SubscriptionPlan, type Subscription, type Cart,
  type CartItem, type Order, type OrderItem, type Question,
  type Exam, type ProgressReport, type InsertUser, type InsertChild,
  type InsertCourse, type InsertSubscriptionPlan, type InsertSubscription,
  type InsertCart, type InsertCartItem, type InsertOrder,
  type InsertOrderItem, type InsertQuestion, type InsertExam,
  type InsertProgressReport, examResults, type ExamResult, products, type Product, type InsertProduct,
  categories, type Category, type InsertCategory
} from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  deleteUser(id: number): Promise<void>;
  updateUserRefreshToken(userId: number, refreshToken: string | null): Promise<void>;
  updateUserInviteToken(userId: number, inviteToken: string): Promise<void>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;

  // Children
  getChildren(parentId: number): Promise<Child[]>;
  addChild(child: InsertChild): Promise<Child>;
  removeChild(parentId: number, childId: number): Promise<void>;

  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, updates: Partial<Course>): Promise<Course>;

  // Subscription Plans
  getSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  getSubscriptionPlan(id: number): Promise<SubscriptionPlan | undefined>;
  createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan>;

  // Subscriptions
  getUserSubscriptions(userId: number): Promise<Subscription[]>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: number, updates: Partial<Subscription>): Promise<Subscription>;

  // Shopping Cart
  getCart(userId: number): Promise<Cart | undefined>;
  createCart(cart: InsertCart): Promise<Cart>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  removeFromCart(cartId: number, itemId: number): Promise<void>;
  clearCart(cartId: number): Promise<void>;
  getCartItems(cartId: number): Promise<CartItem[]>;

  // Orders
  getOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  addOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;

  // Questions
  getQuestions(): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;

  // Exams
  getExams(): Promise<Exam[]>;
  getExam(id: number): Promise<Exam | undefined>;
  createExam(exam: InsertExam): Promise<Exam>;
  getUserPurchasedExams(userId: number): Promise<Exam[]>;

  // Progress Reports
  getProgressReports(userId: number): Promise<ProgressReport[]>;
  createProgressReport(report: InsertProgressReport): Promise<ProgressReport>;
  getExamResults(userId: number): Promise<ExamResult[]>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, updates: Partial<Product>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  getProductsByCategory(category: string): Promise<Product[]>;

  // Add new methods for categories
  createCategory(category: InsertCategory): Promise<Category>;
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Users implementation
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async updateUserRefreshToken(userId: number, refreshToken: string | null): Promise<void> {
    await db
      .update(users)
      .set({ refreshToken })
      .where(eq(users.id, userId));
  }

  async updateUserInviteToken(userId: number, inviteToken: string): Promise<void> {
    await db
      .update(users)
      .set({ inviteToken })
      .where(eq(users.id, userId));
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Children implementation
  async getChildren(parentId: number): Promise<Child[]> {
    return await db
      .select()
      .from(children)
      .where(eq(children.parentId, parentId));
  }

  async addChild(insertChild: InsertChild): Promise<Child> {
    const [child] = await db.insert(children).values(insertChild).returning();
    return child;
  }

  async removeChild(parentId: number, childId: number): Promise<void> {
    await db
      .delete(children)
      .where(
        and(
          eq(children.parentId, parentId),
          eq(children.childId, childId)
        )
      );
  }

  // Courses implementation
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db.insert(courses).values(insertCourse).returning();
    return course;
  }

  async updateCourse(id: number, updates: Partial<Course>): Promise<Course> {
    const [course] = await db
      .update(courses)
      .set(updates)
      .where(eq(courses.id, id))
      .returning();
    return course;
  }

  // Subscription Plans implementation
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return await db.select().from(subscriptionPlans);
  }

  async getSubscriptionPlan(id: number): Promise<SubscriptionPlan | undefined> {
    const [plan] = await db
      .select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.id, id));
    return plan;
  }

  async createSubscriptionPlan(
    insertPlan: InsertSubscriptionPlan
  ): Promise<SubscriptionPlan> {
    const [plan] = await db
      .insert(subscriptionPlans)
      .values(insertPlan)
      .returning();
    return plan;
  }

  // Subscriptions implementation
  async getUserSubscriptions(userId: number): Promise<Subscription[]> {
    return await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId));
  }

  async createSubscription(
    insertSubscription: InsertSubscription
  ): Promise<Subscription> {
    const [subscription] = await db
      .insert(subscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  async updateSubscription(
    id: number,
    updates: Partial<Subscription>
  ): Promise<Subscription> {
    const [subscription] = await db
      .update(subscriptions)
      .set(updates)
      .where(eq(subscriptions.id, id))
      .returning();
    return subscription;
  }

  // Shopping Cart implementation
  async getCart(userId: number): Promise<Cart | undefined> {
    const [cart] = await db.select().from(carts).where(eq(carts.userId, userId));
    return cart;
  }

  async createCart(insertCart: InsertCart): Promise<Cart> {
    const [cart] = await db.insert(carts).values(insertCart).returning();
    return cart;
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const [item] = await db.insert(cartItems).values(insertCartItem).returning();
    return item;
  }

  async removeFromCart(cartId: number, itemId: number): Promise<void> {
    await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cartId),
          eq(cartItems.id, itemId)
        )
      );
  }

  async clearCart(cartId: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.cartId, cartId));
  }

  async getCartItems(cartId: number): Promise<CartItem[]> {
    return await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartId, cartId));
  }

  // Orders implementation
  async getOrders(userId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId));
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async addOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const [item] = await db.insert(orderItems).values(insertOrderItem).returning();
    return item;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));
  }

  // Questions implementation
  async getQuestions(): Promise<Question[]> {
    return await db.select().from(questions);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const [question] = await db.insert(questions).values(insertQuestion).returning();
    return question;
  }

  // Exams implementation
  async getExams(): Promise<Exam[]> {
    return await db.select().from(exams);
  }

  async getExam(id: number): Promise<Exam | undefined> {
    const [exam] = await db.select().from(exams).where(eq(exams.id, id));
    return exam;
  }

  async createExam(insertExam: InsertExam): Promise<Exam> {
    const [exam] = await db.insert(exams).values(insertExam).returning();
    return exam;
  }

  async getUserPurchasedExams(userId: number): Promise<Exam[]> {
    // Get exams from orders
    const purchasedExams = await db
      .select()
      .from(orderItems)
      .where(
        and(
          eq(orderItems.productType, 'exam'),
          eq(orders.userId, userId)
        )
      )
      .innerJoin(orders, eq(orders.id, orderItems.orderId))
      .innerJoin(exams, eq(exams.id, orderItems.productId));

    return purchasedExams.map(item => item.exams);
  }

  // Progress Reports implementation
  async getProgressReports(userId: number): Promise<ProgressReport[]> {
    return await db
      .select()
      .from(progressReports)
      .where(eq(progressReports.userId, userId));
  }

  async createProgressReport(report: InsertProgressReport): Promise<ProgressReport> {
    const [progressReport] = await db
      .insert(progressReports)
      .values(report)
      .returning();
    return progressReport;
  }
  async getExamResults(userId: number): Promise<ExamResult[]> {
    return await db
      .select()
      .from(examResults)
      .where(eq(examResults.userId, userId));
  }
  // Products implementation
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    const [product] = await db
      .update(products)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.category, category));
  }

  // Categories implementation
  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }
}

export const storage = new DatabaseStorage();