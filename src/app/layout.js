import { Literata, Work_Sans, Fustat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HeaderProvider } from "@/context/HeaderContext";

// Fustat - Main font
const fustat = Fustat({
  variable: "--font-fustat",
  subsets: ["latin"],
  weight: [ "200", "300", "400", "500", "600", "700", "800"], // Light to ExtraBold
});

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
  title: "McNab Ventures",
  description: "A modern web application built with Next.js 16",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fustat.variable} ${literata.variable} ${workSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <HeaderProvider>
          <Header />
          {children}
          <Footer />
        </HeaderProvider>
      </body>
    </html>
  );
}
