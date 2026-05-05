"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";
import { ResumeButton } from "@/components/ui/ResumeButton";

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
          <ResumeButton />
        </MagneticButton>
      </div>
    </header>
  );
}
