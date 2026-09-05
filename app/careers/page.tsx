import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/animations";
import OpenPositions from "@/components/sections/open-positions";
import CTASection from "@/components/sections/cta";
import {
  TrendingUp,
  Users,
  GraduationCap,
  Wallet,
  Rocket,
  Coffee,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Unicorn Technologies team. Explore open roles in development, design, and marketing, and help us build world-class digital products.",
  openGraph: {
    title: "Careers | Unicorn Technologies",
    description:
      "Join the Unicorn Technologies team. Explore open roles in development, design, and marketing, and help us build world-class digital products.",
    url: "https://www.unicorntechnologiess.com/careers",
    type: "website",
    siteName: "Unicorn Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Unicorn Technologies",
    description:
      "Join the Unicorn Technologies team. Explore open roles in development, design, and marketing, and help us build world-class digital products.",
  },
};

const perks = [
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description:
      "Take on real responsibility early and grow into the role you want, not just the one you were hired for.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Work closely with a small, focused team where every voice matters and good ideas get shipped fast.",
  },
  {
    icon: Rocket,
    title: "Exciting Projects",
    description:
      "Work across websites, mobile apps, and custom software for clients in healthcare, real estate, retail, and more.",
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description:
      "Get hands-on exposure to modern tools and frameworks, with support to keep leveling up your skills.",
  },
  {
    icon: Wallet,
    title: "Competitive Compensation",
    description:
      "We recognize and reward good work with pay and growth that keeps pace with your contribution.",
  },
  {
    icon: Coffee,
    title: "Balanced Work Life",
    description:
      "Flexible ways of working and a culture that respects your time outside of work.",
  },
];

export default function CareersPage() {
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
                Careers
              </span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Join Our <span className="gradient-text">Growing Team</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                We're building digital products that help businesses grow — and
                we're looking for people who want to build them with us.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="bg-secondary/30 py-20 md:py-28">
          <div className="container-mx container-px">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Why Work With Us
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Build Your Career{" "}
                <span className="gradient-text">With Unicorn</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A place where you can do meaningful work, learn constantly, and
                see the impact of what you build.
              </p>
            </Reveal>

            <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <StaggerItem key={perk.title}>
                    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:shadow-lg">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold">
                        {perk.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {perk.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Open Positions */}
        <div className="pt-20 md:pt-28">
          <OpenPositions />
        </div>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
