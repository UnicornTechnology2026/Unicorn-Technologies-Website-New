import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Reveal } from "@/components/animations";
import CTASection from "@/components/sections/cta";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Custom website development plans from Unicorn Technologies — Basic, Standard, and Premium packages with transparent pricing for startups, growing businesses, and large brands.",
  openGraph: {
    title: "Pricing | Unicorn Technologies",
    description:
      "Custom website development plans from Unicorn Technologies — Basic, Standard, and Premium packages with transparent pricing for startups, growing businesses, and large brands.",
    url: "https://www.unicorntechnologiess.com/pricing",
    type: "website",
    siteName: "Unicorn Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Unicorn Technologies",
    description:
      "Custom website development plans from Unicorn Technologies — Basic, Standard, and Premium packages with transparent pricing for startups, growing businesses, and large brands.",
  },
};

const plans = [
  {
    name: "Basic",
    tagline: "Perfect for startups, local businesses & personal brands.",
    price: "6,999",
    featured: false,
    features: [
      "Up to 5 Pages Website",
      "Responsive Mobile-Friendly Design",
      "Modern UI/UX Layout",
      "Contact From Integration",
      "WhatsApp Chat Integration",
      "Basic SEO Setup",
      "Fast Loading Website",
      "Social Media Integration",
      "SSL Security Setup",
      "Google Map Integration",
      "Admin Panel Access",
      "1 Month Free Support",
    ],
    suitableFor: [
      "Doctors",
      "Consultants",
      "Local Businesses",
      "Personal Brands",
      "Small Agencies",
    ],
  },
  {
    name: "Premium",
    tagline: "Perfect for brands that need advanced features & performance.",
    price: "13,999",
    featured: true,
    features: [
      "Up to 15 Pages Website",
      "Fully Custom Premium Design",
      "Dynamic Website Development",
      "Advanced Animations & Effects",
      "Custom Contact & Inquiry Forms",
      "SEO Optimized Website",
      "Advanced Speed Optimization",
      "Blog & News Section",
      "Portfolio/ Case Study Section",
      "CRM / API Integration",
      "Booking / Appointment System",
      "Multi - Language Support",
      "Google Analytics & Search Console",
      "Advanced Security Features",
      "Priority Support",
      "3 Months Free Support",
    ],
    suitableFor: [
      "Large Businesses",
      "Healthcare",
      "Trevel",
      "Finance",
      "SaaS",
      "Growing Brands",
    ],
  },
  {
    name: "Standard",
    tagline: "Ideal for growing businesses & service providers.",
    price: "10,999",
    featured: false,
    features: [
      "Up to 10 Pages Website",
      "Premium Custom Design",
      "Advanced UI/UX",
      "Speed Optimization",
      "SEO Optimized Structure",
      "Blog Setup",
      "Lead Genration Form",
      "WhatsApp & Live Chat Integration",
      "Social Media Integration",
      "Gallery & Portfolio Section",
      "Basic On- Page SEO",
      "Security Optimization",
      "Admin Dashboard",
      "Google Analytics Integration",
      "2 Months Free Support",
    ],
    suitableFor: [
      "Agencies",
      "Real Estate",
      "Education",
      "Corporate Businesses",
      "Service Companies",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="absolute inset-0 hero-grid" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="container-mx container-px relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Pricing
              </span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Custom Website{" "}
                <span className="gradient-text">Development Plans</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Transparent, upfront pricing for every stage of your business —
                from your first website to a fully custom digital platform.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Plans */}
        <section className="pb-20 md:pb-28">
          <div className="container-mx container-px">
            <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
              {plans.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 0.1} className="h-full">
                  <div
                    className={cn(
                      "relative flex h-full flex-col rounded-3xl border p-8",
                      plan.featured
                        ? "border-transparent bg-foreground text-background shadow-2xl lg:-translate-y-4"
                        : "border-border bg-card",
                    )}
                  >
                    {plan.featured && (
                      <span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg">
                        <Sparkles className="h-3.5 w-3.5" />
                        Most Popular
                      </span>
                    )}

                    <div className="text-center">
                      <h2 className="text-2xl font-bold tracking-tight">
                        {plan.name}
                      </h2>
                      <p
                        className={cn(
                          "mx-auto mt-3 max-w-xs text-sm leading-relaxed",
                          plan.featured
                            ? "text-background/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {plan.tagline}
                      </p>
                    </div>

                    <ul
                      className={cn(
                        "mt-8 flex-1 space-y-3 border-t pt-8",
                        plan.featured
                          ? "border-background/15"
                          : "border-border",
                      )}
                    >
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <Check
                            className={cn(
                              "mt-0.5 h-4 w-4 shrink-0",
                              plan.featured ? "text-primary" : "text-primary",
                            )}
                          />
                          <span
                            className={cn(
                              plan.featured
                                ? "text-background/90"
                                : "text-muted-foreground",
                            )}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-full py-4 text-center text-2xl font-extrabold",
                          plan.featured
                            ? "bg-primary text-primary-foreground"
                            : "bg-foreground text-background",
                        )}
                      >
                        ₹{plan.price}/-
                      </div>
                    </div>

                    <div
                      className={cn(
                        "mt-6 rounded-2xl p-5",
                        plan.featured ? "bg-background/10" : "bg-muted",
                      )}
                    >
                      <p className="text-sm font-bold uppercase tracking-wide">
                        Suitable For
                      </p>
                      <ul
                        className={cn(
                          "mt-3 space-y-1.5 text-sm",
                          plan.featured
                            ? "text-background/80"
                            : "text-muted-foreground",
                        )}
                      >
                        {plan.suitableFor.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span
                              className={cn(
                                "h-1 w-1 rounded-full",
                                plan.featured
                                  ? "bg-background/70"
                                  : "bg-primary",
                              )}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mx-auto mt-14 max-w-2xl text-center">
              <p className="text-lg font-medium text-muted-foreground">
                DM us for a custom quote and full details. Let's grow your
                business together!
              </p>
            </Reveal>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
