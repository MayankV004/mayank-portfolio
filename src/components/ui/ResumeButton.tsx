"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const RESUME_URL =
  "https://drive.google.com/file/d/1DpfsUZi6kZqk-LQlY4VBdLsEYL5JvuCK/view?usp=sharing";

export function ResumeButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-flex h-12 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group"
      whileTap={{ scale: 0.95 }}
    >
      {/* ── Spinning Subtle Gradient Border ── */}
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[conic-gradient(from_90deg_at_50%_50%,#111_0%,#333_50%,#111_100%)]" />

      {/* ── Inner Background and Content ── */}
      <span className="relative flex h-full w-full items-center justify-center gap-2 rounded-sm bg-foreground px-6 text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/90 hover:text-background/80">
        <span className="font-syne font-semibold tracking-wide">Resume</span>
        
        <div className="relative h-4 w-4 overflow-hidden flex items-center justify-center">
          <motion.div
            initial={false}
            animate={{ 
              y: isHovered ? -20 : 0,
              opacity: isHovered ? 0 : 1
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute"
          >
            <Download size={16} />
          </motion.div>
          
          <motion.div
            initial={false}
            animate={{ 
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute"
          >
            <ArrowRight size={16} />
          </motion.div>
        </div>
      </span>
    </motion.a>
  );
}
