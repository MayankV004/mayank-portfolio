"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Mail, Calendar, ArrowUpRight } from "lucide-react";

const LinkedinIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12"/>
  </svg>
);

const SOCIALS = [
  {
    id: "email",
    label: "Email",
    handle: "mayank.msverma@gmail.com",
    href: "mailto:mayank.msverma@gmail.com",
    Icon: Mail,
    description: "Best for project inquiries",
    accent: "#6366f1",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "@MayankV004",
    href: "https://github.com/MayankV004",
    Icon: GithubIcon,
    description: "See my open-source work",
    accent: "#e2e8f0",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "mayank-verma",
    href: "https://www.linkedin.com/in/mayankverma2027",
    Icon: LinkedinIcon,
    description: "Let's connect professionally",
    accent: "#0A66C2",
  },
  {
    id: "calendly",
    label: "Calendly",
    handle: "Book a call",
    href: "https://calendly.com/mayank-msverma/30min",
    Icon: Calendar,
    description: "Schedule a 30-min chat",
    accent: "#006BFF",
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;

      // Heading drift
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true },
        });
      }

      // Blob drift
      if (blobRef.current) {
        gsap.to(blobRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true },
        });
      }

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
        gsap.to(card, {
          yPercent: -4 - i * 1.5,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-30 bg-background relative overflow-hidden min-h-screen"
    >
      {/* Parallax blob */}
      <div
        ref={blobRef}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">

        {/* Headline */}
        <div ref={headingRef} className="mb-16 md:mb-24">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            // Get in touch
          </p>
          <h2 className="font-syne text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter uppercase leading-none mb-6">
            Let&apos;s<br className="hidden md:block" /> Connect.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
            I&apos;m open to internships, freelance work, and interesting collaborations. 
            Pick the channel that works best for you.
          </p>
        </div>

        {/* Social cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {SOCIALS.map((social, idx) => (
            <a
              key={social.id}
              ref={el => { cardsRef.current[idx] = el; }}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between gap-6 p-8 md:p-10 border border-border/50 bg-card/30 backdrop-blur-md rounded-2xl hover:border-border transition-all duration-300 overflow-hidden"
              style={{ ["--accent" as string]: social.accent }}
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500"
                style={{ backgroundColor: social.accent }}
              />

              {/* Left: icon + text */}
              <div className="flex items-center gap-6 relative z-10">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${social.accent}18` }}
                >
                  <social.Icon className="w-6 h-6" style={{ color: social.accent }} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    {social.label}
                  </p>
                  <p className="font-syne text-xl md:text-2xl font-bold text-foreground group-hover:text-foreground leading-tight">
                    {social.handle}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">{social.description}</p>
                </div>
              </div>

              {/* Right: arrow */}
              <ArrowUpRight
                className="w-6 h-6 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 relative z-10"
              />
            </a>
          ))}
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 w-full text-center text-sm font-mono text-muted-foreground/40">
        &copy; {new Date().getFullYear()} Mayank Verma. Built with Next.js &amp; Tailwind.
      </div>
    </section>
  );
}
