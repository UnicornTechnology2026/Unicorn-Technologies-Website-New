import "./globals.css";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { SiteSettingsProvider } from "@/components/settings-provider";
import { JSONLD } from "@/components/json-ld";

const GA_MEASUREMENT_ID = "G-3JP9JD6FDR";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.unicorntechnologiess.com"),
  title: {
    default:
      "Unicorn Technologies — Website & App Development Company in Nagpur",
    template: "%s | Unicorn Technologies, Nagpur",
  },
  description:
    "Unicorn Technologies is a Nagpur-based website development and app development company. We build custom websites, mobile apps, and software for startups and businesses in Nagpur and beyond.",
  keywords: [
    "website development in Nagpur",
    "web development company in Nagpur",
    "app development in Nagpur",
    "mobile app development company Nagpur",
    "software development company Nagpur",
    "digital marketing agency Nagpur",
    "custom software development Nagpur",
    "Unicorn Technologies",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Unicorn Technologies — Website & App Development Company in Nagpur",
    description:
      "Custom websites, mobile apps, and software built for businesses in Nagpur — engineered to grow your business.",
    type: "website",
    siteName: "Unicorn Technologies",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unicorn Technologies — Website & App Development Company in Nagpur",
    description:
      "Custom websites, mobile apps, and software built for businesses in Nagpur — engineered to grow your business.",
  },
  robots: { index: true, follow: true },
  other: {
    // Geo meta tags — a minor but standard local-SEO signal for
    // location-aware crawlers and some directory/aggregator tools.
    "geo.region": "IN-MH",
    "geo.placename": "Nagpur",
    "geo.position": "21.1614;79.0768",
    ICBM: "21.1614, 79.0768",
  },
  // If you have a Google Search Console verification meta tag, add it here
  // instead of/alongside the public/google239e133837992d46.html file, e.g.:
  // verification: { google: "your-verification-code" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sora.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <JSONLD />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <AuthProvider>
          <SiteSettingsProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </SiteSettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
