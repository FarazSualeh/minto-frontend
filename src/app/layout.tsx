import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://minto.example"),
  title: {
    default: "Minto | 15-Minute Grocery Delivery in Chiplun",
    template: "%s | Minto",
  },
  description:
    "Order groceries and daily essentials in Chiplun with Minto's fast local delivery.",
  keywords: [
    "grocery delivery Chiplun",
    "15 minute delivery",
    "quick commerce",
    "online groceries Chiplun",
    "daily essentials",
  ],
  applicationName: "Minto",
  category: "Shopping",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Minto",
    title: "Minto | 15-Minute Grocery Delivery in Chiplun",
    description: "Fresh groceries and daily essentials delivered quickly across Chiplun.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minto | Quick Grocery Delivery",
    description: "Fresh groceries delivered quickly across Chiplun.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    name: "Minto",
    description: "Fast local grocery and daily essentials delivery in Chiplun.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chiplun",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
