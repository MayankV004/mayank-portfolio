"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <MotionConfig reducedMotion="user">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </MotionConfig>
    </NextThemesProvider>
  );
}
