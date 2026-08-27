'use client';

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { PortfolioItem } from '@/lib/types';
import { Reveal } from '@/components/animations';
import { ExternalLink } from 'lucide-react';

export default function PortfolioGrid() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [category, setCategory] = useState<string>('All');

  useEffect(() => {
    supabase
      .from('portfolio_items')
      .select('*')
      .eq('published', true)
      .order('featured', { ascending: false })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .then(({ data }) => setItems(data ?? []));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(items.map((i) => i.category));
    return ['All', ...Array.from(cats)];
  }, [items]);

  const filtered = useMemo(() => {
    if (category === 'All') return items;
    return items.filter((i) => i.category === category);
  }, [items, category]);

  if (items.length === 0) {
    return (
      <section className="py-20">
        <div className="container-mx container-px text-center">
          <p className="text-muted-foreground">Portfolio projects will appear here once published.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 md:pb-28">
      <div className="container-mx container-px">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl">
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
                      <span className="text-5xl font-bold text-primary/20">{item.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur">
                    {item.category}
                  </div>
                  {item.featured && (
                    <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.client && (
                    <p className="text-xs text-muted-foreground mt-1">Client: {item.client}</p>
                  )}
                  {item.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.project_url && (
                    <a
                      href={item.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Visit project <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
