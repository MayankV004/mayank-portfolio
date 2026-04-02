"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Cloud, Terminal } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "Open Source Contributions",
    organization: "GirlScript & Social Summer of Code",
    date: "July - November 2025",
    icon: <Award className="w-6 h-6" />,
    description: "Contributed to AI-integrated MERN applications in GirlScript Summer of Code 2025 and Social Summer of Code 2025."
  },
  {
    title: "Machine Learning Foundations",
    organization: "Amazon (AWS Educate)",
    date: "July 2025",
    icon: <Cloud className="w-6 h-6" />,
    description: "Learned ML pipeline fundamentals and application to real-world business problems."
  },
  {
    title: "Using Python to Interact with OS",
    organization: "Google (Coursera)",
    date: "May 2024 - June 2024",
    icon: <Terminal className="w-6 h-6" />,
    description: "Learned to automate system tasks using Python scripts, manage files and directories, and execute shell commands."
  }
];

export function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 bg-secondary/10">
      <div className="container px-4 md:px-12 mx-auto max-w-7xl">
        <div className="flex flex-col mb-16 md:mb-24 text-center items-center">
          <h2 className="font-syne text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-foreground">Certifications</h2>
          <div className="h-[1px] w-full max-w-[200px] bg-primary mb-6"></div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            My continuous learning journey and achievements across various domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 h-full flex flex-col group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {cert.icon}
                  </div>
                  <CardTitle className="text-2xl font-syne group-hover:text-primary transition-colors">{cert.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground/80 font-medium">
                    {cert.organization}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-border/50 text-sm font-mono text-muted-foreground/60">
                    {cert.date}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
