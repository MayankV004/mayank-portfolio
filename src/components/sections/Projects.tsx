"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const PROJECTS = [
  {
    id: "01",
    title: "Origyn — Blockchain Receipt Verification",
    description:
      "A full-stack document verification platform anchoring SHA-256 fingerprints on a custom blockchain.",
    longDescription:
      "Built with Python, FastAPI, Next.js, TypeScript, PostgreSQL, Redis, Docker, and Nginx. Anchors SHA-256 cryptographic fingerprints on a custom-built blockchain with Merkle trees across 6 Dockerized microservices. Features a real-time admin dashboard with WebSocket live feed, batch block sealing, Redis Pub/Sub event bus, and Nginx rate limiting.",
    tags: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Docker", "Redis"],
    // image: "/projects/origyn.png",  // ← add your screenshot here
    link: "#",
    github: "https://github.com/MayankV004/blockchain-receipt-verification",
  },
  {
    id: "02",
    title: "Pluto — AI Frontend Builder",
    description:
      "AI-powered platform that generates production-ready React components from natural language.",
    longDescription:
      "Built with Next.js, TypeScript, Tailwind CSS, NeonDB, Prisma, Clerk, E2B Sandbox, Inngest, and Google Gemini API. Generates production-ready React components from natural language with instant live preview in secure sandboxes. Features tiered access (5 free, 100 pro generations) and serves 50+ active users.",
    tags: ["Next.js", "TypeScript", "Gemini API", "E2B Sandbox", "Prisma"],
    // image: "/projects/pluto.png",   // ← add your screenshot here
    link: "#",
    github: "https://github.com/MayankV004/pluto",
  },
  {
    id: "03",
    title: "Nexus — Agile Project Tracker",
    description:
      "Secure project management platform with JWT auth, Kanban board, and OTP email verification.",
    longDescription:
      "Built with Next.js, TypeScript, Tailwind CSS, Redux Toolkit, Node.js, Express.js, JWT, Nodemailer, and MongoDB. Features end-to-end project workflows (create/edit/delete, member assignment, Kanban board, issue tracking), reducing task resolution time by 40% for 10+ users.",
    tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit"],
    image: "/assests/nexus.png", // ← add your screenshot here
    link: "https://www.mayanknexus.app",
    github: "https://github.com/MayankV004/Nexus-Frontend",
  },
] as const;

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Heading parallax
  useParallax(
    headingRef as React.RefObject<HTMLElement>,
    { yPercent: -15, scrub: 1, start: "top bottom", end: "bottom top" },
    containerRef as React.RefObject<HTMLElement>,
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".project-item");

      gsap.set(items, { y: 50, opacity: 0 });

      // Entry animation
      ScrollTrigger.batch(items, {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onEnterBack: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        onLeave: (elements) => {
          gsap.to(elements, {
            opacity: 0,
            y: -50,
            stagger: 0.1,
            duration: 0.6,
          });
        },
        onLeaveBack: (elements) => {
          gsap.to(elements, { opacity: 0, y: 50, stagger: 0.1, duration: 0.6 });
        },
        start: "top 85%",
        end: "bottom 15%",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
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
          {PROJECTS.map((project, idx) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <div className="project-item group cursor-pointer border-b border-border py-8 md:py-12 transition-all duration-500 hover:px-6 -mx-6 px-6 relative overflow-hidden">
                  {/* Background hover effect */}
                  <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 flex-1">
                      <span className="font-mono text-muted-foreground/40 text-xl md:text-5xl font-light transition-colors group-hover:text-primary/60">
                        {project.id}
                      </span>
                      <div className="space-y-2">
                        <h3 className="font-syne text-3xl md:text-5xl font-bold transition-colors">
                          {project.title.split("—")[0].trim()}
                        </h3>
                        <p className="text-muted-foreground text-base md:text-lg italic">
                          <strong className="font-semibold text-foreground not-italic">
                            {project.title.includes("—")
                              ? project.title.split("—")[1].trim()
                              : "Project"}
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
              </DialogTrigger>

              <DialogContent className="max-w-2xl w-[92vw] bg-zinc-950 border border-white/10 p-0 overflow-hidden rounded-2xl gap-0">
                {/* ── Banner ── */}
                <div className="relative w-full h-52 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black overflow-hidden flex items-center justify-center">
                  {/* If project has an image — show it with a dark overlay */}
                  {"image" in project && project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 672px"
                      />
                      {/* Gradient overlay so text stays readable */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                    </>
                  ) : (
                    /* Fallback: grid texture + glow */
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                          backgroundSize: "40px 40px",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-56 h-56 rounded-full bg-primary/25 blur-3xl" />
                      </div>
                    </>
                  )}

                  {/* Watermark number — always shown */}
                  <span className="absolute right-6 bottom-2 font-syne text-[7rem] font-black leading-none text-white/5 select-none">
                    {project.id}
                  </span>

                  {/* Title overlay — always shown */}
                  <div className="relative z-10 flex flex-col items-center gap-2 text-center px-6">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 border border-white/20 rounded-full px-3 py-1 bg-black/30 backdrop-blur-sm">
                      Project {project.id}
                    </span>
                    <DialogTitle className="font-syne text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-lg">
                      {project.title.split("—")[0].trim()}
                    </DialogTitle>
                    {project.title.includes("—") && (
                      <p className="font-mono text-[11px] tracking-widest uppercase text-white/50">
                        {project.title.split("—")[1]?.trim()}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Content ── */}
                <div className="p-6 sm:p-8 flex flex-col gap-6">
                  {/* Short description */}
                  <DialogDescription className="text-zinc-400 leading-relaxed text-sm sm:text-base border-l-2 border-primary/50 pl-4 not-italic">
                    {project.description}
                  </DialogDescription>

                  {/* Overview */}
                  <div className="space-y-2">
                    <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">
                      Overview
                    </h4>
                    <p className="text-zinc-300 leading-relaxed text-sm">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 hover:border-primary/60 hover:text-primary transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/8" />

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 text-sm font-semibold border border-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      <svg
                        className="w-4 h-4 shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      GitHub
                    </a>
                    <a
                      href={project.link}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/85 text-primary-foreground text-sm font-semibold transition-all duration-200 shadow-lg shadow-primary/20"
                    >
                      Visit Site <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
