"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FloatingPlanet } from "@/components/ui/floating-planet";

export function HeroSection() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <FloatingPlanet
        src="/planets/planet-1.svg"
        alt="Planet"
        size={80}
        position={{ x: "10%", y: "20%" }}
        duration={15}
      />
      <FloatingPlanet
        src="/planets/planet-2.svg"
        alt="Planet"
        size={60}
        position={{ x: "85%", y: "15%" }}
        duration={20}
        delay={2}
      />
      <FloatingPlanet
        src="/planets/planet-3.svg"
        alt="Planet"
        size={120}
        position={{ x: "75%", y: "70%" }}
        duration={25}
        delay={1}
      />

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 text-sm md:text-base text-blue-400"
          >
            Hello, I&apos;m Naufal Hafizh Ghani Afandi 👋
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400"
          >
            Passionate Full-Stack Developer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            Turning ideas into seamless digital experiences. I focus on crafting
            full-stack applications using modern tools—balancing clean code,
            performance, and design that speaks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="glow" size="lg">
              Contact Me
            </Button>
            <Button variant="outline" size="lg">
              View Projects
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 text-gray-400 text-sm">
        {isMounted && <span id="current-time">{currentTime}</span>}
      </div>
    </section>
  );
}
