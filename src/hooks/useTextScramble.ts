"use client";

import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { gsap } from "@/lib/gsap";

export function useTextScramble(text: string, trigger: "hover" | "mount" = "hover") {
  const elementRef = useRef<HTMLElement | null>(null);
  const originalTextRef = useRef<string>(text);
  const isAnimating = useRef(false);

  const scramble = () => {
    if (isAnimating.current || !elementRef.current) return;
    isAnimating.current = true;

    const chars = "!<>-_\\/[]{}—=+*^?#________";
    const el = elementRef.current;
    
    // Split the text manually for animation purposes
    const originalText = originalTextRef.current;
    const splitText = originalText.split('');
    let iteration = 0;
    
    clearInterval(el.dataset.scrambleInterval as any);
    
    const maxIterations = originalText.length;
    
    const interval = setInterval(() => {
      el.innerText = splitText.map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");

      if (iteration >= maxIterations) {
        clearInterval(interval);
        el.innerText = originalText;
        isAnimating.current = false;
      }
      
      iteration += 1 / 3; // Scramble speed control
    }, 30);
    
    el.dataset.scrambleInterval = interval as any;
  };

  useEffect(() => {
    if (trigger === "mount") {
      scramble();
    }
  }, [trigger]);

  return { ref: elementRef, scramble };
}
