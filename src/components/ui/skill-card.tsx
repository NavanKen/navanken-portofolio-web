'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  icon: React.ReactNode;
  name: string;
  color?: string;
  delay?: number;
}

export function SkillCard({ icon, name, color = '#ffffff', delay = 0 }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
        "w-24 h-24 sm:w-28 sm:h-28"
      )}
    >
      <div className="text-3xl sm:text-4xl mb-2" style={{ color }}>
        {icon}
      </div>
      <span className="text-xs sm:text-sm text-white/80">{name}</span>
    </motion.div>
  );
}
