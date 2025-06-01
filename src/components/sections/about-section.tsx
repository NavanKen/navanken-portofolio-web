"use client";

import { motion } from "framer-motion";
import { FloatingPlanet } from "@/components/ui/floating-planet";

export function AboutSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <FloatingPlanet
        src="/planets/planet-4.svg"
        alt="Planet"
        size={100}
        position={{ x: "5%", y: "30%" }}
        duration={18}
        delay={1}
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              About Me
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Hello! I&apos;m Naufal Hafizh Ghani Afandi, a passionate
                full-stack developer based in Malang, East Java, Indonesia.
              </p>

              <p>
                I&apos;m currently a student at SMKN 8 Malang, majoring in
                Software Engineering (RPL). My main background is in backend
                development, but I&apos;m now focused on becoming a full-stack
                developer with a strong interest in JavaScript, TypeScript, and
                web design.
              </p>

              <p>
                My journey in development started with a curiosity about how
                websites work, and it has grown into a passion for building
                clean, functional, and visually appealing digital experiences.
              </p>

              <p>
                When I&apos;m not coding, I love exploring new tech, or enjoying
                the beautiful views around East Java.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Education
            </h3>

            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-white">SMKN 8 Malang</span>
                  <span className="text-gray-400">2023 – Present</span>
                </div>
                <p className="text-gray-300">Software Engineering (RPL)</p>
              </div>

              <div className="border border-white/10 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-white">MTsN 3 Malang</span>
                  <span className="text-gray-400">2020 – 2023</span>
                </div>
                <p className="text-gray-300">Junior High School</p>
              </div>

              <div className="border border-white/10 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-white">SD Ummu Aiman</span>
                  <span className="text-gray-400">2014 – 2020</span>
                </div>
                <p className="text-gray-300">Elementary School</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
