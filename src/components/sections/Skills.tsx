"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SiTypescript, SiPython, SiJavascript, SiC, SiCplusplus, 
  SiNextdotjs, SiReact, SiTailwindcss, SiRedux, SiThreedotjs, 
  SiNodedotjs, SiExpress, SiSocketdotio, SiSanity, 
  SiMysql, SiMongodb, SiPostgresql, SiSupabase, SiPrisma, 
  SiGit, SiDocker, SiGithub, SiPostman, SiLinux, SiVercel
} from "react-icons/si";
import { FaJava, FaAws, FaDatabase, FaHtml5, FaCss3Alt } from "react-icons/fa";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    skills: [
      { name: "Java", logo: FaJava, color: "#5382a1" },
      { name: "TypeScript", logo: SiTypescript, color: "#3178C6" },
      { name: "Python", logo: SiPython, color: "#3776AB" },
      { name: "JavaScript", logo: SiJavascript, color: "#F7DF1E" },
      { name: "C++", logo: SiCplusplus, color: "#00599C" },
      { name: "SQL", logo: FaDatabase, color: "#4479A1" },
      { name: "HTML5", logo: FaHtml5, color: "#E34F26" },
      { name: "CSS3", logo: FaCss3Alt, color: "#1572B6" }
    ]
  },
  {
    title: "Technologies",
    skills: [
      { name: "Next.js", logo: SiNextdotjs },
      { name: "React.js", logo: SiReact, color: "#61DAFB" },
      { name: "Tailwind CSS", logo: SiTailwindcss, color: "#06B6D4" },
      { name: "Redux Toolkit", logo: SiRedux, color: "#764ABC" },
      { name: "Three.js", logo: SiThreedotjs },
      { name: "Node.js", logo: SiNodedotjs, color: "#339933" },
      { name: "Express.js", logo: SiExpress },
      { name: "Socket.io", logo: SiSocketdotio },
      { name: "Sanity CMS", logo: SiSanity, color: "#F03E2F" }
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", logo: SiMysql, color: "#4479A1" },
      { name: "MongoDB", logo: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", logo: SiPostgresql, color: "#4169E1" },
      { name: "Supabase", logo: SiSupabase, color: "#3ECF8E" },
      { name: "NeonDB", logo: FaDatabase, color: "#00E599" },
      { name: "Prisma", logo: SiPrisma, color: "#2D3748" }
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", logo: SiGit, color: "#F05032" },
      { name: "Docker", logo: SiDocker, color: "#2496ED" },
      { name: "GitHub", logo: SiGithub },
      { name: "Postman", logo: SiPostman, color: "#FF6C37" },
      { name: "Linux", logo: SiLinux, color: "#FCC624" },
      { name: "Vercel", logo: SiVercel },
      { name: "AWS", logo: FaAws, color: "#FF9900" }
    ]
  }
];

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-24 md:py-32 bg-secondary/20 min-h-screen flex items-center">
      <div className="container px-4 md:px-12 mx-auto max-w-8xl">
        
        <div className="flex flex-col mb-16 md:mb-24">
          <h2 className="font-syne text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-foreground">Skills</h2>
          <div className="h-[1px] w-full max-w-[200px] bg-primary mb-6"></div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            A comprehensive overview of my technical expertise, categorized by domain to help recruiters easily find what they are looking for.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8"
        >
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <Card className="bg-white/10 dark:bg-black/10 backdrop-blur-xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:border-white/40 dark:hover:border-white/20 transition-all duration-500 h-full flex flex-col relative overflow-hidden group/card">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 to-transparent opacity-100 pointer-events-none"></div>
                <CardHeader className="flex flex-row items-center gap-4 pb-4 relative z-10">
                  <CardTitle className="text-3xl font-syne tracking-wide">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-6 relative z-10">
                  <div className="flex flex-wrap gap-3 md:gap-4 mt-4">
                    {category.skills.map((skill, sIdx) => (
                      <div 
                        key={sIdx}
                        className="flex flex-col items-center justify-center gap-2 group p-3 min-w-[80px] md:min-w-[90px] rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-[0_4px_16px_rgba(31,38,135,0.05)] hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(31,38,135,0.1)] hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
                      >
                        <skill.logo 
                          className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110 text-foreground" 
                          style={skill.color ? { color: skill.color } : undefined} 
                        />
                        <span className="text-[10px] md:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
