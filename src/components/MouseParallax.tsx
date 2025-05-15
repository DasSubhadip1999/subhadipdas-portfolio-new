"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MouseParallax() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
      />
      <motion.div
        className="fixed -z-10 pointer-events-none w-64 h-64 rounded-full"
        animate={{
          x: mousePosition.x - 490,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{
          background: "radial-gradient(circle at center, rgba(17, 219, 64, 0.64) 0%, transparent 70%)",
        }}
      />
    </>
  );
} 

