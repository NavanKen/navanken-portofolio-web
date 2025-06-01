"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const allProjects: Project[] = [
  {
    id: 1,
    title: "SD Mutiara Hikmah PPDB Web ",
    description: "Website used by SD Mutiara Hikmah for accepting new students",
    image: "/projects/web-mutiara-hikmah.png",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    link: "https://mutiara-hikmah.vercel.app/",
  },
  {
    id: 2,
    title: "Putra Store",
    description:
      "Putra Store is a web-based platform I built to explore how game top-up systems work. This project helped me dive into Midtrans payment integration, as well as improve my skills in UI/UX design and real-world transactional flows.",
    image: "/projects/web-putra-store.png",
    tags: ["Laravel", "Supabase", "React", "Midtrans"],
    link: "#",
  },
  {
    id: 3,
    title: "Odoo Pesantren",
    description:
      "The Pesantren Management Application is designed to meet the needs of modern pesantren administration. With a focus on efficiency, transparency, and integration, this application includes various key modules that support the overall operational management of pesantren.",
    image: "/projects/web-odoo-pesantren.png",
    tags: ["Odoo", "PostgreSQL", "owl"],
    link: "https://aplikasi.dqi.ac.id/psb",
  },
  {
    id: 4,
    title: "PRIMA ODOO",
    description:
      "This project is an example implementation of integration between React as the frontend and Odoo as the backend using REST API. The application is a simple registration system for Teachers, Students, and Staff at Prima school.",
    image: "/projects/web-prima-odoo.png",
    tags: ["React", "Odoo", "PostgreSQL", "API"],
    link: "https://github.com/NavanKen/Prima-React-Odoo",
  },
  {
    id: 5,
    title: "NavanKen Portofolio",
    description:
      "A responsive portfolio website built with Next.js, Three.js, and Tailwind CSS.",
    image: "/projects/navanken_portofolio.png",
    tags: ["Next.js", "Three.js", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/NavanKen/navanken-portofolio-web",
  },
  {
    id: 6,
    title: "Freelancer",
    description:
      "freelancer is a clone of fiveer, so I created this website to learn nuxtjs and at the same time try to clone fiveer, which is an application used for freelancing.",
    image: "/projects/project-3.svg",
    tags: ["Nuxt.js", "Supabase", "Tailwind CSS"],
    link: "#",
  },
];

interface ProjectsGridProps {
  showAll?: boolean;
}

export default function ProjectsGrid({ showAll = false }: ProjectsGridProps) {
  // If showAll is true, display all projects, otherwise just show the first 3
  const projects = showAll ? allProjects : allProjects.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={project.link}
          className="text-white hover:text-white no-underline inline-flex items-center relative group overflow-hidden"
        >
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            View Project
          </span>
          <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
    </motion.div>
  );
}
