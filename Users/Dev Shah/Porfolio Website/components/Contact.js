"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Contact() {
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { scale: 1 },
      { scale: 1.05, repeat: -1, yoyo: true, duration: 0.8, ease: "easeInOut" }
    );
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-lg p-8 rounded-xl border border-cyan-500 shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6 text-glow">Get in Touch</h2>
        
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Your Name" className="input-style" />
          <input type="email" placeholder="Your Email" className="input-style" />
          <textarea placeholder="Your Message" className="input-style h-32"></textarea>

          <button ref={buttonRef} className="btn-neon">Send Message</button>
        </form>
      </div>
    </section>
  );
}
