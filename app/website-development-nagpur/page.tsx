import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Reveal } from "@/components/animations";
import WhyChooseUs from "@/components/sections/why-choose-us";
import OurProcess from "@/components/sections/our-process";
import CTASection from "@/components/sections/cta";
import { PageJSONLD } from "@/components/json-ld";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/structured-data";
import { Check, MapPin } from "lucide-react";
import webAppImg from "../../assest/web-app.jpg";

const SITE_URL = "https://www.unicorntechnologiess.com";
const PAGE_URL = `${SITE_URL}/website-development-in-nagpur`;

export const metadata: Metadata = {
  title: "Website Development in Nagpur",
  description:
    "Looking for website development in Nagpur? Unicorn Technologies designs and builds fast, SEO-friendly, mobile-responsive websites for businesses across Nagpur, Maharashtra. Get a free quote today.",
  alternates: {
    canonical: "/website-development-in-nagpur",
  },
  openGraph: {
    title: "Website Development in Nagpur | Unicorn Technologies",
    description:
      "Custom, SEO-friendly website development for businesses in Nagpur. Corporate sites, e-commerce, and web apps built with modern technology.",
    url: PAGE_URL,
    type: "website",
    siteName: "Unicorn Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development in Nagpur | Unicorn Technologies",
    description:
      "Custom, SEO-friendly website development for businesses in Nagpur. Corporate sites, e-commerce, and web apps built with modern technology.",
  },
};

const deliverables = [
  "Custom-designed, mobile-responsive websites",
  "SEO-friendly structure & Core Web Vitals optimization",
  "Business, corporate & portfolio websites",
  "E-commerce & online store development",
  "Content Management System (CMS) integration",
  "Website maintenance & support after launch",
];

const industries = [
  "Manufacturing & MSMEs",
  "Healthcare & clinics",
  "Real estate & builders",
  "Education & coaching institutes",
  "Retail & e-commerce",
  "Professional services",
];

const faqs = [
  {
    question: "Do you build websites for local businesses in Nagpur?",
    answer:
      "Yes. We are a Nagpur-based team and regularly build websites for businesses across Nagpur — from Sitabuldi and Dharampeth to Wardha Road and Manish Nagar — as well as for clients across Maharashtra and India.",
  },
  {
    question: "How much does website development cost in Nagpur?",
    answer:
      "Pricing depends on the number of pages, design complexity, and features required (e.g. e-commerce, custom CMS, integrations). We provide a transparent, fixed-price quote after a free consultation — see our Pricing page for starting ranges.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "A standard business website typically takes 5-7 working days. Larger projects like e-commerce stores or custom web applications can take 2-4 weeks depending on scope.",
  },
  {
    question: "Will my website rank on Google?",
    answer:
      "Every website we build follows on-page SEO best practices — fast load times, clean semantic HTML, mobile responsiveness, and proper metadata — which gives you a strong technical foundation. We also offer dedicated SEO and digital marketing services to actively grow your rankings.",
  },
  {
    question: "Do you offer support after the website is live?",
    answer:
      "Yes, we offer annual maintenance and support plans covering updates, bug fixes, backups, and performance monitoring so your website keeps running smoothly after launch.",
  },
];

export default function WebsiteDevelopmentNagpurPage() {
  return (
    <>
      <PageJSONLD
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Website Development in Nagpur", url: PAGE_URL },
          ]),
          buildFAQSchema(faqs),
        ]}
      />
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="absolute inset-0 hero-grid" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="container-mx container-px relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
                <MapPin className="h-4 w-4" /> Nagpur, Maharashtra
              </span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Website Development in{" "}
                <span className="gradient-text">Nagpur</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Unicorn Technologies is a Nagpur-based web development company
                building fast, SEO-friendly, and mobile-responsive websites for
                local businesses, startups, and enterprises. From a simple
                business website to a full e-commerce platform, we design and
                develop it in Nagpur, for Nagpur — and beyond.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/app-development-in-nagpur"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Need an App Too?
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="container-mx container-px">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <div className="overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={webAppImg}
                    alt="Website development company in Nagpur"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  What You Get
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Websites Built to{" "}
                  <span className="gradient-text">Perform</span>
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Every website we deliver in Nagpur is designed to load fast,
                  look great on mobile, and be structured for search engines
                  from day one.
                </p>
                <ul className="mt-6 space-y-3">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="container-mx container-px">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Who We Work With
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Industries We Serve in{" "}
                <span className="gradient-text">Nagpur</span>
              </h2>
            </Reveal>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="rounded-xl border border-border bg-card px-4 py-5 text-center text-sm font-medium"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <OurProcess />

        <section className="py-20 md:py-28">
          <div className="container-mx container-px">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                FAQ
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Website Development in Nagpur —{" "}
                <span className="gradient-text">Your Questions</span>
              </h2>
            </Reveal>
            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
