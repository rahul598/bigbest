import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const instagramImages = [
  "https://dtthemes.kinsta.cloud/a-for-apple/wp-content/uploads/sites/2/2024/02/home-4-instagram-image-101.jpg",
  "https://dtthemes.kinsta.cloud/a-for-apple/wp-content/uploads/sites/2/2024/02/home-4-instagram-image-102.jpg",
  "https://dtthemes.kinsta.cloud/a-for-apple/wp-content/uploads/sites/2/2024/02/home-4-instagram-image-103.jpg",
  "https://dtthemes.kinsta.cloud/a-for-apple/wp-content/uploads/sites/2/2024/02/home-4-instagram-image-104.jpg",
  "https://dtthemes.kinsta.cloud/a-for-apple/wp-content/uploads/sites/2/2024/02/home-4-instagram-image-105.jpg",
  "https://dtthemes.kinsta.cloud/a-for-apple/wp-content/uploads/sites/2/2024/02/home-4-instagram-image-106.jpg",
];

export function Footer() {
  return (
    <div className="bgf pt-16 mt-5 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 text-center"></div>

          <div className="col-span-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
                  Follow Instagram @11plus_success
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="col-span-2 text-center">
            <motion.img
              src="https://vinsonedge.com/wp-content/uploads/2025/01/3d-star-1.png"
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
      </div>
      <footer className="mar-15 relative bg-[#006D77] text-white">
        {/* Instagram Section */}
        <div className="container mx-auto py-12">
          <div className="absloute mb-12 mMacl">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                stopOnLastSlide: false,
                reverseDirection: false,
              }}
              speed={5000}
              breakpoints={{
                640: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 6,
                },
              }}
              className="instagram-feed-swiper"
            >
              {[...instagramImages, ...instagramImages].map((image, index) => (
                <SwiperSlide key={index}>
                    <motion.div
                        className={`p-1 bg-white transform ${
                        index % 2 === 0 ? "rotate-[9deg]" : "rotate-[-16deg]"
                        }`}
                    >
                    <img
                      src={image}
                      alt={`Instagram post ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="text-center items-center flex ">
          <motion.img
            src="https://vinsonedge.com/wp-content/uploads/2025/01/start-Design-1-1.png"
            alt="Floating backpack"
            className="w-[80px] m-auto"
          />
        </div>           
          {/* Wave Divider */}
          <div className="w-full h-12 bg-[url('https://vinsonedge.com/wp-content/uploads/2025/01/wave.svg')] bg-repeat-x"></div>

          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
            <div>
                <img
                    src="https://vinsonedge.com/wp-content/uploads/2025/01/Logo-3.png"
                    alt="11 Plus Success"
                    className="w-32 mb-4" />  
              <p>11plus-success is an interactive platform designed to prepare Year 5 students for the Trafford Consortium 11+ exams.</p> 
              <h3 className="font-bold mb-4 mt-4">Social Media</h3>
              <div className="flex space-x-4">
                <div className="circle bg-[#fff] hover:bg-[#000] p-2 rounded-full">
                <a href="#" className="text-[#000] hover:text-[#fff]">
                  <Facebook className="h-5 w-5" />
                </a>                    
                </div>
                <div className="circle bg-[#fff] hover:bg-[#000] p-2 rounded-full">
                <a href="#" className="text-[#000] hover:text-[#fff]">
                  <Twitter className="h-5 w-5" />
                </a>
                </div>
                <div className="circle bg-[#fff] hover:bg-[#000] p-2 rounded-full">
                <a href="#" className="text-[#000] hover:text-[#fff]">
                  <Instagram className="h-5 w-5" />
                </a>
                </div>
              </div>              
            </div>

            <div> 
              <h3 className="font-bold mb-4 mt-4">Get In Touch</h3> 
              <p>1234- Lorem Ipsum Lorem Ipsum Lorem Ipsum </p> 
              <p><a href="tel:+44 123 456 7890">Call Us :+44 123 456 7890</a> </p> 
              <p><a href="mailto:admin@example.com">E-Mail : admin@example.com</a></p>          
            </div>            

            <div>
              <h3 className="font-bold mb-4">Useful Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/shipping-policy" className="hover:underline">
                  Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="/refund" className="hover:underline">
                  Refund and Returns Policy
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* <div>
              <h3 className="font-bold mb-4">Customer Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/communication" className="hover:underline">
                    Communication
                  </a>
                </li>
                <li>
                  <a href="/curriculum" className="hover:underline">
                    Our Curriculum
                  </a>
                </li>
                <li>
                  <a href="/educator" className="hover:underline">
                    Our Educator
                  </a>
                </li>
                <li>
                  <a href="/mock-exams" className="hover:underline">
                    Mock Exams
                  </a>
                </li>
              </ul>
            </div> */}

            <div>
              <h3 className="font-bold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-sm mb-4">Get latest updates and news.</p>
              <div className="gap-2">
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  className="bg-[#ffffff4d] text-black placeholder-white border-none rounded-3xl w-full mb-4"
                />
                <Button className="bg-[#2DC9A2] text-[#fff] hover:bg-[#2BC4B4] rounded-3xl w-full">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="border-t bg-[#2DC9A2] border-white/20 pt-5 pb-5">
            <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm mb-4 md:mb-0 text-[#fff]">
                © 2025 11Plus Success. All Rights Reserved.
              </p>
              </div>
            </div>
          </div>      
    </div>
  );
}
