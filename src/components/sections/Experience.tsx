"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Card } from "@/components/ui/card";
import { ExternalLink, FileText } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const EXPERIENCES = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "OT Security Huddle",
    year: "Sept 2025 – March 2026",
    location: "Bangalore, IN (Remote)",
    links: [
      { label: "Recommendation Letter", url: "#", icon: FileText },
      { label: "OT Security Huddle", url: "https://otsechuddle.com", icon: ExternalLink },
      { label: "otSec academy", url: "https://otsec.academy", icon: ExternalLink },
    ],
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
    location: "Chennai, IN (Remote)",
    links: [
      { label: "View Project", url: "#", icon: ExternalLink },
    ],
    bullets: [
      "Built a web app in under 10 days generating personalized CKD diet plans based on stage, age, and medical conditions, reducing doctors' manual effort by 70% through exportable charts.",
      "Successfully tested with 10+ mock patient profiles and received feedback from medical students for accuracy."
    ]
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Heading parallax — drifts up faster than content
  useParallax(
    headingRef as React.RefObject<HTMLElement>,
    { yPercent: -12, scrub: 1, start: "top bottom", end: "bottom top" },
    containerRef as React.RefObject<HTMLElement>
  );

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

      // Animate + subtle float cards in
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        gsap.fromTo(card,
          { opacity: 0, y: 50, x: 50 },
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

        // Subtle scroll-scrubbed float on each card
        gsap.to(card, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-24 md:py-32 bg-background relative" ref={containerRef}>
      <div className="container px-4 md:px-12 mx-auto max-w-8xl">
        <div className="flex flex-col mb-16 md:mb-24">
          <h2 ref={headingRef} className="font-syne text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-foreground">Experience</h2>
          <div className="h-[1px] w-full max-w-[200px] bg-primary"></div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
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
                  <Card className="bg-card/30 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-primary/10 overflow-hidden relative group/card">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-10 transition-all duration-500">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
                        <div>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-syne font-bold tracking-tight text-foreground mb-3">
                            {exp.role}
                          </h3>
                          <h4 className="text-lg md:text-xl font-semibold tracking-wide uppercase text-primary/90 mb-2">
                            {exp.company}
                          </h4>
                          <div className="flex items-center text-sm font-mono text-muted-foreground">
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center bg-secondary/80 text-secondary-foreground border border-border/50 px-4 py-2 rounded-full font-mono text-xs shadow-inner uppercase tracking-wider backdrop-blur-md">
                          {exp.year}
                        </div>
                      </div>
                      
                      <ul className="space-y-4 md:space-y-5">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex text-muted-foreground items-start text-base md:text-lg leading-relaxed group/bullet">
                            <span className="text-primary/50 group-hover/bullet:text-primary mr-4 mt-[10px] leading-none text-[10px] transition-all duration-300 group-hover/bullet:scale-150">◆</span>
                            <span className="flex-1 group-hover/bullet:text-foreground/90 transition-colors duration-300">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {exp.links && exp.links.length > 0 && (
                        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border/50">
                          {exp.links.map((link, lIdx) => (
                            <a 
                              key={lIdx} 
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-syne font-semibold tracking-wide text-foreground/80 hover:text-primary transition-all duration-300 bg-secondary/50 px-5 py-2.5 rounded-full border border-border/50 hover:border-primary/50 hover:shadow-sm group/link"
                            >
                              <link.icon className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
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
