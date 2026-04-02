"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-12 mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-20 text-muted-foreground/50">
          <GraduationCap className="w-8 h-8" />
          <h2 className="font-mono text-sm uppercase tracking-[0.3em]">Education</h2>
          <div className="h-[1px] flex-1 bg-border/40"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start"
        >
          {/* Main Typography Area (Borderless structure) */}
          <div className="flex-1 space-y-8">
            <h3 className="font-syne text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight">
              Indian Institute of Information Technology, Kottayam
            </h3>
            
            <div className="h-[1px] w-full max-w-sm bg-primary/20"></div>

            <div className="space-y-6">
              <h4 className="font-serif italic text-3xl md:text-4xl text-primary/90 opacity-90">
                B.Tech in Computer Science and Engineering
              </h4>
              <p className="max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
                Foundational studies focusing on Data Structures, Algorithms, Software Engineering, and advanced AI methodologies. Actively involved in the developer community and open-source initiatives.
              </p>
            </div>
          </div>

          {/* Metadata Sidebar */}
          <div className="lg:w-[300px] flex-shrink-0 flex flex-col gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/40 lg:pl-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Duration</p>
              <p className="font-syne font-medium text-xl text-foreground">Aug 2023 – Apr 2027</p>
            </div>
            
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Location</p>
              <p className="font-syne font-medium text-xl text-foreground">Kerala, India</p>
            </div>
            
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Academic Performance</p>
              <div className="inline-flex items-center gap-3 px-4 py-3 bg-primary/10 rounded-sm">
                <span className="font-syne font-bold text-3xl text-primary leading-none">8.9</span>
                <span className="font-mono text-sm text-primary/70">/10.0 CGPA</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
