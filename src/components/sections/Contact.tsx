"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Calendar, ArrowUpRight, Copy, Check } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const LinkedinIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12"/>
  </svg>
);

const EMAIL = "mayank.msverma@gmail.com";

const CHANNELS = [
  {
    id: "github",
    label: "GitHub",
    handle: "@MayankV004",
    href: "https://github.com/MayankV004",
    Icon: GithubIcon,
    description: "See my open-source work",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "mayank-verma",
    href: "https://www.linkedin.com/in/mayankverma2027",
    Icon: LinkedinIcon,
    description: "Let's connect professionally",
  },
  {
    id: "calendly",
    label: "Calendly",
    handle: "Book a call",
    href: "https://calendly.com/mayank-msverma/30min",
    Icon: Calendar,
    description: "Schedule a 30-min chat",
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const blobRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — fail silently
    }
  };

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

      // Email centerpiece reveal
      if (emailRef.current) {
        gsap.fromTo(
          emailRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: emailRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }

      // Row stagger reveal
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Parallax blob */}
      <div
        ref={blobRef}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div ref={headingRef} className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              {"// Get in touch"}
            </p>
            <h2 className="font-syne text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter uppercase leading-none mb-6">
              Let&apos;s<br className="hidden md:block" /> Connect.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              I&apos;m open to internships, freelance work, and interesting collaborations.
              Pick the channel that works best for you.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2.5 font-mono text-sm text-muted-foreground border border-border px-4 py-2 rounded-full shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open to opportunities
          </div>
        </div>

        {/* Email centerpiece */}
        <div ref={emailRef} className="border-y border-border py-12 md:py-16 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <MagneticButton className="group/email">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 md:gap-6 font-syne text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground break-all sm:break-normal"
            >
              <span className="relative">
                {EMAIL}
                <span className="absolute left-0 -bottom-1 md:-bottom-2 h-0.5 md:h-0.75 w-full bg-foreground scale-x-0 origin-left group-hover/email:scale-x-100 transition-transform duration-500 ease-out" />
              </span>
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 shrink-0 transition-transform duration-300 group-hover/email:translate-x-2 group-hover/email:-translate-y-2" />
            </a>
          </MagneticButton>

          <button
            onClick={handleCopy}
            className="shrink-0 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground border border-border hover:border-foreground rounded-full px-4 py-2.5 transition-colors duration-300 w-fit"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy email
              </>
            )}
          </button>
        </div>

        {/* Channel rows */}
        <div className="flex flex-col">
          {CHANNELS.map((channel, idx) => (
            <a
              key={channel.id}
              ref={el => { rowsRef.current[idx] = el; }}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/row relative flex items-center justify-between gap-6 py-6 md:py-8 border-b border-border overflow-hidden transition-all duration-500 hover:px-4 -mx-4 px-4"
            >
              {/* Hover sweep */}
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover/row:translate-y-0 transition-transform duration-500 ease-out" />

              <div className="relative z-10 flex items-center gap-5 md:gap-8">
                <span className="hidden sm:inline font-mono text-xs text-muted-foreground w-6 shrink-0">
                  0{idx + 1}
                </span>
                <channel.Icon />
                <div className="flex flex-col">
                  <span className="font-syne text-lg md:text-2xl font-bold tracking-tight text-foreground">
                    {channel.label}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {channel.description}
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4 md:gap-6">
                <span className="hidden sm:inline font-mono text-xs md:text-sm text-muted-foreground group-hover/row:text-foreground transition-colors duration-300">
                  {channel.handle}
                </span>
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground/50 group-hover/row:text-foreground group-hover/row:translate-x-1 group-hover/row:-translate-y-1 transition-all duration-300 shrink-0" />
              </div>
            </a>
          ))}
        </div>

      </div>

      {/* Footer */}
      <div className="mt-20 md:mt-28 text-center text-sm font-mono text-muted-foreground/40">
        &copy; {new Date().getFullYear()} Mayank Verma. Built with Next.js &amp; Tailwind.
      </div>
    </section>
  );
}
