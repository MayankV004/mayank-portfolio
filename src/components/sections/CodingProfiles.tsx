"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Globe,
  Flame,
  Trophy
} from "lucide-react";
import {
  SiLeetcode,
  SiGeeksforgeeks,
  SiCodeforces
} from "react-icons/si";
import { NumberCounter } from "@/components/ui/NumberCounter";

interface LiveStatsData {
  leetcode: {
    totalSolved: number;
    easySolved: number;
    easyTotal: number;
    mediumSolved: number;
    mediumTotal: number;
    hardSolved: number;
    hardTotal: number;
    contestRating: number;
    globalRank: number;
    topPercentage: number;
    badge: string;
  };
  codeforces: {
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    solved: number;
    contests: number;
    badge: string;
  };
  geeksforgeeks: {
    score: number;
    solved: number;
    instituteRank: number;
    streak?: number;
    badge: string;
  };
  updatedAt?: string;
}

const DEFAULT_STATS: LiveStatsData = {
  leetcode: {
    totalSolved: 468,
    easySolved: 140,
    easyTotal: 958,
    mediumSolved: 272,
    mediumTotal: 2095,
    hardSolved: 56,
    hardTotal: 960,
    contestRating: 1633,
    globalRank: 231640,
    topPercentage: 20,
    badge: "Rating 1633 · Top 20%",
  },
  codeforces: {
    rating: 942,
    maxRating: 992,
    rank: "newbie",
    maxRank: "newbie",
    solved: 12,
    contests: 15,
    badge: "Newbie · Rating 942 (Max 992)",
  },
  geeksforgeeks: {
    score: 90,
    solved: 22,
    instituteRank: 246,
    badge: "Institute Rank #246",
  },
};

interface ProfileListItem {
  id: string;
  platform: string;
  username: string;
  link: string;
  icon: React.ReactNode;
  badge: string;
  stats: { label: string; value: number; suffix?: string; prefix?: string }[];
  difficultyBreakdown?: { label: string; solved: number; total: number }[];
  tags: string[];
}

