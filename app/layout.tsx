import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import { TrellisProvider } from "@/contexts/TrellisContext";

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
  title: "Trellis | Find the right therapist, beautifully.",
  description: "Trellis matches you with a therapist who actually gets you. A clinical-grade matching prototype built for Elfina Health.",
  openGraph: {
    title: "Trellis | Therapy Matching Prototype",
    description: "A research-backed therapy matching engine optimizing for the therapeutic alliance.",
    siteName: "Trellis",
    type: "website",
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
        <TrellisProvider>
          <LayoutClient>{children}</LayoutClient>
        </TrellisProvider>
      </body>
    </html>
  );
}
