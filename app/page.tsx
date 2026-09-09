import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/sections/hero";
import ServicesPreview from "@/components/sections/services-preview";
import Technologies from "@/components/sections/technologies";
import WhyChooseUs from "@/components/sections/why-choose-us";
import OurProcess from "@/components/sections/our-process";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import CTASection from "@/components/sections/cta";
import { JSONLD } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Company in Nagpur",
  description:
    "Unicorn Technologies is a website development company in Nagpur delivering custom websites, mobile apps, and software for businesses across Nagpur, Maharashtra.",
  alternates: {
    canonical: "https://www.unicorntechnologiess.com",
  },
};

export default function HomePage() {
  return (
    <>
      <JSONLD />
      <Navbar />
      <main>
        <Hero />

        {/* Server-rendered, crawlable locality copy — the Hero above is a
            client component driven by generic settings text, so Google's
            crawler needs this plain paragraph to see "Nagpur" and the target
            service phrase tied together near the top of the page. */}
        <section className="container-mx container-px py-4 md:py-8">
          <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground md:text-base">
            Unicorn Technologies is a{" "}
            <Link
              href="/website-development-nagpur"
              className="font-medium text-primary underline underline-offset-2"
            >
              Website & App development company in Nagpur
            </Link>{" "}
            helping businesses transform their ideas into fast, modern, and
            scalable digital solutions. We develop SEO-friendly websites,
            e-commerce platforms, custom web applications, and high-performance
            Android and iOS mobile apps tailored to business needs.
          </p>
        </section>

        <ServicesPreview />
        <Technologies />
        <WhyChooseUs />
        <OurProcess />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
