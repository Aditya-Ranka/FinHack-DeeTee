"use client";
import { motion } from "framer-motion";
import { FaCode, FaPaintBrush, FaMobileAlt } from "react-icons/fa";

const services = [
  { title: "Web Development", icon: <FaCode />, color: "border-cyan-500" },
  { title: "UI/UX Design", icon: <FaPaintBrush />, color: "border-pink-500" },
  { title: "Mobile Apps", icon: <FaMobileAlt />, color: "border-purple-500" },
];

export default function Services() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-10 py-20">
      <h2 className="text-4xl font-bold mb-10 text-glow">What I Do</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`p-6 border-2 ${service.color} rounded-xl text-center shadow-lg`}
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold">{service.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
