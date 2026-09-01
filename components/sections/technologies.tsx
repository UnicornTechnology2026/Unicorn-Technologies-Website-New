"use client";

import { TECH_STACK } from "@/lib/constants";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Technologies() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-mx container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Tech Stack
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Technologies We <span className="gradient-text">Work With</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We use modern, battle-tested tools across the stack to build fast,
            secure, and scalable products.
          </p>
        </Reveal>

        <TooltipProvider delayDuration={150}>
          <div className="mt-16 space-y-14">
            {TECH_STACK.map((group) => {
              const GroupIcon = group.icon;
              return (
                <Reveal key={group.category}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <GroupIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold">{group.category}</h3>
                  </div>

                  <StaggerContainer className="mt-6 flex flex-wrap gap-4">
                    {group.items.map((tech) => {
                      const TechIcon = tech.icon;
                      return (
                        <StaggerItem key={tech.name}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="group flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-lg sm:h-20 sm:w-20"
                                aria-label={tech.name}
                              >
                                <TechIcon className="h-7 w-7 transition-transform group-hover:scale-110 sm:h-8 sm:w-8" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>{tech.name}</TooltipContent>
                          </Tooltip>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>
                </Reveal>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
