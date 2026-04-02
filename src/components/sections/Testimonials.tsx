"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const TESTIMONIALS = [
  {
    text: "The architectural decisions made on our frontend completely transformed our user experience.",
    author: "Sarah J.",
    role: "CTO, TechNova"
  },
  {
    text: "Delivered a pixel-perfect, highly animated marketing site that doubled our conversion rate within a month.",
    author: "David M.",
    role: "Marketing Director, Aura"
  },
  {
    text: "An exceptional eye for design paired with ruthless technical execution. The best UI engineer we've worked with.",
    author: "Elena R.",
    role: "Founder, Lumina AI"
  },
  {
    text: "Brought order to our chaotic codebase. The design system implementation was flawless.",
    author: "Michael T.",
    role: "Engineering Manager, FinTech Inc"
  }
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainerRef.current!.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      gsap.to(scrollContainerRef.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${amountToScroll}`,
          pin: true,
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true, // Recalculates on resize
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-primary text-primary-foreground flex flex-col justify-center overflow-hidden relative">
      <div className="absolute top-12 left-4 md:left-12 opacity-50 font-syne text-sm uppercase tracking-widest">
        What People Say
      </div>

      <div ref={scrollContainerRef} className="flex gap-12 md:gap-32 px-12 md:px-32 items-center h-full w-max">
        {TESTIMONIALS.map((testimonial, idx) => (
          <div key={idx} className="w-[80vw] md:w-[60vw] max-w-[800px] flex-shrink-0 flex flex-col">
            <span className="text-6xl md:text-9xl font-serif text-primary-foreground/20 leading-none mb-4 md:-mb-12">"</span>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-syne font-bold leading-tight mb-8">
              {testimonial.text}
            </h3>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl uppercase tracking-wider">{testimonial.author}</span>
              <span className="text-primary-foreground/70 font-mono text-sm">{testimonial.role}</span>
            </div>
          </div>
        ))}
        {/* Spacer to keep it pinned longer so the last card doesn't disappear too fast */}
        <div className="w-[10vw] flex-shrink-0" />
      </div>
    </section>
  );
}
