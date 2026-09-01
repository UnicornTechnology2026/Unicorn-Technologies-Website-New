"use client";

import { Reveal } from "@/components/animations";
import { PROCESS_STEPS } from "@/lib/constants";

export default function OurProcess() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-mx container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Process
          </span>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            How we Bring Your <br />
            <span className="gradient-text">Vision to Life</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A proven, transparent process that ensures every project is
            delivered on time, on budget, and beyond expectations.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step: any, i: any) => (
            <Reveal key={step.step} delay={i * 0.1}>
              <div className="relative">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="absolute top-8 left-16 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-primary/40 to-transparent lg:block" />
                )}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-lg">
                  {step.step}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
