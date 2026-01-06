import { Literata, Work_Sans } from "next/font/google";
import "./globals.css";

// Literata for headings (Light & Medium)
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  weight: ["300", "500"], // Light (300), Medium (500)
});

// Work Sans for body/content (Medium & ExtraBold)
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["500", "800"], // Medium (500), ExtraBold (800)
});

export const metadata = {
  title: "McNab Ventures - Next.js + PocketBase",
  description: "A modern full-stack web application built with Next.js 16 and PocketBase backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${literata.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
