import Banner from "../../components/banner";
import { motion } from "framer-motion";
import ContactForm  from "../../components/contact-section";
import GoogleMapEmbed from "../../components/GoogleMapEmbed";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="relative">
      <Banner title="Contact Us" />
      <div className="container mx-auto mt-32 mb-16 px-4">    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-left">
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold text-[#22BABB]">CONTACT US</p>
              <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
              Get In Touch With Us
              </h2>
            </motion.div>          

        </div>
        <div className="text-left"> 
        We are here to help you every step of the way. Whether you have questions, need assistance, or want to learn more about our 11+ exam preparation services, feel free to reach out.
        </div>
      </div>      
      </div>      
      <ContactForm />
      <GoogleMapEmbed />
      </main>
    </div>
  );
}