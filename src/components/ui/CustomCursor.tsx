"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Use GSAP quickTo for highly performant tracking
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    const followerX = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const followerY = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
    };

    // Track active interactive elements to adapt cursor
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, [data-interactive]");
    
    const growCursor = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.2 });
      gsap.to(follower, { scale: 0.5, opacity: 0, duration: 0.2 });
    };
    
    const shrinkCursor = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.2 });
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", growCursor);
      el.addEventListener("mouseleave", shrinkCursor);
    });

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", growCursor);
        el.removeEventListener("mouseleave", shrinkCursor);
      });
    };
  }, []);

  // Hide cursor on touch devices natively using CSS
  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block" 
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] hidden md:block" 
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
