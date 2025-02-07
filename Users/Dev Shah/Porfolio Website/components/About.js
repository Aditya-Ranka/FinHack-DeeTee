"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-black text-white px-10 py-20">
      {/* Image Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <Image
          src="/profile-pic.png"
          alt="My Picture"
          width={400}
          height={400}
          className="rounded-full border-4 border-cyan-500 shadow-lg"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-4xl font-bold mb-4 text-glow">Who Am I?</h2>
        <p className="text-lg opacity-80">
          A passionate developer blending creativity & technology to craft digital experiences.
        </p>
      </motion.div>
    </section>
  );
}
