import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { GraduationCap, Users, Brain, Trophy } from "lucide-react";

export function ResultsSection() {
  const results = [
    {
      title: "High Academic Standards",
      description:
        "Our students consistently outperform university averages, demonstrating exceptional academic growth.",
      icon: GraduationCap,
    },
    {
      title: "Parental Satisfaction",
      description:
        "Trusted by Parents and Guardians High satisfaction rates reflect our safe and enriching environment.",
      icon: Users,
    },
    {
      title: "Holistic Development",
      description:
        "Nurturing Well-Rounded Individuals Our approach focuses on character building, creativity, and critical thinking skills.",
      icon: Brain,
    },
    {
      title: "Extracurricular Achievements",
      description:
        "Excellence Beyond Academics Our students shine in sports, arts, and community service, showcasing diverse talents.",
      icon: Trophy,
    },
  ];

  return (
    <section className="relative py-16 bgResult">
      <div className="container mx-auto">
        <div className="flex">
          <div className="md:w-[40%] w-[100%] p-4">
            {/* Header */}
            <div className="">
              <div className="">
                <div className="text-left mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-sm font-semibold text-[#22BABB]">
                      Our Results
                    </p>
                    <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
                      Our Results Speak for Themselves
                    </h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>

                    <motion.img
                      src="https://vinsonedge.com/wp-content/uploads/2025/01/counter-h2-tp-img-1.png"
                      alt="Floating backpack"
                      className="w-full mt-5"
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
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[60%] w-[100%]">
            <div className="flex flex-wrap">
              <div className="fiTem-card">
                <div className="r-item">
                  <motion.img
                    src="https://vinsonedge.com/wp-content/uploads/2025/01/Achieving-icon-1.png"
                    alt="Floating backpack"
                    className="w-[180px] m-auto"
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
                  <div className="contet-title">
                    <h3 className="text-xl font-bold mb-2">
                      High Academic Standards
                    </h3>
                    <h6>Achieving Top Grades Across All Subjects</h6>
                    <p>
                      Our students consistently outperform national averages,
                      demonstrating exceptional understanding and application.
                    </p>
                  </div>
                </div>
              </div>
              <div className="fiTem-card">
                <div className="r-item">
                  <motion.img
                    src="https://vinsonedge.com/wp-content/uploads/2025/01/Development-icon-1.png"
                    alt="Floating backpack"
                    className="w-[180px] m-auto"
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
                  <div className="contet-title">
                    <h3 className="text-xl font-bold mb-2">
                      Holistic Development
                    </h3>
                    <h6>Nurturing Well-Rounded Individuals</h6>
                    <p>
                      Beyond academics, we focus on character building,
                      creativity, and critical thinking skills.
                    </p>
                  </div>
                </div>
              </div>
              <div className="fiTem-card">
                <div className="r-item">
                  <motion.img
                    src="https://vinsonedge.com/wp-content/uploads/2025/01/Satisfaction-icon-1.png"
                    alt="Floating backpack"
                    className="w-[180px] m-auto"
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
                  <div className="contet-title">
                    <h3 className="text-xl font-bold mb-2">
                      Parental Satisfaction
                    </h3>
                    <h6>Trusted by Parents and Guardians</h6>
                    <p>
                      High satisfaction rates reflect our commitment to
                      providing a supportive and enriching environment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="fiTem-card">
                <div className="r-item">
                  <motion.img
                    src="https://vinsonedge.com/wp-content/uploads/2025/01/Achievement-icon-2.png"
                    alt="Floating backpack"
                    className="w-[180px] m-auto"
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
                  <div className="contet-title">
                    <h3 className="text-xl font-bold mb-2">
                      Extracurricular Achievements
                    </h3>
                    <h6>Excelling Beyond the Classroom</h6>
                    <p>
                      Our students shine in sports, arts, and community service,
                      showcasing diverse talents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
