"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ShimmerText from "@/components/kokonutui/shimmer-text";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background pt-20">
      
      {/* Minimal Background Gradients */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      {/* SVG Noise Texture Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02] mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />

      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col lg:flex-row justify-between items-center h-full gap-16 lg:gap-8 py-10 lg:py-0">
      {/* left: Portrait Image Container */}
      <div className="relative w-full lg:w-[45%] max-w-[600px] aspect-[4/5] mx-auto lg:mx-0 shrink-0">
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
            className="relative w-full h-full rounded-sm overflow-hidden bg-secondary border border-border"
          >
            {/* The image should be replaced by the user. I've mapped it to /profile.png for now. */}
            <Image 
              src="/assests/image.jpeg" 
              alt="Mayank Verma" 
              fill
              sizes="(max-width: 1280px) 100vw, 50vw"
              className="object-cover scale-[1.02]   transition-all duration-700"
              priority
            />
            {/* Overlay Gradient to blend with dark mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            
            {/* Minimal Decorative Corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/50" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/50" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute -left-8 bottom-12 hidden lg:flex flex-col items-center gap-4 bg-background/80 backdrop-blur-sm border border-border p-4 rounded-sm shadow-xl"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground rotate-180" style={{ writingMode: 'vertical-rl' }}>Scroll Down</span>
            <div className="w-[1px] h-12 bg-primary/30" />
          </motion.div>
        </div>

        {/* right: Typography & CTAs */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 w-full lg:w-[45%] shrink-0">
          <div className="space-y-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-syne text-2xl sm:text-3xl lg:text-[2rem] font-bold text-muted-foreground tracking-tight"
            >
              Hi, I'm Mayank Verma.
            </motion.p>
            <ShimmerText className="font-syne py-1 text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-tighter leading-[1.05]">
              Full Stack <br className="hidden md:block" />
              <span className="font-serif italic text-primary/90 opacity-90 pr-2">Engineer</span>.
            </ShimmerText>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="max-w-[500px] text-muted-foreground text-lg md:text-xl/relaxed"
          >
            I'm a Full Stack Developer & CS Undergrad @ IIIT Kottayam. Passionate about crafting high-performance web applications and AI-driven platforms.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
          >
            <MagneticButton>
              <Link href="#work" className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-sm bg-primary px-8 text-base font-syne font-semibold text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring gap-2 group">
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="#contact" className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-sm border border-border bg-transparent px-8 text-base font-syne font-semibold transition-all hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Contact Me
              </Link>
            </MagneticButton>
           
          </motion.div>
        </div>

       
        

      </div>
    </section>
  );
}
