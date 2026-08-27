'use client';

import { Reveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { WHY_CHOOSE_US } from '@/lib/constants';
import { Award, Users, Clock, TrendingUp, MessageSquare, Wrench } from 'lucide-react';

const icons = [Award, Users, Clock, TrendingUp, MessageSquare, Wrench];

export default function WhyChooseUs() {
  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container-mx container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Why Choose Us</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Reasons Businesses Trust <span className="gradient-text">Unicorn Technologies</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We combine technical excellence with business insight to deliver results that matter.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={item.title}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:shadow-lg">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
