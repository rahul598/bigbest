import { Card } from "../components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    name: "Saba Maaties",
    rating: 5,
    text: "The ability to collaborate in real-time, combined with powerful project tracking, has made it indispensable for our daily operations. This platform has truly revolutionized the way we work as a team.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Nella Gerarda",
    rating: 5,
    text: "Finxter has helped me learn these firm high-quality websites with 10x the speed. It's a game-changer for anyone looking to build an online presence.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "John Doe",
    rating: 4,
    text: "I need to be a lifelong user. I wake up thinking about all my freelance projects. However, when Fiverr was launched, I was amazed by its smooth performance. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Marie Curie",
    rating: 5,
    text: "Real-time collaboration and powerful tracking features make this platform indispensable. It's a must-have for anyone managing projects in a team environment.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Jane Smith",
    rating: 4,
    text: "The advanced features combined with an intuitive UI make this platform the best option for project management and team collaboration.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Albert Einstein",
    rating: 5,
    text: "The best tool for organizing and managing your projects effectively. My productivity has skyrocketed!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Ada Lovelace",
    rating: 5,
    text: "A revolutionary tool for seamless team management and collaboration. I can't imagine going back to the old ways of managing projects.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Isaac Newton",
    rating: 5,
    text: "This platform has been a game-changer for our team. From task management to real-time updates, it has everything we need.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Grace Hopper",
    rating: 5,
    text: "I can't imagine going back to managing projects without this platform. It has saved us countless hours and improved our efficiency.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    name: "Alan Turing",
    rating: 5,
    text: "A perfect blend of technology and simplicity. This platform delivers excellence in every aspect.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

export function TestimonialSection() {
  const [visibleCount, setVisibleCount] = useState(8); // Initially show 8 testimonials

  const showMore = () => {
    setVisibleCount((prevCount) =>
      prevCount === testimonials.length ? 8 : testimonials.length
    );
  };

  return (
    <section className="testimonial-blur-effect">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 text-center">
            <motion.img
              src="https://vinsonedge.com/wp-content/uploads/2025/01/paper-jet-1.png"
              alt="Floating backpack"
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
                  TESTIMONIALS
                </p>
                <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
                  What students & parents say
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="col-span-2 text-center">
            <motion.img
              src="https://vinsonedge.com/wp-content/uploads/2025/01/pp-1-1.png"
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

        {/* Masonry Layout for Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.slice(0, visibleCount).map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg text-[#2D3648]">
                    {testimonial.name}
                  </h3>
                  <div className="flex gap-1 my-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[#545F71] text-sm leading-relaxed">
                {testimonial.text}
              </p>
            </Card>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        <div className="text-center mt-8 less-more-button">
          <button
            onClick={showMore}
            className="login-btn bg-[#22BABB] text-white px-6 py-2 rounded-md hover:bg-[#1aa3a3] transition-colors duration-300"
          >
            {visibleCount === testimonials.length ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </section>
  );
}
