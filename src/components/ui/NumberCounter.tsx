"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { gsap } from "@/lib/gsap";

interface NumberCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function NumberCounter({ value, duration = 2, className = "" }: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (inView && ref.current) {
      const target = { val: 0 };
      
      gsap.to(target, {
        val: value,
        duration: duration,
        ease: "power2.out",
        onUpdate: () => {
          setDisplayValue(Math.floor(target.val).toString());
        },
      });
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
