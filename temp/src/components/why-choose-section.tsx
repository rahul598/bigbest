import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { motion } from "framer-motion";

export function WhyChooseSection() {
  const tabData = [
    {
      title: "Tailored Mock Exams",
      imgSrc:
        "https://vinsonedge.com/wp-content/uploads/2025/01/Dashboard-image.png",
    },
    {
      title: "Tailored Mock Exams",
      imgSrc:
        "https://vinsonedge.com/wp-content/uploads/2025/01/Dashboard-image.png",
    },
    {
      title: "Tailored Mock Exams",
      imgSrc:
        "https://vinsonedge.com/wp-content/uploads/2025/01/Dashboard-image.png",
    },
    {
      title: "Tailored Mock Exams",
      imgSrc:
        "https://vinsonedge.com/wp-content/uploads/2025/01/Dashboard-image.png",
    },
    {
      title: "Tailored Mock Exams",
      imgSrc:
        "https://vinsonedge.com/wp-content/uploads/2025/01/Dashboard-image.png",
    },
    {
      title: "Tailored Mock Exams",
      imgSrc:
        "https://vinsonedge.com/wp-content/uploads/2025/01/Dashboard-image.png",
    },
  ];

  return (
    <section className="rahul-t container mx-auto px-4 py-16">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2 text-center">
          <motion.img
            src="https://vinsonedge.com/wp-content/uploads/2025/01/Arrow-2-1.png"
            alt="Floating design"
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
                BENEFITS
              </p>
              <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
                Why Choose 11 Plus-Success
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="col-span-2 text-center">
          <motion.img
            src="https://vinsonedge.com/wp-content/uploads/2025/01/Achievement-icon-1.png"
            alt="Floating design"
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

      {/* Tabs Section */}
      <Tabs defaultValue="tab-0" className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs Buttons */}
          <TabsList className="col-span-6 space-y-4">
            {tabData.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={`tab-${index}`}
                className="px-6 py-3 text-left w-full bg-white text-[#000] border-2 border-[#32DBC9] rounded-lg hover:bg-[#E6FAF8] transition-all duration-200 font-semibold"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tabs Content */}
          <div className="col-span-6">
            {tabData.map((tab, index) => (
              <TabsContent
                key={index}
                value={`tab-${index}`}
                className="grid grid-cols-1 gap-4"
              >
                {/* Right Content */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="bg-[#E6FAF8] rounded-lg p-8">
                    <img
                      src={tab.imgSrc}
                      alt={tab.title}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                  {/* Decorative Blur Elements */}
                  <div className="absolute -z-10 -top-4 -right-4 w-24 h-24 bg-[#32DBC9]/10 rounded-full blur-xl" />
                  <div className="absolute -z-10 -bottom-4 -left-4 w-32 h-32 bg-[#32DBC9]/10 rounded-full blur-xl" />
                </motion.div>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </section>
  );
}
