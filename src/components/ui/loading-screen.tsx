"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps = {}) {
  const [loading, setLoading] = useState(true);
  const [stars, setStars] = useState<
    Array<{ top: string; left: string; size: string; delay: string }>
  >([]);
  const [hyperspaceStars, setHyperspaceStars] = useState<
    Array<{ delay: number; direction: number }>
  >([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      delay: `${Math.random() * 5 + 3}s`,
    }));
    setStars(newStars);

    const newHyperspaceStars = Array.from({ length: 20 }).map((_, i) => ({
      delay: i * 0.1,
      direction: i % 2 === 0 ? 1 : -1,
    }));
    setHyperspaceStars(newHyperspaceStars);

    const checkThreeSpaceLoaded = () => {
      const threeCanvas = document.querySelector("canvas");
      if (threeCanvas) {
        setTimeout(() => {
          setLoading(false);
          if (onLoadingComplete) onLoadingComplete();
        }, 500);
        return true;
      }
      return false;
    };

    if (!checkThreeSpaceLoaded()) {
      const interval = setInterval(() => {
        if (checkThreeSpaceLoaded()) {
          clearInterval(interval);
        }
      }, 100);

      const fallbackTimer = setTimeout(() => {
        clearInterval(interval);
        setLoading(false);
        if (onLoadingComplete) onLoadingComplete();
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(fallbackTimer);
      };
    }
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0">
              {stars.map((star, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    width: star.size,
                    height: star.size,
                    top: star.top,
                    left: star.left,
                    opacity: 0.8,
                    animation: `twinkle ${star.delay} infinite`,
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              {hyperspaceStars.map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-500"
                  initial={{
                    width: "2px",
                    height: "2px",
                    x: 0,
                    y: 0,
                    opacity: 1,
                  }}
                  animate={{
                    width: ["2px", "4px", "8px", "16px"],
                    height: ["2px", "4px", "8px", "16px"],
                    x: [0, star.direction * 1000],
                    y: [0, (i % 3 === 0 ? 1 : -1) * 800],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: star.delay,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [1, 30, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="absolute inset-x-0 bottom-20 flex flex-col items-center">
              <motion.h2
                className="text-2xl font-bold text-white mb-4"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Entering Galaxy
              </motion.h2>

              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
