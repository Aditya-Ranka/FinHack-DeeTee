"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  { title: "Project One", image: "/project1.png" },
  { title: "Project Two", image: "/project2.png" },
  { title: "Project Three", image: "/project3.png" },
];

export default function Projects() {
  return (
    <section className="min-h-screen p-10 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">My Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotateY: 10 }} // 3D Hover Effect
            transition={{ duration: 0.3 }}
            className="relative rounded-xl shadow-lg overflow-hidden p-4 bg-gray-900 border border-cyan-500"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className="rounded-lg"
            />
            <h3 className="absolute bottom-4 left-4 text-white text-lg font-bold">
              {project.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
