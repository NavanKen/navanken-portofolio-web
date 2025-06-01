'use client';

import { motion } from 'framer-motion';
import { SkillCard } from '@/components/ui/skill-card';
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiTypescript, 
  SiPhp, 
  SiTailwindcss, 
  SiReact, 
  SiNextdotjs, 
  SiLaravel, 
  SiSupabase, 
  SiMysql, 
  SiPostgresql, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb 
} from 'react-icons/si';

export function SkillsSection() {
  const skills = [
    { icon: <SiHtml5 />, name: 'HTML', color: '#E34F26', delay: 0 },
    { icon: <SiCss3 />, name: 'CSS', color: '#1572B6', delay: 1 },
    { icon: <SiJavascript />, name: 'JavaScript', color: '#F7DF1E', delay: 2 },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6', delay: 3 },
    { icon: <SiPhp />, name: 'PHP', color: '#777BB4', delay: 4 },
    { icon: <SiTailwindcss />, name: 'Tailwind', color: '#06B6D4', delay: 5 },
    { icon: <SiReact />, name: 'React', color: '#61DAFB', delay: 6 },
    { icon: <SiNextdotjs />, name: 'Next.js', color: '#ffffff', delay: 7 },
    { icon: <SiLaravel />, name: 'Laravel', color: '#FF2D20', delay: 8 },
    { icon: <SiSupabase />, name: 'Supabase', color: '#3ECF8E', delay: 9 },
    { icon: <SiMysql />, name: 'MySQL', color: '#4479A1', delay: 10 },
    { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#4169E1', delay: 11 },
    { icon: <SiNodedotjs />, name: 'Node.js', color: '#339933', delay: 12 },
    { icon: <SiExpress />, name: 'Express', color: '#ffffff', delay: 13 },
    { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248', delay: 14 },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Technical Skills
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of technologies and tools I work with to build modern, responsive, and scalable applications.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              icon={skill.icon}
              name={skill.name}
              color={skill.color}
              delay={skill.delay}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
