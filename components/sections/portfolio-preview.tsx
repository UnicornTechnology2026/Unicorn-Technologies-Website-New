'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { supabase } from '@/lib/supabase/client';
import type { PortfolioItem } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function PortfolioPreview() {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    supabase
      .from('portfolio_items')
      .select('*')
      .eq('published', true)
      .order('featured', { ascending: false })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => setItems(data ?? []));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="container-mx container-px">
        <Reveal className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Portfolio</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our Recent <span className="gradient-text">Work</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.id}>
              <Link
                href="/portfolio"
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-cyan-400/10">
                      <span className="text-4xl font-bold text-primary/20">{item.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
