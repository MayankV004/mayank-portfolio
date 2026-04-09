"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight, Mail, Calendar, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;

      // Heading drift
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true }
        });
      }

      // Left column (cards) drift slightly slower
      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: leftColRef.current, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
        gsap.to(leftColRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true }
        });
      }

      // Right column (form) drift slightly slower yet
      if (rightColRef.current) {
        gsap.fromTo(rightColRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: rightColRef.current, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
        gsap.to(rightColRef.current, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true }
        });
      }

      // Background blob
      if (blobRef.current) {
        gsap.to(blobRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  const socials = [
    { name: "LinkedIn", icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, href: "https://linkedin.com/in/mayank-verma", color: "hover:bg-[#0A66C2] hover:border-[#0A66C2]" },
    { name: "GitHub", icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12"/></svg>, href: "https://github.com/MayankV004", color: "hover:bg-[#333] hover:border-[#333]" },
    { name: "Calendly", icon: <Calendar className="w-5 h-5" />, href: "#", color: "hover:bg-[#006BFF] hover:border-[#006BFF]" },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-40 bg-background relative overflow-hidden">
      {/* Parallax background blob */}
      <div ref={blobRef} className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        
        <div ref={headingRef} className="flex flex-col mb-16 md:mb-24 text-center items-center">
          <h2 className="font-syne text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-4 text-foreground">
            Let&apos;s Connect
          </h2>
          <div className="h-[1px] w-full max-w-[200px] bg-primary mb-6"></div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bento Box: Socials & Info */}
          <div ref={leftColRef} className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Email Card */}
            <div className="group relative bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all overflow-hidden h-full flex flex-col justify-between shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-syne text-2xl font-semibold mb-2">Email Me</h3>
                <p className="text-muted-foreground mb-6">Reach out directly to my inbox.</p>
              </div>
              <a 
                href="mailto:mayank.msverma@gmail.com" 
                className="relative z-10 font-syne font-medium text-lg md:text-xl truncate hover:text-primary transition-colors flex items-center gap-2 w-max"
              >
                mayank.msverma@gmail.com
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Social Cards Grid */}
            <div className="grid grid-cols-2 gap-6">
              {socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-card/40 backdrop-blur-md border border-border/50 transition-all duration-300 group ${social.color} shadow-sm`}
                >
                  <div className="text-muted-foreground group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </div>
                  <span className="font-mono text-sm font-medium text-muted-foreground group-hover:text-white transition-colors duration-300">
                    {social.name}
                  </span>
                </a>
              ))}
              <div className="flex flex-col items-center justify-center p-6 rounded-3xl border border-dashed border-border/80 bg-transparent text-muted-foreground opacity-50">
                <span className="font-mono text-xs text-center">More <br/>coming</span>
              </div>
            </div>

          </div>

          {/* Bento Box: Contact Form */}
          <div ref={rightColRef} className="lg:col-span-8 bg-card/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-border/50 relative shadow-sm h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col justify-center"
                >
                  <h3 className="text-3xl font-syne font-bold mb-8">Send a Message</h3>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">What&apos;s your name?</label>
                        <Input id="name" placeholder="John Doe" className="bg-background/50 border border-border/60 rounded-xl px-4 py-6 focus-visible:ring-1 focus-visible:ring-primary text-base transition-colors" {...form.register("name")} />
                        {form.formState.errors.name && (
                          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">What&apos;s your email?</label>
                        <Input id="email" placeholder="john@example.com" className="bg-background/50 border border-border/60 rounded-xl px-4 py-6 focus-visible:ring-1 focus-visible:ring-primary text-base transition-colors" {...form.register("email")} />
                        {form.formState.errors.email && (
                          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Tell me about your project</label>
                      <Textarea 
                        id="message"
                        placeholder="I need a modern website..." 
                        className="bg-background/50 border border-border/60 rounded-xl px-4 py-4 focus-visible:ring-1 focus-visible:ring-primary min-h-[150px] resize-none text-base transition-colors" 
                        {...form.register("message")} 
                      />
                      {form.formState.errors.message && (
                        <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-medium group"
                      >
                        {isSubmitting ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[400px] py-12"
                >
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary border border-primary/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-4xl font-syne font-bold mb-4">Message Sent!</h3>
                  <p className="text-muted-foreground text-lg max-w-sm mb-10">
                    Thanks for reaching out. I&apos;ve received your message and will get back to you within 24 hours.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => { setIsSubmitted(false); form.reset(); }}
                    className="rounded-full px-8 py-6 text-base"
                  >
                    Send Another
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
      
      {/* Footer minimal */}
      <div className="absolute bottom-6 left-0 w-full text-center text-sm font-mono text-muted-foreground/50">
        &copy; {new Date().getFullYear()} Mayank Verma. Built with Next.js & Tailwind.
      </div>
    </section>
  );
}
