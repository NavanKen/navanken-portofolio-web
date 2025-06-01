'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface FloatingPlanetProps {
  src: string;
  alt: string;
  size: number;
  position: { x: string; y: string };
  duration?: number;
  delay?: number;
  distance?: number;
}

export function FloatingPlanet({
  src,
  alt,
  size,
  position,
  duration = 20,
  delay = 0,
  distance = 10,
}: FloatingPlanetProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: position.y,
        left: position.x,
        width: size,
        height: size,
      }}
      initial={{ y: 0 }}
      animate={{
        y: [0, distance, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        priority
        className="rounded-full object-cover"
      />
    </motion.div>
  );
}
