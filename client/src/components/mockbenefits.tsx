import { motion } from "framer-motion";

const benefits = [
  {
    icon: "https://vedsadhana.com/wp-content/uploads/2025/02/rb_7554-1.png",
    title: "Accurate Preparation",
    description:
      "Experience an exam environment that mimics the actual 11+ tests, allowing your child to become familiar with the structure, time conditions, and reporting. This helps in reducing surprises on the real exam day.",
  },
  {
    icon: "https://vedsadhana.com/wp-content/uploads/2025/02/rb_2151295078-1.png",
    title: "Confidence Boost",
    description:
      "Help your child feel more confident and less anxious by exposing them to a real exam-like setting. Repeated practice builds their self-belief and equips them to handle pressure on the big day with ease.",
  },
  {
    icon: "https://vedsadhana.com/wp-content/uploads/2025/02/rb_2151392802-1.png",
    title: "Performance Insights",
    description:
      "Gain valuable and detailed feedback to identify your child's strengths and areas for improvement. The data provides you with actionable insights to focus on topics that need the most attention during the preparation phase.",
  },
];

export default function MockBenefits() {
  return (
    <section className="py-20 bg-benefits mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 ">
          <p className="text-sm font-semibold text-[#22BABB] uppercase tracking-wide">
            BENEFITS
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Benefits of Attending a Mock Exam
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className=""
            >
              <div className="flex flex-col items-center text-center">
                <motion.img
                  src={benefit.icon}
                  alt={benefit.title}
                  className="object-contain mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-justify leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
