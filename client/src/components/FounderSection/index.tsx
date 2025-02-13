import React from "react";
import { motion } from "framer-motion";
interface FounderItem {
  title: string;
  description: string[];
  image: string;
}

const FounderSection: React.FC<{ data: FounderItem }> = ({ data }) => {
  return (
    <div className="bg-int max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="md:grid md:grid-cols-2 md:items-start md:gap-2 xl:gap-0">
        {/* Image Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <img className="rounded-xl f-b m-auto" src={data.image} alt="Founder Image" />
        </motion.div>

        <motion.div
          className="mt-5 sm:mt-10 lg:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2 md:space-y-4">
              <motion.h2
                className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {data.title}
              </motion.h2>

              <motion.div
                className="text-gray-500 dark:text-neutral-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
               
                {data.description.map((descrip, index) => (
                <motion.div
                  key={index}
                  className="flex gap-x-3"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="grow mb-3">
                    <p className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                      {descrip}
                    </p>
                  </div>
                </motion.div>
              ))}    
           <div>
           <h3 className="text-[30px]">Shana Ali</h3>
            <span className="text-sm text-gray-500 dark:text-neutral-500">Founder & CEO</span>
           </div>            
              </motion.div>
            </div>


          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FounderSection;

