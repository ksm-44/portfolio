import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site";
import { personJsonLd } from "@/lib/seo";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsProvider } from "@/components/hud/analytics-store";
import { ModeProvider, PlayfulOnly } from "@/components/mode/mode-store";
import { AnalyticsHud } from "@/components/hud/AnalyticsHud";
import { BootSequence } from "@/components/boot/BootSequence";
import { DotField } from "@/components/fx/DotField";
import { CommandPalette } from "@/components/palette/CommandPalette";
import { EasterEggs } from "@/components/easter/EasterEggs";
import { Toaster } from "@/components/ui/Toaster";
import "./globals.css";

const displayFont = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.title,
    locale: siteConfig.locale,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1C0F0A" },
    { media: "(prefers-color-scheme: light)", color: "#FBEFE6" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} font-sans`}>
        <Providers>
          <ModeProvider>
            <AnalyticsProvider>
              <DotField />
              <PlayfulOnly>
                <BootSequence />
              </PlayfulOnly>
              <div className="relative z-10">
                <Header />
                <main id="main">{children}</main>
                <Footer />
              </div>
              <CommandPalette />
              <PlayfulOnly>
                <AnalyticsHud />
                <EasterEggs />
              </PlayfulOnly>
              <Toaster />
            </AnalyticsProvider>
          </ModeProvider>
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
