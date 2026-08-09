import type { Metadata } from "next";
import { Cormorant_Garamond, Fraunces, Space_Grotesk } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { SiteClosing } from "@/components/SiteClosing";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.originscocoa.com";

const defaultTitle =
  "Origins Cocoa — Fine-Flavoured Indian Cacao from West Godavari";
const defaultDescription =
  "Premium Indian cacao beans from farm to fermentery. Single origin, traceable, farmer-direct West Godavari cacao for craft chocolate makers worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s",
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Origins Cocoa",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/images/og/og-home-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Origins Cocoa — single origin cacao honestly sourced from West Godavari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/og/og-home-1200x630.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${fraunces.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <Navigation />
        {children}
        <SiteClosing />
      </body>
    </html>
  );
}
