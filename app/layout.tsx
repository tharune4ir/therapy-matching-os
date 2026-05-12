import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import { TherapyProvider } from "@/contexts/TherapyContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Therapy Matching OS | AI Product Concept",
  description: "An AI-native concept prototype exploring multi-layer compatibility algorithms for therapy-client matching. Built to demonstrate complex product mechanics and ethical retention loops.",
  openGraph: {
    title: "Therapy Matching OS | Product Concept",
    description: "A research-backed therapy matching prototype demonstrating multi-layer compatibility algorithms.",
    siteName: "Therapy Matching OS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Therapy Matching OS | Product Concept",
    description: "A research-backed therapy matching prototype demonstrating multi-layer compatibility algorithms.",
  },
};
 
export const viewport = {
  themeColor: "#F7F3ED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <TherapyProvider>
          <LayoutClient>{children}</LayoutClient>
        </TherapyProvider>
      </body>
    </html>
  );
}
