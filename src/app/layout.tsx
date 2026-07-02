import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Afilize — Track. Automate. Optimize. Protect.",
  description:
    "Afilize captures every click and conversion with server-to-server precision, then puts AI, an automation engine, and built-in invoicing on top — so the platform runs the work you used to do by hand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="field" aria-hidden="true" />
        <div className="grid-lines" aria-hidden="true" />
        <div className="stage flex flex-col min-h-screen">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
