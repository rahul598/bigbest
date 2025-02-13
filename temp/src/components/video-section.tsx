import { motion } from "framer-motion";

export function VideoSection() {
  return (
    <section className="bgVideo">
      <div className="container mx-auto px-4 py-24">
        <div className="v-0">
          <motion.video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-[100%] m-auto min-h-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
