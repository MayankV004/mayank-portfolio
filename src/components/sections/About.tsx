"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { NumberCounter } from "@/components/ui/NumberCounter";

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-40 bg-zinc-950 text-white overflow-hidden relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
            <h2 className="font-syne text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-8 leading-none">
              Design <br className="hidden md:block" /> Engineered.
            </h2>
            
            <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-zinc-400">
              <p className="font-medium text-zinc-200">
                I operate at the intersection of aesthetic design and robust software engineering. 
                I don't just write code; I craft digital experiences that feel tangible, alive, and polished to perfection.
              </p>
              <p>
                My approach to development is heavily rooted in design thinking. I believe that performance and accessibility 
                are not optional features, but fundamental requirements of modern web architecture. Fluid animations, 
                micro-interactions, and immaculate layouts are my love language.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-zinc-800">
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-syne font-bold text-white mb-2">
                  <NumberCounter value={5} />+
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-syne font-bold text-white mb-2">
                  <NumberCounter value={40} />+
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Projects Shipped</span>
              </div>
              <div className="flex flex-col hidden md:flex">
                <span className="text-4xl md:text-5xl font-syne font-bold text-white mb-2">
                  <NumberCounter value={100} />%
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Client Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 h-[60vh] lg:h-[80vh] relative overflow-hidden rounded-2xl w-full max-w-md mx-auto lg:max-w-none">
            <div ref={imageRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
              <img 
                src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop" 
                alt="Abstract Architectural Structure" 
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
