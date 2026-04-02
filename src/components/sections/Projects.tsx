"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

// Mock data
const PROJECTS = [
  {
    id: "01",
    title: "Aura E-Commerce",
    description: "A headless e-commerce store with a custom 3D configurator.",
    longDescription: "Built with Next.js App Router, Three.js, and Shopify Storefront API. Designed a seamless 3D product customization experience allowing users to change materials and colors in real-time.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1664&auto=format&fit=crop",
    tags: ["Next.js", "Three.js", "Shopify", "Tailwind"],
    link: "#",
    github: "#"
  },
  {
    id: "02",
    title: "FinTech Dashboard",
    description: "Analytics dashboard with real-time data visualization.",
    longDescription: "A comprehensive dashboard for financial analysts featuring real-time websocket data streams, customizable D3.js charts, and a complex modular widget system.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "D3.js", "WebSockets", "Zustand"],
    link: "#",
    github: "#"
  },
  {
    id: "03",
    title: "Nexus Design System",
    description: "Accessible component library for enterprise applications.",
    longDescription: "Architected a fully accessible, extensively documented component library using React, Radix UI, and Storybook. Adopted by 5+ internal engineering teams.",
    image: "https://images.unsplash.com/photo-1507238692062-5a042e9e18c4?q=80&w=1974&auto=format&fit=crop",
    tags: ["React", "Radix UI", "Storybook", "Framer Motion"],
    link: "#",
    github: "#"
  },
  {
    id: "04",
    title: "Lumina AI Platform",
    description: "Interface for an AI text-to-video generation service.",
    longDescription: "Created the frontend experience for a complex AI model. Featured robust state handling for long-running asynchronous generation tasks, and a custom video player.",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2032&auto=format&fit=crop",
    tags: ["Next.js", "React Query", "Tailwind", "Radix UI"],
    link: "#",
    github: "#"
  }
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      
      gsap.set(cards, { y: 50, opacity: 0 });

      ScrollTrigger.batch(cards, {
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
          gsap.to(elements, { opacity: 0, y: -50, stagger: 0.1, duration: 0.6 });
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
    <section id="work" className="py-24 md:py-32 bg-background min-h-screen" ref={containerRef}>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-syne text-4xl md:text-6xl font-bold tracking-tighter uppercase">Selected Work</h2>
            <p className="text-muted-foreground text-lg">A curated selection of my latest projects.</p>
          </div>
          <p className="text-sm font-mono text-muted-foreground border border-border px-4 py-2 rounded-full hidden md:block">
            {PROJECTS.length} PROJECTS DISPLAYED
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project, idx) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <div className={`project-card group cursor-pointer relative ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted mb-6">
                    <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-background/50 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                      <ArrowUpRight className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-syne text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                      <span className="font-mono text-muted-foreground text-sm">{project.id}</span>
                    </div>
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-secondary/50 font-mono text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden gap-0">
                <div className="relative w-full h-[30vh] sm:h-[40vh]">
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <div className="p-6 sm:p-8 space-y-6 relative z-10 bg-background">
                  <DialogHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <DialogTitle className="font-syne text-3xl sm:text-4xl font-bold mb-2">{project.title}</DialogTitle>
                        <DialogDescription className="text-base text-muted-foreground">
                          {project.description}
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                      {project.longDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-border">
                    <div>
                      <h4 className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">Role</h4>
                      <p className="text-sm font-medium">Frontend Lead</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">Year</h4>
                      <p className="text-sm font-medium">2023</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex gap-2">
                      {project.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="font-mono text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a href={project.github} className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        Code
                      </a>
                      <a href={project.link} className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm font-medium">
                        Visit Site <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
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
