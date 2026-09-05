"use client";

import { Reveal } from "@/components/animations";
import { useSettings } from "@/components/settings-provider";
import { Mail, Briefcase } from "lucide-react";

export default function OpenPositions() {
  const { settings } = useSettings();

  return (
    <section className="pb-20 md:pb-28">
      <div className="container-mx container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Open Positions
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Current <span className="gradient-text">Openings</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-xl">
          <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Briefcase className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">
              No Vacancies Right Now
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              We don't have any open positions at the moment, but we're always
              growing. Send us your resume and we'll reach out when a role that
              fits opens up.
            </p>
            <a
              href={`mailto:${settings.email}?subject=${encodeURIComponent(
                "General Application",
              )}`}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              <Mail className="h-4 w-4" />
              {settings.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
