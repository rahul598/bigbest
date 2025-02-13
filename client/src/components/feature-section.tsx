import { useState } from "react";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";

export function FeatureSection() {
  const [selectedFeature, setSelectedFeature] = useState<null | {
    title: string;
    Subtitles: string;
    description: string;
  }>(null);

  const features = [
    {
      title: "Performance",
      Subtitles: "Skill-Based Feedback",
      description:
        "Skill-Based Feedback Reports highlighting specific strengths and weaknesses in Verbal Reasoning, English, Mathematics",
      image:
        "https://vinsonedge.com/wp-content/uploads/2025/01/Performance-icon-1.png",
      imageD:
        "https://vinsonedge.com/wp-content/uploads/2025/01/star-lots-1.png",
      animation: { rotate: [0, 360], scale: [1, 1.2, 1] },
      transition: { duration: 5, repeat: Infinity, ease: "linear" },
      className: "feat1",
    },
    {
      title: "Gamification",
      Subtitles: "Gamification for Students",
      description:
        "Badges for milestones like 'First Mock Completed' or 'Top 10% in Verbal Reasoning'.",
      image:
        "https://vinsonedge.com/wp-content/uploads/2025/01/Gamification-icon-1.png",
      imageD: "https://vedsadhana.com/wp-content/uploads/2025/01/Group-7.png",
      whileHover: {
        scale: 1.1,
        rotate: 10,
      },
      hoverTransition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
      className: "feat2",
    },
    {
      title: "Availability",
      Subtitles: "Scheduling and Availability Management",
      description:
        "Flexible booking options with multiple dates and locations for mock exams.",
      image:
        "https://vinsonedge.com/wp-content/uploads/2025/01/Availability-1.png",
      imageD:
        "https://vinsonedge.com/wp-content/uploads/2025/01/apple-cloud-1.png",
      animation: { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] },
      transition: { duration: 3, repeat: Infinity, ease: "easeOut" },
      className: "feat3",
    },
    {
      title: "Analytics",
      Subtitles: "Advanced Analytics and Recommendations",
      description:
        "Highlight trends over time, showing improvement or areas needing extra attention.",
      image: "https://vinsonedge.com/wp-content/uploads/2025/01/Analytics.png",
      imageD:
        "https://vinsonedge.com/wp-content/uploads/2025/01/draw-star-1.png",
      animation: { rotate: [0, 360], scale: [1, 1.3, 1.2] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      className: "feat4",
    },
  ];

  return (
    <section className="">
        <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2 text-center">
          <motion.img
            src="https://vinsonedge.com/wp-content/uploads/2025/01/galaxy-1.png"
            alt="Floating backpack"
            className="w-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
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
                FEATURES
              </p>
              <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
                Unique Approaches To Teaching Combined Technology & Learning.
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="col-span-2 text-center">
          <motion.img
            src="https://vinsonedge.com/wp-content/uploads/2025/01/Arrow-2.png"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="relative p-6 f-card">
              <div className="flex flex-col h-full">
                <div className="items-center mb-4">
                  <h3 className="text-3xl font-semibold">{feature.title}</h3>
                  <h6 className="my-3">{feature.Subtitles}</h6>
                  <p className="text-black/80 mb-4 flex-grow">
                    {feature.description}
                  </p>
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-[#78D6CC] to-[#96D2F0] text-black font-semibold rounded-[25px] border-[1px] border-black shadow-[3px_3px_0_0_#000000] hover:scale-105 transition-transform"
                    onClick={() => setSelectedFeature(feature)}
                  >
                    Learn more →
                  </button>
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="max-w-xs mt-4 mx-auto"
                  />
                  <motion.img
                    src={feature.imageD}
                    alt={feature.title}
                    className={`absolute w-[80px] h-[80px] ${feature.className}`}
                    {...(feature.animation && { animate: feature.animation })}
                    {...(feature.whileHover && { whileHover: feature.whileHover })}
                    transition={
                      feature.whileHover && feature.hoverTransition
                        ? feature.hoverTransition
                        : feature.transition || undefined
                    }
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedFeature && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-black bg-gray-200 rounded-full p-2"
              onClick={() => setSelectedFeature(null)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedFeature.title}</h2>
            <p className="text-gray-700">{selectedFeature.description}</p>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
