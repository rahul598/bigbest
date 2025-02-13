import React, { useState } from "react";
import { motion } from "framer-motion";
// Define TypeScript types for mock exam data
interface MockExam {
  id: number;
  title: string;
  description: string;
  subject: string;
  price: number;
  duration: string;
  level: string;
}

const MockExamSection: React.FC = () => {
  // Hardcoded mock exam data
  const mockExams: MockExam[] = [
    {
      id: 1,
      title: "Mock Exam - Mathematics",
      description: "Test your skills in Algebra, Geometry, and Trigonometry.",
      subject: "Mathematics",
      price: 10.99,
      duration: "2 hours",
      level: "Intermediate",
    },
    {
      id: 2,
      title: "Mock Exam - Science",
      description: "Prepare for Physics, Chemistry, and Biology exams.",
      subject: "Science",
      price: 12.99,
      duration: "1.5 hours",
      level: "Advanced",
    },
    {
      id: 3,
      title: "Mock Exam - History",
      description: "Challenge your knowledge of world history.",
      subject: "History",
      price: 9.99,
      duration: "1 hour",
      level: "Beginner",
    },
    {
      id: 4,
      title: "Mock Exam - Physics",
      description: "Assess your understanding of Physics concepts.",
      subject: "Physics",
      price: 11.99,
      duration: "2 hours",
      level: "Advanced",
    },
  ];

  const [subject, setSubject] = useState<string>("");
  const [level, setLevel] = useState<string>("");

  // Filter exams based on subject and level
  const filteredExams = mockExams.filter((exam) => {
    const subjectMatch = subject ? exam.subject === subject : true;
    const levelMatch = level ? exam.level === level : true;
    return subjectMatch && levelMatch;
  });

  return (
    <div className="mock-exam-section py-16">
        {/* Header */}
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 text-center">
            <motion.img
              src="/wdt-pen-image.png"
              alt="Floating backpack"
              className="w-[100px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </div>

          <div className="col-span-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm font-semibold text-center text-[#22BABB]">
                TAILORED EXAMS
                </p>
                <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
                Tailored Mock Exams for 11+ Success
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="col-span-2 text-center">
            <motion.img
              src="/books-icon.png"
              alt="Floating backpack"
              className="w-full"
              whileHover={{
                scale: 1.1,
                rotate: 10,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            />
          </div>
        </div>
        </div>

      {/* Exam Grid */}
      <div className="exam-grid">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => (
            <div key={exam.id} className="exam-card">
              <h2>{exam.title}</h2>
              <p>{exam.description}</p>
              <p><strong>Subject:</strong> {exam.subject}</p>
              <p><strong>Level:</strong> {exam.level}</p>
              <p><strong>Duration:</strong> {exam.duration}</p>
              <p><strong>Price:</strong> ${exam.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No mock exams found based on your filters.</p>
        )}
      </div>
    </div>
  );
};

export default MockExamSection;
