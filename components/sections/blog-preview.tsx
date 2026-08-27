'use client';

import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { supabase } from '@/lib/supabase/client';
import type { BlogPost } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container-mx container-px">
        <Reveal className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Blog</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Latest <span className="gradient-text">Insights</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            View all posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                  {post.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-cyan-400/10">
                      <span className="text-4xl font-bold text-primary/20">{post.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {post.author && <span>{post.author}</span>}
                    {post.published_at && (
                      <>
                        {post.author && <span>·</span>}
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug group-hover:text-primary">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
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
