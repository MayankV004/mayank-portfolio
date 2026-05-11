"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Cloud, Terminal, ExternalLink } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "Open Source Contributions",
    organization: "GirlScript & Social Summer of Code",
    date: "July - November 2025",
    icon: <Award className="w-6 h-6" />,
    description: "Merged 8 PRs across AI-integrated MERN applications contributing UI components and frontend improvements.",
    links: [
      { label: "GSSoC 2025 Certificate", url: "https://drive.google.com/file/d/1R3YgDWfW2NPeLKEoIoT53zYJoVc4VBz8/view" },
      { label: "SSoC 2025 Certificate", url: "https://drive.google.com/file/d/1YoAffUD58Sw1Wv1lk9ks3hZ_j7ZVk4jU/view" }
    ]
  },
  {
    title: "Machine Learning Foundations",
    organization: "Amazon (AWS Educate)",
    date: "July 2025",
    icon: <Cloud className="w-6 h-6" />,
    description: "Learned ML pipeline fundamentals and application to real-world business problems.",
    links: [
      { label: "View Badge", url: "https://www.credly.com/badges/4f3e969e-dc97-412f-8eca-87bf94877576/public_url" }
    ]
  },
  {
    title: "LeetCode & Competitive Programming",
    organization: "LeetCode",
    date: "2024 - Present",
    icon: <Terminal className="w-6 h-6" />,
    description: "Actively solving daily on LeetCode — 304+ problems solved (115 Easy, 156 Medium, 33 Hard) in Java and Python; earned 100 Days Badge 2024 for sustained consistency.",
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
          <h2 className="font-syne text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-foreground">Achievements & Certifications</h2>
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
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                    {cert.links && cert.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {cert.links.map((link, lIdx) => (
                          <a 
                            key={lIdx} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-full transition-colors"
                          >
                            {link.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
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
