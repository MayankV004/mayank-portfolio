"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";
import { Download } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out border-b ${
        scrolled
          ? "bg-background/70 backdrop-blur-md border-white/10 shadow-sm py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-display font-bold tracking-tighter"
        >
          Mayank Verma<span className="text-primary">.</span>
        </Link>
        <MagneticButton>
          <Link
            href="/resume.pdf"
            download
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-sm bg-primary px-6 font-medium text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {/* Hover Background Animation */}
            <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />

            <span className="relative flex items-center gap-2 font-syne font-semibold">
              Resume
              <Download
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </MagneticButton>
      </div>
    </header>
  );
}
