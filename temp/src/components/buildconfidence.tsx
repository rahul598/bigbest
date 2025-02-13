import React from "react";
import { motion } from "framer-motion";

const BuildConfidence: React.FC = () => {
  return (
    
    <div className="bg-confidence">
    <div className="container mx-auto pt-24 ">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Column - Image */}
        <div className="flex justify-center">
        <img
              src="/imggirlbuild.png"
              alt="Excited student"
              className="w-100"
            />
        </div>

        {/* Right Column - Content */}
        <div className="">
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold text-left text-[#22BABB]">
              Mock Exams
              </p>
              <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
              Build Confidence with 11Plus Success Mock Exams
              </h2>
              <p>
              Prepare your child for success with 11Plus Success mock exams, carefully designed to mirror the real exam experience and help students achieve their full potential. Our mock exams provide an invaluable opportunity for students to practice in a realistic, timed environment, helping them become familiar with the exam format and reducing any pre-test anxiety. By simulating the real 11+ conditions, we ensure that your child is not only well-prepared academically but also emotionally and mentally equipped to handle the challenges of the big day. With our decades of expertise in the Trafford Exam process, we aim to instill confidence, sharpen skills, and guide students toward achieving outstanding results.
              </p>
              <div className="my-8">
              <motion.a className="mbtn btn-about">
              Book a Practice Exam
              </motion.a>
              </div>
            </motion.div>
        </div>
      </div>
    </div>        

    </div>
  );
};

export default BuildConfidence;
