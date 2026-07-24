"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const PROJECTS = [
  {
    id: "01",
    title: "ClearNote",
    subtitle: "AI-Powered Clinical Workflow Automation Platform",
    description:
      "Built an AI clinical workflow platform to automate documentation for doctors — converting live consultations directly into structured, guideline-grounded prescriptions and eliminating manual note-taking.",
    details: [
      "Engineered an end-to-end pipeline transcribing doctor-patient audio via Deepgram, generating SOAP notes through Gemini/Groq LLMs, running drug-interaction checks, and exporting formatted PDF prescriptions via WeasyPrint — with Redis caching LLM responses to cut repeat API costs.",
      "Built a RAG pipeline with LangChain and pgvector to chunk and embed medical guidelines into PostgreSQL, grounding LLM outputs against clinical standards rather than raw generation; stored audio/documents in S3-compatible object storage (AWS S3/MinIO).",
      "Provisioned cloud infrastructure with Terraform, enforced code quality via GitHub Actions (lint/test checks on every PR), and validated logic with Pytest unit and integration tests.",
    ],
    tags: ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "pgvector", "Redis", "AWS S3/MinIO", "LangChain", "Gemini", "Groq", "Deepgram", "Docker", "GitHub Actions", "Terraform", "Pytest"],
    date: "May 2026 – Jun 2026",
    link: "#",
    github: "https://github.com/MayankV004/clearnote",
  },
  {
    id: "02",
    title: "Origyn",
    subtitle: "Blockchain Document Verification",
    description:
      "Built a document-verification system to make invoice and receipt forgery instantly detectable, giving recipients cryptographic proof of authenticity without relying on a third-party notary.",
    details: [
      "Custom Blockchain & Merkle Tree: Fingerprinted each document via composite SHA-256 hash (filename + raw bytes + extracted PDF text) and anchored it into a dedicated blockchain microservice that batch-seals blocks at 10 transactions or every 5 seconds, with Redis persisting chain state across restarts for zero-dependency tamper detection.",
      "Real-Time, Rate-Limited Architecture: Decoupled the blockchain node from the API layer into independently-scaling Docker services behind Nginx rate limiting (5 req/s upload, 30 req/s API); broadcast verification events via WebSocket + Redis Pub/Sub for admin monitoring.",
    ],
    tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Redis", "Docker", "Nginx", "Cloudflare R2"],
    date: "Feb – Mar 2025",
    link: "#",
    github: "https://github.com/MayankV004/blockchain-receipt-verification",
  },
  {
    id: "03",
    title: "Pluto",
    subtitle: "AI-Powered Frontend Builder",
    description:
      "AI-powered platform that generates production-ready React components from natural language.",
    details: [
      "Repetitive boilerplate had no reliable path to production-ready components from natural language; engineered a Gemini API platform generating responsive React components inside isolated E2B sandboxes — cutting boilerplate time by 60% across 8+ templates.",
      "Uncontrolled generation requests risked abuse and blocked monetization; built a tiered credit system via Clerk Billing tracked in Prisma/NeonDB — 5 free generations, 100 pro with seamless upgrades, serving 50+ active users since launch.",
    ],
    tags: ["Next.js", "TypeScript", "Gemini API", "E2B Sandbox", "Clerk Auth", "Clerk Billing", "Prisma", "NeonDB", "Inngest"],
    date: "Jan – Feb 2026",
    link: "#",
    github: "https://github.com/MayankV004/pluto",
  },
  {
    id: "04",
    title: "Nexus",
    subtitle: "Agile Project Tracker",
    description:
      "Secure project management platform with JWT auth, Kanban board, and OTP email verification.",
    details: [
      "Teams lacked a secure agile platform with verified access; built RESTful APIs with JWT authentication incorporating refresh token rotation and OTP-based email verification via Nodemailer — preventing unauthorized account creation at the entry point.",
      "State complexity across Kanban, issue tracking, and member assignment risked inconsistent UI; architected a responsive Next.js frontend with Redux Toolkit for predictable global state — live at mayanknexus.app.",
    ],
    tags: ["Next.js", "TypeScript", "Redux Toolkit", "Node.js", "Express.js", "JWT", "Nodemailer", "MongoDB"],
    image: "/assests/nexus.png",
    date: "Jun – Jul 2025",
    link: "https://www.mayanknexus.app",
    github: "https://github.com/MayankV004/Nexus-Frontend",
  },

] as const;

type Project = (typeof PROJECTS)[number];

