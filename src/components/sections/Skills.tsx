"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate, createScope, stagger, spring } from "animejs";
import {
  SiTypescript, SiPython, SiJavascript, SiCplusplus, SiR,
  SiNextdotjs, SiReact, SiTailwindcss, SiRedux, SiThreedotjs, SiFramer, SiShadcnui,
  SiNodedotjs, SiExpress, SiFastapi, SiGraphql, SiSocketdotio,
  SiMysql, SiMongodb, SiPostgresql, SiSupabase, SiPrisma, SiRedis,
  SiGit, SiDocker, SiKubernetes, SiGithub, SiPostman, SiLinux, SiVercel, SiNginx,
  SiGooglecloud, SiCloudflare, SiTerraform, SiLangchain,
  SiNumpy, SiPandas, SiScikitlearn, SiSanity, SiClerk,
} from "react-icons/si";
import { FaJava, FaAws, FaDatabase, FaHtml5, FaCss3Alt, FaBrain, FaChartLine } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { useMultiParallax } from "@/hooks/useParallax";

interface Skill {
  name: string;
  logo: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    subtitle: "Core programming languages",
    skills: [
      { name: "Java", logo: FaJava, color: "#5382a1" },
      { name: "TypeScript", logo: SiTypescript, color: "#3178C6" },
      { name: "Python", logo: SiPython, color: "#3776AB" },
      { name: "JavaScript", logo: SiJavascript, color: "#F7DF1E" },
      { name: "C++", logo: SiCplusplus, color: "#00599C" },
      { name: "SQL", logo: FaDatabase, color: "#4479A1" },
      { name: "HTML5", logo: FaHtml5, color: "#E34F26" },
      { name: "CSS3", logo: FaCss3Alt, color: "#1572B6" },
    ],
  },
  {
    title: "Frontend",
    subtitle: "UI frameworks & libraries",
    skills: [
      { name: "Next.js", logo: SiNextdotjs },
      { name: "React.js", logo: SiReact, color: "#61DAFB" },
      { name: "Tailwind CSS", logo: SiTailwindcss, color: "#06B6D4" },
      { name: "Redux Toolkit", logo: SiRedux, color: "#764ABC" },
      { name: "Three.js", logo: SiThreedotjs },
      { name: "Framer Motion", logo: SiFramer },
      { name: "shadcn/ui", logo: SiShadcnui },
    ],
  },
  {
    title: "Backend",
    subtitle: "Server-side & APIs",
    skills: [
      { name: "Node.js", logo: SiNodedotjs, color: "#339933" },
      { name: "Express.js", logo: SiExpress },
      { name: "FastAPI", logo: SiFastapi, color: "#009688" },
      { name: "REST APIs", logo: TbApi, color: "#FF6B6B" },
      { name: "Clerk Auth", logo: SiClerk },
      { name: "Socket.io", logo: SiSocketdotio },
      { name: "Sanity CMS", logo: SiSanity, color: "#F03E2F" },
    ],
  },
  {
    title: "Databases & ORM",
    subtitle: "Storage & data layers",
    skills: [
      { name: "PostgreSQL", logo: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", logo: SiMysql, color: "#4479A1" },
      { name: "MongoDB", logo: SiMongodb, color: "#47A248" },
      { name: "Redis", logo: SiRedis, color: "#DC382D" },
      { name: "Supabase", logo: SiSupabase, color: "#3ECF8E" },
      { name: "NeonDB", logo: FaDatabase, color: "#00E599" },
      { name: "Prisma", logo: SiPrisma, color: "#5A67D8" },
    ],
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Infrastructure & deployment",
    skills: [
      { name: "AWS", logo: FaAws, color: "#FF9900" },
      { name: "GCP", logo: SiGooglecloud, color: "#4285F4" },
      { name: "Cloudflare R2", logo: SiCloudflare, color: "#F38020" },
      { name: "Docker", logo: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", logo: SiKubernetes, color: "#326CE5" },
      { name: "Terraform", logo: SiTerraform, color: "#844FBA" },
      { name: "Nginx", logo: SiNginx, color: "#009639" },
      { name: "Git", logo: SiGit, color: "#F05032" },
      { name: "GitHub", logo: SiGithub },
      { name: "Linux", logo: SiLinux, color: "#FCC624" },
      { name: "Vercel", logo: SiVercel },
      { name: "Postman", logo: SiPostman, color: "#FF6C37" },
    ],
  },
  {
    title: "AI & Data Science",
    subtitle: "ML frameworks & tools",
    skills: [
      { name: "NumPy", logo: SiNumpy, color: "#013243" },
      { name: "Pandas", logo: SiPandas, color: "#150458" },
      { name: "scikit-learn", logo: SiScikitlearn, color: "#F7931E" },
      { name: "Matplotlib", logo: FaChartLine, color: "#1C3C3C" },
      { name: "LangChain", logo: SiLangchain, color: "#1C3C3C" },
      { name: "RAG", logo: FaBrain, color: "#9D4BFF" },

    ],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useMultiParallax(
    [
      { ref: blobRef as React.RefObject<HTMLElement>, yPercent: 30 },
      { ref: headingRef as React.RefObject<HTMLElement>, yPercent: -10 },
    ],
    sectionRef as React.RefObject<HTMLElement>,
    { start: "top bottom", end: "bottom top", scrub: 1 }
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const scopeRef = useRef<any>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          scopeRef.current = createScope({ root: sectionRef }).add(() => {
            animate('.anime-skill-item', {
              scale: [0.5, 1],
              opacity: [0, 1],
              delay: stagger(40, { from: 'center' }),
              ease: spring({ bounce: 0.4 }),
              duration: 1000
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      scopeRef.current?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 md:py-32 bg-secondary/20 min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Parallax background blob */}
      <div
        ref={blobRef}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 md:px-12 mx-auto max-w-8xl relative z-10">
        <div className="flex flex-col mb-16 md:mb-24">
          <h2
            ref={headingRef}
            className="font-syne text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-foreground"
          >
            Skills
          </h2>
          <div className="h-[1px] w-full max-w-[200px] bg-primary mb-6" />
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            A comprehensive overview of my technical expertise, categorized by domain to help
            recruiters easily find what they are looking for.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12"
        >
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              {/* Category header — no card border */}
              <div className="mb-6">
                <h3 className="font-syne text-xl font-bold tracking-wide text-foreground mb-1">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-xs uppercase tracking-widest">
                  {category.subtitle}
                </p>
                <div className="mt-3 h-px w-12 bg-primary/50" />
              </div>

              {/* Borderless skill icons */}
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-x-6 gap-y-5"
              >
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="anime-skill-item flex flex-col items-center gap-2 group cursor-default opacity-0"
                  >
                    <div className="relative">
                      {/* Glow effect on hover */}
                      <div
                        className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150"
                        style={skill.color ? { background: skill.color } : { background: "white" }}
                      />
                      <skill.logo
                        className="relative w-8 h-8 md:w-9 md:h-9 transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-0.5"
                        style={skill.color ? { color: skill.color } : undefined}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200 whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
