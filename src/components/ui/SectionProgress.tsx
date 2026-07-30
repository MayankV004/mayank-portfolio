"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "Intro" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "coding-profiles", label: "Coding Profiles" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function SectionProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (elements.length === 0) return;

    // Tracks whichever section crosses the vertical center of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = elements.indexOf(entry.target as HTMLElement);
          if (idx !== -1) setActiveIndex(idx);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const active = SECTIONS[activeIndex];

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 hidden lg:flex items-center gap-4 font-mono pointer-events-none select-none mix-blend-difference text-white">
      <span className="text-xs tabular-nums opacity-70">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>

      <div className="relative w-16 h-px bg-white/30 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-white transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-xs tabular-nums opacity-70">
        {String(SECTIONS.length).padStart(2, "0")}
      </span>

      <div className="w-px h-4 bg-white/30" />

      <div className="relative h-4 w-32 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={active.id}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 text-xs uppercase tracking-widest whitespace-nowrap"
          >
            {active.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
