import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import { profile } from "@marcusinthesky/content";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · Marcus Gawronsky" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  icons: { icon: "/icon.svg" },
  ...pageMetadata({ description: site.description, path: "/" }),
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f7f4ec",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  givenName: profile.givenName,
  familyName: profile.familyName,
  description: profile.summary,
  url: site.url,
  homeLocation: { "@type": "Place", name: profile.location },
  sameAs: profile.links.map(({ url }) => url),
  knowsAbout: profile.interests,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${fraunces.variable} ${inter.variable}`} lang="en-ZA">
      <body>
        <a
          className="sr-only fixed left-3 top-3 z-50 bg-background p-3 focus:not-sr-only"
          href="#main-content"
        >
          Skip to content
        </a>
        <JsonLd data={personJsonLd} />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
