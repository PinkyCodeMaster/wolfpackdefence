import { ThemeProvider } from "@/components/theme/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WolfpackDefence | Peer-to-Peer Marketplace for Hobbyists",
  description:
    "WolfpackDefence is a secure, community-driven UK marketplace for airsoft, paintball, and real steel hobbyists. Buy, sell, and trade gear with confidence. Features include verified accounts, escrow payments, reviews, and admin moderation.",
  keywords: [
    "WolfpackDefence",
    "peer-to-peer marketplace",
    "airsoft",
    "paintball",
    "real steel",
    "UK hobbyists",
    "buy used gear",
    "sell gear",
    "trade equipment",
    "secure payments",
    "Stripe escrow",
    "community reviews",
    "reputation system",
    "GDPR",
    "BetterAuth",
    "Turso",
    "Drizzle ORM",
    "ShadCN UI",
    "Next.js",
    "Hono",
    "Stripe",
    "UploadThing",
    "BetterStack"
  ],
  authors: [{ name: "WolfpackDefence Team", url: "https://wolfpackdefence.co.uk" }],
  creator: "WolfpackDefence Team",
  openGraph: {
    title: "WolfpackDefence | Peer-to-Peer Marketplace for Hobbyists",
    description:
      "A modern, secure, and community-focused marketplace for UK airsoft, paintball, and real steel enthusiasts. Buy, sell, and trade gear with confidence.",
    url: "https://wolfpackdefence.co.uk",
    siteName: "WolfpackDefence",
    images: [
      {
        url: "https://wolfpackdefence.co.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "WolfpackDefence Marketplace"
      }
    ],
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "WolfpackDefence | Peer-to-Peer Marketplace for Hobbyists",
    description:
      "A trusted UK marketplace for airsoft, paintball, and real steel hobbyists. Secure, community-driven, and feature-rich.",
    images: ["https://wolfpackdefence.co.uk/og-image.png"]
  },
  metadataBase: new URL("https://wolfpackdefence.co.uk"),
  category: "marketplace"
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
