import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const stats = {
    leetcode: {
      totalSolved: 468,
      easySolved: 140,
      easyTotal: 820,
      mediumSolved: 272,
      mediumTotal: 1730,
      hardSolved: 56,
      hardTotal: 740,
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
      badge: "Newbie · Max 992",
    },
    geeksforgeeks: {
      score: 90,
      solved: 22,
      instituteRank: 246,
      badge: "Institute Rank #246",
    },
    updatedAt: new Date().toISOString(),
  };

  try {
    // 1. Fetch LeetCode Real Stats via GraphQL
    const lcRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              username
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
              }
            }
            userContestRanking(username: $username) {
              rating
              globalRanking
              topPercentage
            }
          }
        `,
        variables: { username: "Mayank004" },
      }),
      next: { revalidate: 3600 },
    });

    if (lcRes.ok) {
      const lcData = await lcRes.json();
      const matchedUser = lcData?.data?.matchedUser;
      const allQ = lcData?.data?.allQuestionsCount;
      const contest = lcData?.data?.userContestRanking;

      if (matchedUser) {
        const subs = matchedUser.submitStats?.acSubmissionNum || [];
        const allItem = subs.find((x: any) => x.difficulty === "All");
        const easyItem = subs.find((x: any) => x.difficulty === "Easy");
        const medItem = subs.find((x: any) => x.difficulty === "Medium");
        const hardItem = subs.find((x: any) => x.difficulty === "Hard");

        if (allItem) stats.leetcode.totalSolved = allItem.count;
        if (easyItem) stats.leetcode.easySolved = easyItem.count;
        if (medItem) stats.leetcode.mediumSolved = medItem.count;
        if (hardItem) stats.leetcode.hardSolved = hardItem.count;

        if (allQ) {
          const eT = allQ.find((x: any) => x.difficulty === "Easy");
          const mT = allQ.find((x: any) => x.difficulty === "Medium");
          const hT = allQ.find((x: any) => x.difficulty === "Hard");
          if (eT) stats.leetcode.easyTotal = eT.count;
          if (mT) stats.leetcode.mediumTotal = mT.count;
          if (hT) stats.leetcode.hardTotal = hT.count;
        }

        if (contest?.rating) {
          stats.leetcode.contestRating = Math.round(contest.rating);
          stats.leetcode.badge = `Rating ${Math.round(contest.rating)}`;
        }
        if (contest?.topPercentage) {
          stats.leetcode.topPercentage = Math.round(contest.topPercentage);
          stats.leetcode.badge += ` · Top ${Math.round(contest.topPercentage)}%`;
        }
        if (matchedUser.profile?.ranking) {
          stats.leetcode.globalRank = matchedUser.profile.ranking;
        }
      }
    }
  } catch (e) {
    console.error("LeetCode fetch error:", e);
  }

  try {
    // 2. Fetch Codeforces Real Stats via REST API
    const cfUserRes = await fetch("https://codeforces.com/api/user.info?handles=Mayank004", {
      next: { revalidate: 3600 },
    });

    if (cfUserRes.ok) {
      const cfData = await cfUserRes.json();
      if (cfData.status === "OK" && cfData.result?.[0]) {
        const user = cfData.result[0];
        stats.codeforces.rating = user.rating || 942;
        stats.codeforces.maxRating = user.maxRating || 992;
        stats.codeforces.rank = user.rank || "newbie";
        stats.codeforces.maxRank = user.maxRank || "newbie";
        const rankCap = user.rank ? user.rank.charAt(0).toUpperCase() + user.rank.slice(1) : "Newbie";
        stats.codeforces.badge = `${rankCap} · Rating ${user.rating || 942} (Max ${user.maxRating || 992})`;
      }
    }

    const cfStatusRes = await fetch("https://codeforces.com/api/user.status?handle=Mayank004", {
      next: { revalidate: 3600 },
    });

    if (cfStatusRes.ok) {
      const cfStatus = await cfStatusRes.json();
      if (cfStatus.status === "OK" && Array.isArray(cfStatus.result)) {
        const okSubs = cfStatus.result.filter((s: any) => s.verdict === "OK");
        const uniqueSolved = new Set(okSubs.map((s: any) => `${s.problem.contestId}-${s.problem.index}`));
        if (uniqueSolved.size > 0) {
          stats.codeforces.solved = uniqueSolved.size;
        }
      }
    }
  } catch (e) {
    console.error("Codeforces fetch error:", e);
  }

  return NextResponse.json(stats);
}
