"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EXPERIENCES = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "OT Security Huddle",
    year: "Sept 2025 – Expected Feb 2026",
    location: "Bangalore, IN",
    bullets: [
      "Developed an AI-powered Career Roadmap Creator using Gemini API delivering personalized OT role recommendations, weekly career paths, and certification guidance—serving 500+ professionals.",
      "Revamped otsechuddle.com with enhanced UI/UX and newsletter integration, boosting user engagement by 40%.",
      "Built an interactive 3D Cyberdome Quiz using Three.js with gamified security rings, increasing platform engagement time by 50% with difficulty-based progressive challenges.",
      "Engineered an LMS platform (otsec.academy) using Next.js, Sanity CMS, Prisma, and Better Auth with batch versioning system.",
    ]
  },
  {
    id: 2,
    role: "Freelance Web Developer",
    company: "Eldroga Life Sciences",
    year: "June 2025",
    location: "Chennai, IN",
    bullets: [
      "Built a web app in under 10 days generating personalized CKD diet plans based on stage, age, and medical conditions, reducing doctors’ manual effort by 70% through exportable charts.",
      "Successfully tested with 10+ mock patient profiles and received feedback from medical students for accuracy."
    ]
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Draw line down as we scroll
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        }
      });

      // Animate cards in
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 50,
            x: 50
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-24 md:py-32 bg-background relative" ref={containerRef}>
      <div className="container px-4 md:px-12 mx-auto max-w-6xl">
        <div className="flex flex-col mb-16 md:mb-24">
          <h2 className="font-syne text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-foreground">Experience</h2>
          <div className="h-[1px] w-full max-w-[200px] bg-primary"></div>
        </div>

        <div className="relative">
          {/* Timeline Line (Left Aligned on desktop and mobile) */}
          <div className="absolute left-[16px] md:left-[32px] top-0 bottom-0 w-[2px] bg-border pt-4">
            <div 
              ref={lineRef} 
              className="w-full h-full bg-primary origin-top scale-y-0"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {EXPERIENCES.map((exp, index) => (
              <div 
                key={exp.id} 
                ref={el => { cardsRef.current[index] = el; }}
                className="relative flex flex-col pl-12 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[8px] md:left-[24px] top-8 w-5 h-5 rounded-full bg-background border-[3px] border-primary z-10 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                
                {/* Content Container */}
                <div className="w-full">
                  <Card className="bg-card/30 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-primary/10">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                          <CardTitle className="text-3xl font-syne font-semibold leading-tight text-foreground mb-2">
                            {exp.role}
                          </CardTitle>
                          <CardDescription className="text-lg md:text-xl font-medium text-primary">
                            {exp.company}
                          </CardDescription>
                          <div className="flex items-center text-sm text-muted-foreground mt-2 space-x-2">
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center bg-secondary/80 text-secondary-foreground border border-border/50 px-4 py-2 rounded-full font-mono text-sm shadow-inner">
                          {exp.year}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mt-2">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex text-muted-foreground items-start text-base md:text-lg leading-relaxed">
                            <span className="text-primary mr-3 mt-[8px] leading-none text-xs">◆</span>
                            <span className="flex-1">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
