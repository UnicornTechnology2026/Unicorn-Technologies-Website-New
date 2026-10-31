"use client";

import Script from "next/script";
import { useCookieConsent } from "@/components/cookie-consent";

const GA_MEASUREMENT_ID = "G-3JP9JD6FDR";
const ADSENSE_CLIENT_ID = "ca-pub-5479733402838807";

export default function TrackingScripts() {
  const { consent } = useCookieConsent();

  return (
    <>
      {consent?.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {consent?.advertising && (
        <Script
          id="adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
