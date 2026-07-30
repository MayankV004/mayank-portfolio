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
      className="py-10 md:py-20 bg-zinc-950 text-white overflow-hidden relative"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* ── Full-width headline ── */}
        <div className="border-b border-zinc-800 pb-10 mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
            {"// About me"}
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
                IIIT Kottayam (CGPA 8.9), and a full-stack engineer who builds
                products that are fast, purposeful, and production-ready.
              </p>
              <p>
                During my internship at OT Security Huddle, I shipped three
                production systems: OT Career Compass — a Gemini-powered role
                assessment tool with 320+ submissions at a 97.5% plan
                generation rate; OT Cyber Dome — a Three.js 3D security quiz
                with 79 attempts at a 92% pass rate; and otsec.academy — a
                full LMS with Razorpay payments, SHA-256 certificates, and 256
                live users across 29 enrollments.
              </p>
              <p>
                Beyond the internship, I&apos;ve built Origyn — a blockchain
                document verification platform with a 6-service Dockerized
                architecture — and Pluto, an AI frontend builder generating
                React components inside isolated E2B sandboxes, now serving
                50+ active users. My stack spans Next.js, TypeScript, Node.js,
                PostgreSQL, Docker, FastAPI, and beyond. Whether it&apos;s a
                polished UI, a resilient backend, or a CI/CD pipeline — I see
                it through from first commit to deployment.
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
                450+
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-2">
                DSA Problems Solved
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
