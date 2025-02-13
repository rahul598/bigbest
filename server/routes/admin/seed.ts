import { Router } from "express";
import { storage } from "../../storage";
import { UserRole } from "@shared/schema";
import type { Request, Response } from "express";
import { authenticateJWT, requireRole } from "../../auth";
import { hashPassword } from "../../passwordUtils";

const router = Router();

// Sample teacher data
const sampleTeacher = {
  email: "teacher@example.com",
  password: "teacher123",
  firstName: "John",
  lastName: "Smith",
  role: UserRole.TEACHER,
  status: "active",
};

// Sample categories
const sampleCategories = [
  { name: "Mathematics", description: "Mathematics related questions" },
  { name: "English", description: "English language and comprehension" },
  { name: "Science", description: "Science topics including Physics, Chemistry, Biology" },
  { name: "Verbal Reasoning", description: "Verbal reasoning practice questions" },
  { name: "Non-verbal Reasoning", description: "Non-verbal reasoning practice questions" }
];

// Sample questions
const sampleQuestions = [
  {
    title: "Basic Arithmetic",
    content: "What is 15 + 27?",
    category: "Mathematics",
    difficulty: "easy",
    correctAnswer: "42",
    explanation: "Simple addition of 15 and 27 equals 42",
  },
  {
    title: "English Comprehension",
    content: "What is the main idea of the given passage?",
    category: "English",
    difficulty: "medium",
    correctAnswer: "The author's perspective on climate change",
    explanation: "The passage primarily discusses the author's views on climate change",
  },
  // More sample questions for each category
];

// Seed teacher account
router.post("/teacher", authenticateJWT, requireRole([UserRole.ADMIN]), async (_req: Request, res: Response) => {
  try {
    // Check if teacher already exists
    const existingTeacher = await storage.getUserByEmail(sampleTeacher.email);
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher account already exists" });
    }

    // Create teacher account with hashed password
    const hashedPassword = await hashPassword(sampleTeacher.password);
    const teacher = await storage.createUser({
      ...sampleTeacher,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Teacher account created successfully",
      credentials: {
        email: sampleTeacher.email,
        password: sampleTeacher.password,
        url: "/teacher/dashboard"
      }
    });
  } catch (error) {
    console.error("[Seed] Error creating teacher account:", error);
    res.status(500).json({ error: "Failed to create teacher account" });
  }
});

// Seed categories
router.post("/categories", authenticateJWT, requireRole([UserRole.ADMIN]), async (_req: Request, res: Response) => {
  try {
    const categories = await Promise.all(
      sampleCategories.map(category => storage.createCategory(category))
    );
    res.status(201).json(categories);
  } catch (error) {
    console.error("[Seed] Error seeding categories:", error);
    res.status(500).json({ error: "Failed to seed categories" });
  }
});

// Seed questions
router.post("/questions", authenticateJWT, requireRole([UserRole.ADMIN]), async (req: Request, res: Response) => {
  try {
    const questions = await Promise.all(
      sampleQuestions.map(question => storage.createQuestion({
        ...question,
        authorId: req.user!.id
      }))
    );
    res.status(201).json(questions);
  } catch (error) {
    console.error("[Seed] Error seeding questions:", error);
    res.status(500).json({ error: "Failed to seed questions" });
  }
});

export default router;
