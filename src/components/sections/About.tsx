"use client";

import { useRef } from "react";
import { NumberCounter } from "@/components/ui/NumberCounter";
import { useMultiParallax } from "@/hooks/useParallax";

const TECH = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Python",
  "Tailwind CSS",
  "Prisma",
  "Redis",
  "FastAPI",
];

const CHALLENGES = [
  {
    index: "01",
    challenge: "Building a production blockchain from scratch",
    context:
      "Origyn required anchoring SHA-256 document fingerprints on a custom blockchain with Merkle trees — technology I had no prior hands-on experience with.",
    solution:
      "I broke it down to first principles, studied Merkle tree construction and block sealing mechanics, then engineered 6 Dockerized microservices wired together via a Redis Pub/Sub event bus. Nginx rate limiting was layered on top to keep it production-safe.",
    tag: "New Domain",
  },
  {
    index: "02",
    challenge: "Delivering a medical app in under 10 days",
    context:
      "Eldroga Life Sciences needed a CKD diet plan generator validated against real patient profiles and medical logic — under an extremely tight deadline with zero room for error.",
    solution:
      "I prioritised ruthlessly: designed the data model first, built the core calculation engine before any UI, and iterated with 10+ mock patient profiles in parallel. Constant feedback loops with medical students caught domain-specific edge cases early.",
    tag: "Time Pressure",
  },
  {
    index: "03",
    challenge: "Learning Three.js mid-internship to ship a 3D product",
    context:
      "OT Security Huddle wanted an interactive 3D Cyberdome Quiz — a gamified feature using technology that was entirely new to me at the start of the sprint.",
    solution:
      "I dedicated the first two days purely to Three.js fundamentals and WebGL concepts, built a spike with gamified security rings, and then iterated on difficulty-based progressive challenges. The result increased platform engagement time by 50%.",
    tag: "New Technology",
  },
  {
    index: "04",
    challenge: "Architecting a multi-tenant LMS with batch versioning",
    context:
      "otsec.academy needed to support multiple course batches simultaneously, with granular access control, payment integration, and a CMS-driven content pipeline — all within the internship timeline.",
    solution:
      "I composed the system from proven primitives: Next.js + Sanity CMS for content, Better Auth for access control, Prisma + NeonDB for the batch versioning schema, and Razorpay for payments. Deploying both platforms on Vercel with CI/CD meant zero manual releases.",
    tag: "System Design",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);

  useMultiParallax(
    [
      { ref: headlineRef as React.RefObject<HTMLElement>, yPercent: -18 },
      { ref: statsRef as React.RefObject<HTMLElement>, yPercent: -8 },
      { ref: challengesRef as React.RefObject<HTMLElement>, yPercent: -5 },
    ],
    sectionRef as React.RefObject<HTMLElement>,
    { start: "top bottom", end: "bottom top", scrub: 1 }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-40 bg-zinc-950 text-white overflow-hidden relative"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* ── Full-width headline ── */}
        <div className="border-b border-zinc-800 pb-10 mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
            // About me
          </p>
          <h2
            ref={headlineRef}
            className="font-syne text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter uppercase leading-none"
          >
            Built to Ship.
          </h2>
        </div>

        {/* ── Two-column: bio left | stats right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Bio */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-zinc-400">
              <p className="font-medium text-zinc-200 !mt-0">
                I&apos;m Mayank Verma — a B.Tech Computer Science student at
                IIIT Kottayam, and a full-stack engineer who builds products
                that are fast, purposeful, and production-ready.
              </p>
              <p>
                I&apos;ve shipped real software for real users — from an
                AI-powered Career Roadmap tool serving 500+ OT security
                professionals at OT Security Huddle, to a blockchain-based
                document verification platform and an AI frontend builder used
                by 50+ active users. My stack spans Next.js, TypeScript,
                Node.js, PostgreSQL, Docker, and beyond. Whether it&apos;s a
                polished UI, a resilient backend, or a CI/CD pipeline — I see it
                through from first commit to deployment.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="lg:col-span-5 flex flex-col justify-center gap-8 lg:pl-12 lg:border-l border-zinc-800">
            <div className="flex flex-col">
              <span className="text-6xl md:text-7xl font-syne font-bold text-white leading-none mb-1">
                <NumberCounter value={2} />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-2">
                Internships
              </span>
            </div>
            <div className="flex flex-col border-t border-zinc-800 pt-8">
              <span className="text-6xl md:text-7xl font-syne font-bold text-white leading-none mb-1">
                300+
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-2">
                DSA Problems Solved
              </span>
            </div>
          </div>
        </div>

        {/* ── Challenges ── */}
        <div ref={challengesRef} className="border-t border-zinc-800 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
                // Problem Solving
              </p>
              <h3 className="font-syne text-3xl md:text-4xl font-bold uppercase tracking-tight">
                Challenges &amp; How I Overcame Them
              </h3>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs text-right hidden md:block">
              Real problems. Real constraints. Real solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            {CHALLENGES.map((item) => (
              <div
                key={item.index}
                className="bg-zinc-950 p-8 flex flex-col gap-5 group hover:bg-zinc-900 transition-colors duration-300"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <span className="font-syne text-4xl font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors leading-none">
                    {item.index}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 border border-zinc-700 px-2.5 py-1 rounded-full shrink-0">
                    {item.tag}
                  </span>
                </div>

                {/* Challenge */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-2">
                    Challenge
                  </p>
                  <p className="font-syne text-lg font-semibold text-white leading-snug">
                    {item.challenge}
                  </p>
                </div>

                {/* Context */}
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {item.context}
                </p>

                {/* Solution */}
                <div className="border-t border-zinc-800 pt-5">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-2">
                    How I solved it
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