function ProjectPopup({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Enter animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    ).fromTo(
      cardRef.current,
      { opacity: 0, y: 48, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "expo.out" },
      "-=0.15",
    );
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(cardRef.current, { opacity: 0, y: 24, scale: 0.97, duration: 0.28, ease: "power3.in" })
      .to(backdropRef.current, { opacity: 0, duration: 0.18 }, "-=0.1");
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
      style={{ backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={close}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#0e0e0e] border border-white/8 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
        style={{ scrollbarWidth: "none" }}
      >
        {/* ── Gradient accent bar at top ── */}
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        {/* ── Ambient glow ── */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 70%)" }}
        />

        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <X className="w-3.5 h-3.5 text-zinc-400" />
        </button>

        <div className="p-7 md:p-9 flex flex-col gap-7">

          {/* ── Header ── */}
          <div className="flex items-start gap-5">
            {/* Big project number */}
            <span
              className="font-syne font-black text-5xl md:text-6xl leading-none select-none"
              style={{ color: "rgba(255,255,255,0.06)" }}
            >
              {project.id}
            </span>
            <div className="pt-1">
              <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-zinc-500 mb-1.5 block">
                Project {project.id}
              </span>
              <h2 className="font-syne text-2xl md:text-[1.75rem] font-black text-white leading-tight">
                {project.title}
              </h2>
              <p className="font-mono text-[11px] tracking-widest uppercase mt-1"
                style={{ color: "rgba(200,200,200,0.45)" }}>
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* ── Tech Stack ── */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.28em] uppercase text-zinc-500 mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => {
                // Cycle through accent tones
                const accents = [
                  "border-white/20 text-white/80 bg-white/5",
                  "border-zinc-600/40 text-zinc-300 bg-zinc-800/40",
                  "border-white/15 text-white/70 bg-white/[0.04]",
                ];
                return (
                  <span
                    key={tag}
                    className={`font-mono text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 hover:scale-105 hover:brightness-125 ${accents[i % accents.length]}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>

          {/* ── Key Details ── */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.28em] uppercase text-zinc-500 mb-4">
              Key Details
            </p>
            <ul className="flex flex-col gap-3">
              {project.details.map((d, i) => (
                <li key={i} className="flex gap-4 items-start">
                  {/* Numbered accent circle */}
                  <span
                    className="shrink-0 w-5 h-5 rounded-full border border-white/15 bg-white/5 flex items-center justify-center font-mono text-[9px] text-zinc-400 mt-0.5"
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">{d}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Divider ── */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* ── Footer: date + links ── */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-600">
              {project.date}
            </span>
            <div className="flex items-center gap-3">
              {project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 font-mono text-xs text-zinc-300 hover:text-white transition-all duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Site
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 font-mono text-xs font-semibold transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                View on GitHub
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useParallax(
    headingRef as React.RefObject<HTMLElement>,
    { yPercent: -15, scrub: 1, start: "top bottom", end: "bottom top" },
    containerRef as React.RefObject<HTMLElement>,
  );



  return (
    <>
      <section
        id="work"
        className="py-24 md:py-32 bg-background min-h-screen"
        ref={containerRef}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2
                ref={headingRef}
                className="font-syne text-4xl md:text-6xl font-bold tracking-tighter uppercase"
              >
                Projects
              </h2>
              <p className="text-muted-foreground text-lg">
                A curated selection of my latest projects.
              </p>
            </div>
            <p className="text-sm font-mono text-muted-foreground border border-border px-4 py-2 rounded-full hidden md:block">
              {PROJECTS.length} PROJECTS DISPLAYED
            </p>
          </div>

          <div className="flex flex-col border-t border-border">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                aria-label={`View ${project.title} details`}
                onClick={() => setActiveProject(project)}
                onKeyDown={(e) => e.key === "Enter" && setActiveProject(project)}
                className="group cursor-pointer border-b border-border py-8 md:py-12 transition-all duration-500 hover:px-6 -mx-6 px-6 relative overflow-hidden"
              >
                {/* Background hover sweep */}
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 flex-1">
                    <span className="font-mono text-muted-foreground/40 text-xl md:text-5xl font-light transition-colors group-hover:text-primary/60">
                      {project.id}
                    </span>
                    <div className="space-y-2">
                      <h3 className="font-syne text-3xl md:text-5xl font-bold transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-base md:text-lg italic">
                        <strong className="font-semibold text-foreground not-italic">
                          {project.subtitle}
                        </strong>{" "}
                        — {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between md:justify-end w-full md:w-auto mt-4 md:mt-0">
                    <div className="flex flex-wrap gap-2 md:max-w-[280px] md:justify-end">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs px-3 py-1 rounded-full border border-border text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-colors bg-background/50 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="font-mono text-xs px-3 py-1 rounded-full border border-border text-muted-foreground bg-background/50 backdrop-blur-sm">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shrink-0 group-hover:scale-110 bg-background">
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-foreground group-hover:text-primary-foreground group-hover:rotate-45 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal popup */}
      {activeProject && (
        <ProjectPopup
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
