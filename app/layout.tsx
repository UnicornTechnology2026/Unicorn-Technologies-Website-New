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
    default: "Unicorn Technologies — Software & Digital Solutions",
    template: "%s | Unicorn Technologies",
  },
  description:
    "Unicorn Technologies builds custom software, websites, and mobile apps. We help startups and enterprises transform ideas into digital reality.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "digital marketing",
    "custom software",
    "Unicorn Technologies",
  ],
  openGraph: {
    title: "Unicorn Technologies — Software & Digital Solutions",
    description:
      "Custom software, web, and mobile solutions engineered to grow your business.",
    type: "website",
    siteName: "Unicorn Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unicorn Technologies — Software & Digital Solutions",
    description:
      "Custom software, web, and mobile solutions engineered to grow your business.",
  },
  robots: { index: true, follow: true },
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
