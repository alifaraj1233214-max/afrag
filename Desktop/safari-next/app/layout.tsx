import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Montserrat, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Safari | Baghdad — The Cradle of Civilisation",
  description:
    "Discover Baghdad with Safari — the world's most prestigious luxury travel company. Explore ancient Mesopotamian history, iconic landmarks, and curated private tours.",
  keywords: ["Baghdad", "Iraq tourism", "luxury travel", "historical sites", "Safari travel", "Mesopotamia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${montserrat.variable} ${notoKufi.variable} h-full`}
    >
      <body className="min-h-full antialiased" style={{ backgroundColor: "#0B1224", color: "#FDF6EC" }}>
        {children}
      </body>
    </html>
  );
}
