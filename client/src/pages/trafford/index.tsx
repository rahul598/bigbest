import Banner from "../../components/banner";
import { motion } from "framer-motion";
import { TestimonialSection } from "../../components/testimonial-section";
import { FAQSection } from "../../components/faq-section";

export default function TraffordPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        <Banner
          title="Trafford 11+ Info
for parents"
        />
        <div className="container my-16">
          <img
            src="https://vedsadhana.com/wp-content/uploads/2025/02/blog-detail-image-105-1-1.png"
            alt="Your Guide to Trafford 11+ Success"
            className="w-full"
          />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <div className="text-left mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
                    Your Guide to Trafford 11+ Success
                  </h2>
                  <div className="my-5">
                    <h4>About the Trafford Consortium</h4>
                    <p>
                      The Trafford Consortium administers the 11+ exams for
                      students aiming to gain admission to grammar schools in
                      the Trafford area. This consortium ensures that all
                      participating schools follow a standardized testing
                      process, making the selection process fair and consistent
                      for all applicants.
                    </p>
                  </div>
                  <div className="my-5">
                    <h4>Skills Assessed</h4>
                    <p>
                      The Trafford exams focus on evaluating students in four
                      primary skill areas:
                    </p>
                    <ul className="list-disc list-inside">
                      <li>
                        Verbal Reasoning: Comprehension, vocabulary, and logic
                      </li>
                      <li>
                        Non-Verbal Reasoning: Pattern recognition and spatial
                        reasoning.
                      </li>
                      <li>
                        Mathematics: Arithmetic, problem-solving, and reasoning
                        skills.
                      </li>
                      <li>
                        English: Grammar, comprehension, and written expression.
                      </li>
                    </ul>
                  </div>
                  <div className="my-5">
                    <h4>Outcomes</h4>
                    <p>
                      Performance in the Trafford exams determines eligibility
                      for entry into grammar schools within the consortium. The
                      results provide parents with valuable insights into their
                      child’s academic strengths and areas for improvement,
                      offering a roadmap for further preparation or alternative
                      education plans.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <a
                    href="https://www.google.com/maps?q=28.6139,77.2090"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
                      <img
                        src="https://vedsadhana.com/wp-content/uploads/2025/02/Location-Pin.png"
                        alt="Straight Line Distance Calculator"
                        className="block m-auto"
                      />
                      Straight Line Distance Calculator
                    </h2>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
