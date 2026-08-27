'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/animations';

export default function ServicesPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-mx container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">What We Do</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Services Built to Drive <span className="gradient-text">Growth</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From web and mobile development to digital marketing and custom software, we deliver solutions that move your business forward.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/40 hover:shadow-xl"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.short}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
