"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Layers, Database, Wrench } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: <Code2 className="w-8 h-8 text-primary" />,
    skills: ["Java", "TypeScript", "Python", "JavaScript", "C", "C++", "SQL", "HTML5", "CSS3"]
  },
  {
    title: "Technologies",
    icon: <Layers className="w-8 h-8 text-primary" />,
    skills: ["Next.js", "React.js", "Tailwind CSS", "Redux Toolkit", "Three.js", "Node.js", "Express.js", "Socket.io", "Sanity CMS"]
  },
  {
    title: "Databases",
    icon: <Database className="w-8 h-8 text-primary" />,
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Supabase", "NeonDB", "Prisma"]
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="w-8 h-8 text-primary" />,
    skills: ["Git", "Docker", "GitHub", "Postman", "Linux", "Vercel", "AWS"]
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
      <div className="container px-4 md:px-12 mx-auto max-w-7xl">
        
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
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors h-full flex flex-col shadow-sm">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="p-3 bg-secondary rounded-xl border border-border/50">
                    {category.icon}
                  </div>
                  <CardTitle className="text-2xl font-syne tracking-wide">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, sIdx) => (
                      <Badge 
                        key={sIdx}
                        variant="secondary" 
                        className="text-sm md:text-base px-4 py-2 bg-secondary/80 hover:bg-primary hover:text-primary-foreground border border-border/40 transition-colors font-medium rounded-md cursor-default"
                      >
                        {skill}
                      </Badge>
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
