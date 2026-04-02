"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !headlineRef.current || !subheadlineRef.current) return;

    // Split text into characters and lines for animation
    const headlineSplit = new SplitType(headlineRef.current, { types: "chars,words" });
    const subheadSplit = new SplitType(subheadlineRef.current, { types: "lines" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        headlineSplit.chars,
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.02, duration: 1.2, delay: 0.2 }
      )
      .fromTo(
        subheadSplit.lines,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      // Subtle parallax effect on scroll
      gsap.to(containerRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      headlineSplit.revert();
      subheadSplit.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* SVG Noise Texture Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />

      {/* Decorative Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        <h1 
          ref={headlineRef}
          className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase mb-6 drop-shadow-sm text-foreground overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          Full Stack <br /> Developer
        </h1>
        
        <p 
          ref={subheadlineRef}
          className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-10 overflow-hidden text-balance"
        >
          Crafting high-performance web applications and AI-driven platforms. <br/>
          CS Undergrad @ IIIT Kottayam.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-center">
          <MagneticButton>
            <a href="#work" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              View Work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#contact" className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Contact Me
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
