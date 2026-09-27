import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KiteBrand (Archetype OS) — Organized by @wecodecoderss x Inkloom",
  description:
    "Organized by @wecodecoderss with title sponsor Inkloom. Autonomous brand positioning engine that deconstructs friction, runs 3-way archetype battles, audits clichés with WCAG AA compliance, and compiles production-ready developer tokens.",
  keywords: [
    "wecodecoderss",
    "@wecodecoderss",
    "branding",
    "AI branding",
    "developer tokens",
    "tailwind.config.js",
    "WCAG accessibility",
    "archetype OS",
    "Inkloom",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark antialiased`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
