import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Subhadip Das | Full Stack Developer",
    template: "%s | Subhadip Das",
  },
  description:
    "Full Stack Developer specializing in React, Node.js, and modern web technologies. Building scalable and efficient web applications.",
  keywords: [
    "Subhadip Das",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Web Developer",
    "Portfolio",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "MERN Stack",
  ],
  authors: [
    { name: "Subhadip Das", url: "https://github.com/DasSubhadip1999" },
  ],
  creator: "Subhadip Das",
  publisher: "Subhadip Das",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://subhadipdas.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://subhadipdas.vercel.app",
    title: "Subhadip Das | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Node.js, and modern web technologies.",
    siteName: "Subhadip Das Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Subhadip Das Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhadip Das | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Node.js, and modern web technologies.",
    creator: "@DasSubhadip1999",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
