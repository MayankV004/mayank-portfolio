import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/providers/Provider";
import { Header } from "@/components/ui/Header";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mayank Verma | Full Stack, Gen AI & DevOps Engineer",
  description:
    "Portfolio of Mayank Verma — Full Stack, Gen AI & DevOps Engineer (CS Undergrad @ IIIT Kottayam). Specialized in Next.js, FastAPI, Generative AI, RAG systems, Docker, Terraform, and cloud infrastructure.",
  keywords: [
    "Mayank Verma",
    "Full Stack Engineer",
    "Gen AI Engineer",
    "DevOps Engineer",
    "Generative AI",
    "RAG Systems",
    "Next.js",
    "FastAPI",
    "Docker",
    "Terraform",
    "IIIT Kottayam",
    "Competitive Programming",
    "Software Engineer Portfolio"
  ],
  authors: [{ name: "Mayank Verma", url: "https://github.com/MayankV004" }],
  creator: "Mayank Verma",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mayank Verma | Full Stack, Gen AI & DevOps Engineer",
    description:
      "Portfolio of Mayank Verma — Full Stack, Gen AI & DevOps Engineer. Building scalable web apps, AI systems, and cloud infrastructure.",
    siteName: "Mayank Verma Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Verma | Full Stack, Gen AI & DevOps Engineer",
    description:
      "Portfolio of Mayank Verma — Full Stack, Gen AI & DevOps Engineer. Building scalable web apps, AI systems, and cloud infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mayank Verma",
  "jobTitle": "Full Stack, Gen AI & DevOps Engineer",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Indian Institute of Information Technology Kottayam",
  },
  "knowsAbout": [
    "Full Stack Web Development",
    "Generative AI & RAG Systems",
    "DevOps & Infrastructure",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "Docker",
    "Terraform",
    "Competitive Programming",
  ],
  "sameAs": [
    "https://github.com/MayankV004",
    "https://www.linkedin.com/in/mayankverma2027",
    "https://leetcode.com/Mayank004/",
    "https://codeforces.com/profile/Mayank004",
    "https://www.geeksforgeeks.org/profile/streamliner?tab=overview",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
