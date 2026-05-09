"use client";

import { useRef } from "react";
import { ExternalLink, FileText, ArrowUpRight } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const EXPERIENCES = [
  {
    id: 1,
    role: "Web Development Intern",
    company: "OT Security Huddle",
    year: "Sept 2025 – Mar 2026",
    location: "Bangalore, IN · Remote",
    links: [
      { label: "Recommendation Letter", url: "https://drive.google.com/file/d/1zKXYjboOPt5DMQlCGOVIVVsN47JaY_5Q/view?usp=sharing", icon: FileText },
      { label: "otsechuddle.com", url: "https://otsechuddle.com", icon: ExternalLink },
      { label: "otsec.academy", url: "https://otsec.academy", icon: ExternalLink },
    ],
    bullets: [
      "Revamped otsechuddle.com and built OT Career Compass — Gemini API tool assessing profiles against IEC 62443 & NIST 800-82, recommending OT roles with downloadable roadmaps; 320+ submissions at 97.5% plan generation rate.",
      "Built OT Cyber Dome — Three.js 3D quiz simulating defense of 6 IEC 62443 security layers across 3 difficulty tiers; Supabase role-based auth, admin analytics dashboard; 79 attempts at 92% pass rate.",
      "Architected otsec.academy — production LMS with course/module/lesson management, SHA-256 hashed certificates, quizzes, flashcards, and Razorpay gateway (Indian & international); 256 users, 29 enrollments, 3 live courses.",
    ],
  },
  {
    id: 2,
    role: "Freelance Web Developer",
    company: "Eldroga Life Sciences",
    year: "Jun 2025",
    location: "Chennai, IN · Remote",
    links: [
      { label: "Recommendation Letter", url: "https://drive.google.com/file/d/1Bx_WPF_8aZhp3kGQ9o8EWIcQEB7za-SE/view?usp=sharing", icon: FileText },
      { label: "View Project", url: "https://kidney-app.vercel.app", icon: ExternalLink },
    ],
    bullets: [
      "Built a web app in under 10 days generating personalized CKD diet plans based on stage, age, and medical conditions, reducing doctors' manual effort by 70% through exportable charts.",
      "Successfully tested with 10+ mock patient profiles and received feedback from medical students for accuracy.",
    ],
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useParallax(
    headingRef as React.RefObject<HTMLElement>,
    { yPercent: -12, scrub: 1, start: "top bottom", end: "bottom top" },
    containerRef as React.RefObject<HTMLElement>,
  );

  return (
    <section id="experience" className="py-24 md:py-32 bg-background" ref={containerRef}>
      <div className="container px-4 md:px-6 mx-auto">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2
              ref={headingRef}
              className="font-syne text-4xl md:text-6xl font-bold tracking-tighter uppercase"
            >
              Experience
            </h2>
            <p className="text-muted-foreground text-lg">
              Where I&apos;ve worked and what I&apos;ve shipped.
            </p>
          </div>
          <p className="text-sm font-mono text-muted-foreground border border-border px-4 py-2 rounded-full hidden md:block">
            {EXPERIENCES.length} POSITIONS
          </p>
        </div>

        {/* ── Experience rows ── */}
        <div className="flex flex-col border-t border-border">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="group border-b border-border py-10 md:py-14 relative overflow-hidden transition-all duration-500 hover:px-6 -mx-6 px-6"
            >
              {/* Hover background sweep */}
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12">

                {/* ── Left: meta + bullets ── */}
                <div className="flex flex-col gap-6">

                  {/* Role + company + meta */}
                  <div className="flex flex-col gap-1.5">
                    {/* Company */}
                    <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-1">
                      {exp.location}
                    </p>
                    <h3 className="font-syne text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                      {exp.company}
                    </h3>
                    <p className="text-muted-foreground text-base md:text-lg italic">
                      <strong className="font-semibold text-foreground not-italic">
                        {exp.role}
                      </strong>
                    </p>
                  </div>

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-3 md:gap-4 max-w-3xl">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-4 items-start group/bullet">
                        <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-muted-foreground/40 group-hover/bullet:bg-foreground transition-colors duration-300" />
                        <span className="text-muted-foreground text-sm md:text-base leading-relaxed group-hover/bullet:text-foreground/90 transition-colors duration-300">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  {exp.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-1">
                      {exp.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                          <link.icon className="w-3.5 h-3.5" />
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Right: year badge ── */}
                <div className="flex md:flex-col md:items-end md:justify-start gap-4">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground/50 whitespace-nowrap">
                    {exp.year}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
