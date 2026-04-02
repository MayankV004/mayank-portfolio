"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Code2, Trophy } from "lucide-react";

const PROFILES = [
  {
    platform: "LeetCode",
    username: "@Mayank004",
    link: "https://leetcode.com/Mayank004/",
    icon: <Code2 className="w-8 h-8 text-[#FFA116]" />,
    color: "group-hover:border-[#FFA116]/50 col-span-1 md:col-span-2 lg:col-span-2",
    bg: "bg-[#FFA116]/10",
    image: "https://leetcard.jacoblin.cool/Mayank004?theme=dark&font=Baloo+Bhai&ext=heatmap",
  },
  {
    platform: "GeeksforGeeks",
    username: "@mayank_verma",
    link: "#",
    stats: "Data Structures & Algorithms",
    languages: ["Java", "C++"],
    icon: <Trophy className="w-8 h-8 text-[#2F8D46]" />,
    color: "group-hover:border-[#2F8D46]/50 col-span-1",
    bg: "bg-[#2F8D46]/10",
  },
  {
    platform: "Codeforces",
    username: "@mayank_verma",
    link: "#",
    stats: "Competitive Programming",
    languages: ["C++"],
    icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7.5C5.32843 7.5 6 8.17157 6 9V19.5C6 20.3284 5.32843 21 4.5 21C3.67157 21 3 20.3284 3 19.5V9C3 8.17157 3.67157 7.5 4.5 7.5Z" fill="#1F8ACB"/><path d="M12 3C12.8284 3 13.5 3.67157 13.5 4.5V19.5C13.5 20.3284 12.8284 21 12 21C11.1716 21 10.5 20.3284 10.5 19.5V4.5C10.5 3.67157 11.1716 3 12 3Z" fill="#FF8C00"/><path d="M19.5 12C20.3284 12 21 12.6716 21 13.5V19.5C21 20.3284 20.3284 21 19.5 21C18.6716 21 18 20.3284 18 19.5V13.5C18 12.6716 18.6716 12 19.5 12Z" fill="#FF0000"/></svg>,
    color: "group-hover:border-[#1F8ACB]/50 col-span-1 border-t md:border-t-0 mt-4 md:mt-0",
    bg: "bg-white/5",
  }
];

export function CodingProfiles() {
  return (
    <section id="coding-profiles" className="py-24 md:py-32 bg-background relative">
      <div className="container px-4 md:px-12 mx-auto max-w-7xl">
        <div className="flex flex-col mb-16 md:mb-24 items-center text-center">
          <h2 className="font-syne text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-foreground">Coding Profiles</h2>
          <div className="h-[1px] w-full max-w-[200px] bg-primary mb-6"></div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            Passionate about problem solving and competitive programming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROFILES.map((profile, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={profile.color.includes('col-span') ? profile.color.split(' ').filter(c => c.startsWith('col-span')).join(' ') : ""}
            >
              <a href={profile.link} className={`block h-full group`}>
                <Card className={`bg-card/40 backdrop-blur-sm border-border/50 transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:-translate-y-1 ${profile.color.replace(/col-span-\d /g, '')}`}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${profile.bg}`}>
                        {profile.icon}
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardTitle className="text-2xl font-syne">{profile.platform}</CardTitle>
                    <p className="text-sm font-mono text-muted-foreground/80">{profile.username}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    {profile.image ? (
                      <div className="mt-4 rounded-xl overflow-hidden bg-background/50 border border-border/40 p-2">
                        <img 
                          src={profile.image} 
                          alt={`${profile.platform} Stats`} 
                          loading="lazy" 
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="mb-6">
                          <p className="text-foreground/90 font-medium text-lg">
                            {profile.stats}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {profile.languages?.map((lang, lIdx) => (
                            <span key={lIdx} className="text-xs font-mono px-3 py-1 bg-secondary text-secondary-foreground rounded-full border border-border/60">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
