import React from "react";
import { motion } from "framer-motion";
import breadimg from "../assets/bgbrucumb.png";
import borderimg from "../assets/bread-crumb.png";

interface AboutBannerProps {
  title: string; // 
}

const AboutBanner: React.FC<AboutBannerProps> = ({ title }) => {
  return (
    <section className="relative min-h-[300px] flex items-center bg-gradient-to-b from-[#e9f7fc] to-[#d0f1fa]">
      <div className="absolute inset-0">
        <img src={breadimg} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Content Overlay */}
      <div className="relative container mx-auto px-4 z-10 text-center">
        <motion.h1
          className="text-4xl font-bold text-black mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title} 
        </motion.h1>

        {/* Animated Breadcrumb */}
        <motion.p
          className="text-sm text-gray-600"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          / {title}
        </motion.p>
      </div>

      {/* Bottom Decorations */}
      <motion.div
        className="absolute bottom-0 w-full"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img src={borderimg} alt="Bottom Decoration" className="w-full h-auto" />
      </motion.div>
    </section>
  );
};

export default AboutBanner;
