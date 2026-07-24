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
  title: "Mayank Verma | Full Stack Developer",
  description: "Portfolio of Mayank Verma, a Full Stack Developer & CS Undergrad at IIIT Kottayam. Passionate about web applications and AI-driven platforms.",
  keywords: ["Mayank Verma", "Full Stack Developer", "Software Engineer", "React", "Next.js", "Portfolio", "IIIT Kottayam", "Web Development", "AI"],
  authors: [{ name: "Mayank Verma" }],
  creator: "Mayank Verma",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mayank Verma | Full Stack Developer",
    description: "Portfolio of Mayank Verma, a Full Stack Developer & CS Undergrad at IIIT Kottayam.",
    siteName: "Mayank Verma Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Verma | Full Stack Developer",
    description: "Portfolio of Mayank Verma, a Full Stack Developer & CS Undergrad at IIIT Kottayam.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      <body className="min-h-full flex flex-col font-sans">
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
