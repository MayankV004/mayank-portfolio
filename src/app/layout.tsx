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
  title: "Portfolio",
  description: "Creative Developer Portfolio",
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