export function CodingProfiles() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const [liveStats, setLiveStats] = useState<LiveStatsData>(DEFAULT_STATS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchLiveStats() {
      try {
        const res = await fetch("/api/coding-stats");
        if (res.ok) {
          const data: LiveStatsData = await res.json();
          setLiveStats((prev) => ({
            ...prev,
            ...data,
            geeksforgeeks: {
              ...prev.geeksforgeeks,
              ...(data.geeksforgeeks || {}),
            },
          }));
        }
      } catch (err) {
        console.warn("Using baseline stats fallback:", err);
      }
    }
    fetchLiveStats();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const grandTotalSolved =
    liveStats.leetcode.totalSolved +
    liveStats.geeksforgeeks.solved +
    liveStats.codeforces.solved;

  const OVERALL_KPIS = [
    { label: "Total Solved", value: grandTotalSolved, suffix: "+", icon: <CheckCircle2 className="w-4 h-4 text-foreground/80" /> },
    { label: "LeetCode Rating", value: liveStats.leetcode.contestRating, suffix: "", icon: <Trophy className="w-4 h-4 text-foreground/80" /> },
    { label: "Active Platforms", value: 3, suffix: "", icon: <Globe className="w-4 h-4 text-foreground/80" /> }  ];

  const PROFILES: ProfileListItem[] = [
    {
      id: "leetcode",
      platform: "LeetCode",
      username: "@Mayank004",
      link: "https://leetcode.com/Mayank004/",
      icon: <SiLeetcode className="w-6 h-6 text-[#FFA116]" />,
      badge: liveStats.leetcode.badge,
      stats: [
        { label: "Solved", value: liveStats.leetcode.totalSolved, suffix: "" },
        { label: "Rating", value: liveStats.leetcode.contestRating, suffix: "" },
        { label: "Global Rank", value: liveStats.leetcode.topPercentage, prefix: "Top ", suffix: "%" },
      ],
      difficultyBreakdown: [
        { label: "Easy", solved: liveStats.leetcode.easySolved, total: liveStats.leetcode.easyTotal },
        { label: "Medium", solved: liveStats.leetcode.mediumSolved, total: liveStats.leetcode.mediumTotal },
        { label: "Hard", solved: liveStats.leetcode.hardSolved, total: liveStats.leetcode.hardTotal },
      ],
      tags: ["DSA", "DP", "Graphs"],
    },
    {
      id: "geeksforgeeks",
      platform: "GeeksforGeeks",
      username: "@streamliner",
      link: "https://www.geeksforgeeks.org/profile/streamliner?tab=overview",
      icon: <SiGeeksforgeeks className="w-6 h-6 text-[#2F8D46]" />,
      badge: liveStats.geeksforgeeks.badge,
      stats: [
        { label: "Score", value: liveStats.geeksforgeeks.score, suffix: "" },
        { label: "Solved", value: liveStats.geeksforgeeks.solved, suffix: "" },
        { label: "Institute Rank", value: liveStats.geeksforgeeks.instituteRank, prefix: "#" },
      ],
      tags: ["Java", "C++", "DSA"],
    },
    {
      id: "codeforces",
      platform: "Codeforces",
      username: "@Mayank004",
      link: "https://codeforces.com/profile/Mayank004",
      icon: <SiCodeforces className="w-6 h-6 text-[#1F8ACB]" />,
      badge: liveStats.codeforces.badge,
      stats: [
        { label: "Rating", value: liveStats.codeforces.rating, suffix: "" },
        { label: "Max Rating", value: liveStats.codeforces.maxRating, suffix: "" },
        { label: "CP Solved", value: liveStats.codeforces.solved, suffix: "" },
      ],
      tags: ["Java", "CP", "Math"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="coding-profiles"
      className="py-16 md:py-24 pb-12 md:pb-16 bg-background relative overflow-hidden"
    >
      <div className="container px-4 md:px-12 mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          ref={headingRef}
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <h2 className="font-syne text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-foreground">
            Coding Profiles
          </h2>
          <div className="h-[1px] w-full max-w-[200px] bg-primary mb-6"></div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-sans">
            Passionate about problem solving and competitive programming. Live metrics synced automatically.
          </p>

          {/* Aggregated KPI Summary Row */}
          <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-4xl">
            {OVERALL_KPIS.map((kpi, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-4 bg-transparent border-none"
              >
                <div className="p-2 bg-secondary border-none">
                  {kpi.icon}
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-bold font-mono text-foreground flex items-center">
                    
                    {mounted ? (
                      <NumberCounter value={kpi.value} duration={1.5} />
                    ) : (
                      <span>{kpi.value}</span>
                    )}
                    <span>{kpi.suffix}</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-sans">
                    {kpi.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unordered List Channel Rows */}
        <ul className="flex flex-col border-t border-border">
          {PROFILES.map((profile, idx) => (
            <li key={profile.id} className="border-b border-border last:border-b-0">
              <a
                ref={(el) => {
                  rowsRef.current[idx] = el;
                }}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/row relative flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 md:py-8 overflow-hidden transition-colors duration-300 px-4 -mx-4"
              >
                {/* Hover sweep background effect */}
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover/row:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />

                {/* Left: Index, Icon, Title & Badge */}
                <div className="relative z-10 flex items-center gap-5 md:gap-8">
                  <span className="hidden sm:inline font-mono text-xs text-muted-foreground w-6 shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="p-2.5 border-none shrink-0">
                    {profile.icon}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-syne text-xl md:text-2xl font-bold tracking-tight text-foreground">
                        {profile.platform}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono bg-secondary text-secondary-foreground border-none">
                        <Award className="w-3 h-3 text-muted-foreground" />
                        {profile.badge}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm font-mono text-muted-foreground mt-0.5">
                      {profile.username}
                    </span>
                  </div>
                </div>

                {/* Middle: Live Stats & Difficulty Distribution */}
                <div className="relative z-10 flex flex-wrap items-center gap-6 md:gap-8">
                  <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs md:text-sm">
                    {profile.stats.map((st, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider font-sans">
                          {st.label}
                        </span>
                        <span className="font-bold text-foreground">
                          <span>{st.prefix ?? ""}</span>
                          {mounted ? (
                            <NumberCounter value={st.value} duration={1.5} />
                          ) : (
                            <span>{st.value}</span>
                          )}
                          <span>{st.suffix}</span>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* LeetCode Difficulty Distribution Inline */}
                  {profile.id === "leetcode" && profile.difficultyBreakdown && (
                    <div className="hidden xl:flex items-center gap-3 border-l border-border pl-6">
                      {profile.difficultyBreakdown.map((diff, dIdx) => {
                        const percentage = diff.total > 0 ? Math.round((diff.solved / diff.total) * 100) : 0;
                        return (
                          <div key={dIdx} className="flex flex-col w-20">
                            <div className="flex justify-between text-[11px] font-mono text-muted-foreground mb-1">
                              <span>{diff.label}</span>
                              <span className="text-foreground font-semibold">{diff.solved}</span>
                            </div>
                            <div className="h-1 w-full bg-secondary overflow-hidden">
                              <motion.div
                                className="h-full bg-foreground/80"
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: dIdx * 0.15, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right: Visit Profile Action */}
                <div className="relative z-10 flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline font-mono text-xs text-muted-foreground group-hover/row:text-foreground transition-colors duration-300">
                    Visit Profile
                  </span>
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground/60 group-hover/row:text-foreground group-hover/row:translate-x-1 group-hover/row:-translate-y-1 transition-all duration-300" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}



