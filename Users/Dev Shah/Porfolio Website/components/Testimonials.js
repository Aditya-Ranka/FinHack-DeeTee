"use client";
import { motion } from "framer-motion";

const testimonials = [
  { name: "John Doe", text: "This guy is a coding wizard!" },
  { name: "Jane Smith", text: "Mind-blowing designs, I’m impressed!" },
  { name: "Alex Brown", text: "Highly recommend working with him!" },
];

export default function Testimonials() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-10 py-20">
      <h2 className="text-4xl font-bold mb-10 text-glow">What People Say</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ rotateY: 15 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-black border border-cyan-500 rounded-xl shadow-lg"
          >
            <p className="text-lg italic">"{testimonial.text}"</p>
            <h3 className="text-xl font-bold mt-4">{testimonial.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
