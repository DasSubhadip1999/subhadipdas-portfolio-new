import type { Metadata, Viewport } from "next";
import { Galada, Hind, Yatra_One } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GameProvider } from "@/components/game/GameProvider";
import { PERSONAL_INFO } from "@/lib/data";

const sign = Yatra_One({ weight: "400", subsets: ["latin"], variable: "--font-sign", display: "swap" });
const body = Hind({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-body", display: "swap" });
const bangla = Galada({ weight: "400", subsets: ["latin"], variable: "--font-bangla", display: "swap", preload: false });

const description =
  "Senior Software Engineer and Team Lead with 3.5+ years building scalable web apps with React, Next.js, Node.js, TypeScript and serverless AWS. Shipped platforms used by 10,000+ Hindustan Unilever employees.";

export const metadata: Metadata = {
  metadataBase: new URL(PERSONAL_INFO.site),
  title: {
    default: "Subhadip Das | Senior Software Engineer",
    template: "%s | Subhadip Das",
  },
  description,
  keywords: [
    "Subhadip Das",
    "Senior Software Engineer",
    "Full Stack Developer",
    "Team Lead",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "AWS Lambda",
    "Serverless",
    "System Design",
  ],
  authors: [{ name: "Subhadip Das", url: PERSONAL_INFO.github }],
  creator: "Subhadip Das",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PERSONAL_INFO.site,
    title: "Subhadip Das | Senior Software Engineer",
    description,
    siteName: "Subhadip Das",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhadip Das | Senior Software Engineer",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#eef3f4",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sign.variable} ${body.variable} ${bangla.variable}`}>
      <body className="font-body">
        {/* Shared ink texture for rubber stamps. */}
        <svg aria-hidden width="0" height="0" className="absolute">
          <filter id="ink-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="3.2" />
          </filter>
        </svg>
        <GameProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </GameProvider>
      </body>
    </html>
  );
}
