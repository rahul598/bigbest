
  import { motion } from "framer-motion";
  import MissionVisionSection from "./MissionVisionSection"

  
  export function HowWeWork() {
    return (
      <section className="relative bgfaq py-16">
        <div className="absolute element-background-overlay"></div>
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="grid grid-cols-12 md:grid-cols-12 gap-4">
  
            {/* Center Title */}
            <div className="col-span-12 md:col-span-12">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-sm font-semibold text-[#22BABB]">
                  How we works
                  </p>
                  <h2 className="text-3xl sm:text-3xl font-bold mb-4 text-[#000]">
                  What Makes Our Teaching Unique
                  </h2>
                </motion.div>
              </div>
            </div>
          </div>
  
          {/* FAQ and Support Section */}
          <MissionVisionSection />
        </div>
        <div className="absolute icon-left z-100">
          <motion.img
            src="https://vedsadhana.com/wp-content/uploads/2025/01/Arrow-5-1.png"
            alt="Floating backpack"
            className="w-[200px]"
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
          <div className="absolute icon-top z-100">
          <motion.img
            src="https://vinsonedge.com/wp-content/uploads/2025/01/galaxy-1.png"
            alt="Floating backpack"
            className="w-[200px]"
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
          <div className="absolute icon-right z-100">
          <motion.img
            src="https://vedsadhana.com/wp-content/uploads/2025/01/wdt-pen-image.png"
            alt="Floating backpack"
            className="w-[200px]"
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
      </section>
    );
  }
  