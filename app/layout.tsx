import "./globals.css";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { SiteSettingsProvider } from "@/components/settings-provider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
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
