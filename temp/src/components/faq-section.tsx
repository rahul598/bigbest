import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../components/ui/accordion";
  import { motion } from "framer-motion";
  
  export function FAQSection() {
    const faqs = [
      {
        question: "What is 11 Plus-Success, and how does it help students?",
        answer:
          "11+ Success is an interactive platform designed to provide Year 5 students with comprehensive preparation and personalized learning tools to help students excel in their preparation journey.",
      },
      {
        question: "How do I book a mock exam?",
        answer:
          "You can easily book mock exams through our platform. Simply log in, navigate to the mock exam section, and choose your preferred date and time slot.",
      },
      {
        question: "Can I track my child's performance?",
        answer:
          "Yes, our platform provides detailed performance tracking and analytics for each student, allowing parents to monitor progress and identify areas for improvement.",
      },
      {
        question: "What subjects are included in the mock exams?",
        answer:
          "Our mock exams cover all key 11+ subjects including Verbal Reasoning, Non-Verbal Reasoning, English, and Mathematics.",
      },
      {
        question: "Is there a free trial available?",
        answer:
          "Yes, we offer a free trial period to help you experience our platform and its features before making a commitment.",
      },
      {
        question: "What are the subscription plans available?",
        answer:
          "We offer flexible subscription plans including monthly, annual, and custom packages to suit your needs.",
      },
    ];
  
    return (
      <section className="bgfaq py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Floating Image */}
            <div className="md:col-span-2 text-center hidden md:block">
              <motion.img
                src="https://vinsonedge.com/wp-content/uploads/2025/01/abc-1-1.png"
                alt="Floating design"
                className="w-[80px] mx-auto"
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
  
            {/* Center Title */}
            <div className="col-span-1 md:col-span-8">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-sm font-semibold text-[#22BABB]">
                    KIDS EDUCATION QUERIES
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#000]">
                    Frequently Asked Questions
                  </h2>
                </motion.div>
              </div>
            </div>
  
            {/* Right Floating Image */}
            <div className="md:col-span-2 text-center hidden md:block">
              <motion.img
                src="https://vinsonedge.com/wp-content/uploads/2025/01/wdt-pen-image-1.png"
                alt="Floating design"
                className="w-[80px] mx-auto"
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
  
          {/* FAQ and Support Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-1 md:col-span-8 faqBack bg-white p-6 rounded-lg shadow-lg"
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-[#2D3648] hover:text-[#32DBC9]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#545F71]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
  
            {/* Support & App Download */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-1 md:col-span-4 flex flex-col items-center justify-center gap-8"
            >
              {/* Support Section */}
              <div className="text-center bg-[#DAEDFF] p-6 rounded-lg shadow-md w-full">
                <motion.img
                  src="https://vinsonedge.com/wp-content/uploads/2025/01/Support-1.png"
                  alt="Support"
                  className="w-full mx-auto mb-4"
                />
                <h3 className="text-lg font-bold mb-2 text-[#2D3648]">
                  Need Support?
                </h3>
                <p className="text-sm text-[#545F71] mb-4">
                  Reach out to us for quick and reliable assistance.
                </p>
                <div className="flex gap-4 justify-center">
                  <a href="tel:+1234567890">
                    <motion.img
                      src="https://vinsonedge.com/wp-content/uploads/2025/01/Call.png"
                      alt="call"
                      className="w-full"
                    />
                  </a>
                  <a href="mailto:someone@example.com">
                    <motion.img
                      src="https://vinsonedge.com/wp-content/uploads/2025/01/Msg-1.png"
                      alt="Support"
                      className="w-full"
                    />
                  </a>
                </div>
              </div>
  
              {/* App Download Section */}
              <div className="text-center bg-[#8CFFB0] p-6 rounded-lg shadow-md w-full">
                <h3 className="text-lg font-bold mb-4 text-[#2D3648]">
                  Download Our App
                </h3>
                <div className="flex gap-4 justify-center">
                  <a href="#" className="hover:opacity-80">
                    <img
                      src="https://vinsonedge.com/wp-content/uploads/2025/01/playstore.png"
                      alt="Google Play"
                      className="h-10"
                    />
                  </a>
                  <a href="#" className="hover:opacity-80">
                    <img
                      src="https://vinsonedge.com/wp-content/uploads/2025/01/app-store.png"
                      alt="App Store"
                      className="h-10"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
  