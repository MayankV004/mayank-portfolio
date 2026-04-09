"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
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
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading drift
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }

      // Staggered card drift
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Subtle scrub float
        gsap.to(card, {
          yPercent: -5 - i * 2,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certifications" className="py-24 md:py-32 bg-secondary/10 overflow-hidden">
      <div className="container px-4 md:px-12 mx-auto max-w-7xl">
        <div ref={headingRef} className="flex flex-col mb-16 md:mb-24 text-center items-center">
          <h2 className="font-syne text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-foreground">Certifications</h2>
          <div className="h-[1px] w-full max-w-[200px] bg-primary mb-6"></div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            My continuous learning journey and achievements across various domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              ref={el => { cardsRef.current[idx] = el; }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
