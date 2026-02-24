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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://mcnabventures.com';

const DEFAULT_DESCRIPTION =
  'McNab Ventures — Building a legacy of sustainable growth and regional development through strategic diversification and commitment to excellence.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'McNab Ventures',
    template: '%s | McNab Ventures',
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    siteName: 'McNab Ventures',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
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
