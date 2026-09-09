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
import appDevImg from "../../assest/app-dev.jpg";

const SITE_URL = "https://www.unicorntechnologiess.com";
const PAGE_URL = `${SITE_URL}/app-development-in-nagpur`;

export const metadata: Metadata = {
  title: "App Development in Nagpur",
  description:
    "Looking for app development in Nagpur? Unicorn Technologies builds native & cross-platform Android and iOS apps for businesses and startups in Nagpur, Maharashtra. Get a free quote today.",
  alternates: {
    canonical: "/app-development-in-nagpur",
  },
  openGraph: {
    title: "App Development in Nagpur | Unicorn Technologies",
    description:
      "Native & cross-platform Android and iOS app development for businesses and startups in Nagpur. From idea to App Store launch.",
    url: PAGE_URL,
    type: "website",
    siteName: "Unicorn Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Development in Nagpur | Unicorn Technologies",
    description:
      "Native & cross-platform Android and iOS app development for businesses and startups in Nagpur. From idea to App Store launch.",
  },
};

const deliverables = [
  "Native Android & iOS app development",
  "Cross-platform apps with React Native",
  "UI/UX design tailored to your users",
  "App Store & Play Store deployment support",
  "Push notifications & real-time features",
  "Post-launch monitoring & app maintenance",
];

const useCases = [
  "Startup MVP apps",
  "E-commerce & delivery apps",
  "Booking & appointment apps",
  "Internal business/ops apps",
  "On-demand service apps",
  "Education & learning apps",
];

const faqs = [
  {
    question: "Do you build mobile apps for startups and businesses in Nagpur?",
    answer:
      "Yes. We are based in Nagpur and work with local startups, MSMEs, and enterprises to design, build, and launch Android and iOS apps — as well as clients across Maharashtra and India.",
  },
  {
    question: "Should I build a native app or a cross-platform app?",
    answer:
      "It depends on your budget, timeline, and feature requirements. Native apps offer the best performance for complex, platform-specific features, while cross-platform apps (built with React Native) let you launch on both Android and iOS faster and at lower cost. We help you decide during the free consultation.",
  },
  {
    question: "How much does app development cost in Nagpur?",
    answer:
      "Cost depends on app complexity, number of screens, backend requirements, and integrations. We provide a transparent, fixed-price quote after understanding your requirements — see our Pricing page for starting ranges.",
  },
  {
    question: "How long does it take to build an app?",
    answer:
      "A typical MVP app takes around 3-4 weeks, while more complex apps with custom backends and integrations can take 6-10 weeks. We share a detailed timeline after the discovery phase.",
  },
  {
    question: "Will you help publish the app to the Play Store and App Store?",
    answer:
      "Yes, we handle the full submission process for both the Google Play Store and Apple App Store, including store listing assets, compliance checks, and release management.",
  },
];

export default function AppDevelopmentNagpurPage() {
  return (
    <>
      <PageJSONLD
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "App Development in Nagpur", url: PAGE_URL },
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
                App Development in <span className="gradient-text">Nagpur</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Unicorn Technologies is a Nagpur-based mobile app development
                company building native and cross-platform Android & iOS apps
                for startups and businesses. From concept and design to App
                Store launch, we handle the entire mobile development lifecycle
                — right here in Nagpur.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/website-development-in-nagpur"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Need a Website Too?
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
                    src={appDevImg}
                    alt="App development company in Nagpur"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  What You Get
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Apps Built for{" "}
                  <span className="gradient-text">Real Users</span>
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Every app we build in Nagpur is designed around your users,
                  tested across devices, and shipped with production-ready code.
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
                What We Build
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Apps for Every <span className="gradient-text">Use Case</span>
              </h2>
            </Reveal>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
              {useCases.map((useCase) => (
                <div
                  key={useCase}
                  className="rounded-xl border border-border bg-card px-4 py-5 text-center text-sm font-medium"
                >
                  {useCase}
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
                App Development in Nagpur —{" "}
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
