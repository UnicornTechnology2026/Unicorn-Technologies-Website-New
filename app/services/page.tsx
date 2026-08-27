import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Reveal } from "@/components/animations";
import { SERVICES } from "@/lib/constants";
import CTASection from "@/components/sections/cta";
import { Check } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full range of services: website development, mobile app development, digital marketing, maintenance, and custom software solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="absolute inset-0 hero-grid" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="container-mx container-px relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our Services
              </span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Solutions That{" "}
                <span className="gradient-text">Deliver Results</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                We offer a comprehensive suite of digital services designed to
                help your business grow, scale, and stay ahead of the
                competition.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="container-mx container-px space-y-20 md:space-y-28">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const reversed = i % 2 === 1;
              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  className="scroll-mt-24"
                >
                  <Reveal>
                    <div
                      className={`grid items-center gap-10 lg:grid-cols-2 ${reversed ? "lg:[direction:rtl]" : ""}`}
                    >
                      <div className="[direction:ltr]">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                          <Icon className="h-8 w-8" />
                        </div>
                        <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                          {service.title}
                        </h2>
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-sm"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                              <span className="text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="[direction:ltr]">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-400/10">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            priority={i === 0}
                          />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
