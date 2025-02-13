import React from "react";
import { motion } from "framer-motion";
import IconGrid from "./ui/icongrid";
import { ArrowRight } from "lucide-react";
export function InteractiveEducation() {
  return (
    <section className="relative py-16 bg-int">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Content */}
        <div>
          <p className="text-sm font-semibold text-left text-[#22BABB]">
          About Us
          </p>
          <motion.h2
            className="text-4xl font-bold text-black mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Big enough to deliver, <br />
            small enough to care.
          </motion.h2>
          <motion.p
            className="text-lg text-black-500 mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The 11Plus-Success approach is based on a results-driven philosophy
            centred on directing your Trafford 11+ journey effectively so your
            time can be focused on driving improvement where it really counts.
          </motion.p>
          <div className="my-5">
           <IconGrid />
          </div>
          <motion.button
            className="mbtn btn-about flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
           More About Us  <span className="ml-3"><ArrowRight /></span>
          </motion.button>
        </div>
        <div>
        {/* Right Column: Image Gallery */}
        <motion.div
          className="flex  gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Left Image */}
          <div className="w-[33%]" >
            <motion.img
              src="https://dtthemes.kinsta.cloud/a-for-apple/wp-content/uploads/sites/2/2024/01/Untitled-11.webp"
              alt="Gallery Image 1"
              className="w-full aimg-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Top Right Video */}
          <div className="w-[67%]">
            <video
              src="https://dtthemes.kinsta.cloud/a-for-apple/wp-content/uploads/sites/2/2024/03/01.mp4"
              autoPlay
              muted
              loop
              className="rounded-lg shadow-lg r-1"
            />
          </div>         
        </motion.div>
        {/* Right Column: Image Gallery */}
        <motion.div
          className="flex gap-4 mt-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Left Image */}
          <div className="w-[67%]" >
          <video
              src="https://dtthemes.kinsta.cloud/a-for-apple/wp-content/uploads/sites/2/2024/03/02.mp4"
              autoPlay
              muted
              loop
              className="rounded-lg shadow-lg r-1"
            />            
          </div>

          {/* Top Right Video */}
          <div className="w-[33%]">
          <motion.img
              src="https://dtthemes.kinsta.cloud/a-for-apple/wp-content/uploads/sites/2/2024/01/Untitled-10.webp"
              alt="Gallery Image 1"
              className="w-full  r-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>         
        </motion.div>
        </div>        
      </div>
    </section>
  );
}

export default InteractiveEducation;
