'use client';

import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { Reveal } from '@/components/animations';
import { supabase } from '@/lib/supabase/client';
import type { Testimonial } from '@/lib/types';

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => setItems(data ?? []));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container-mx container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Testimonials</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/10" />
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    {t.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.author}</div>
                    {(t.role || t.company) && (
                      <div className="text-xs text-muted-foreground">
                        {t.role}{t.role && t.company ? ' at ' : ''}{t.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
