'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import type { BlogPost } from '@/lib/types';
import { Reveal } from '@/components/animations';
import { CalendarDays, ArrowLeft } from 'lucide-react';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  if (posts.length === 0) {
    return (
      <section className="py-20 pb-28">
        <div className="container-mx container-px text-center">
          <p className="text-muted-foreground">Blog posts will appear here once published.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 md:pb-28">
      <div className="container-mx container-px">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
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
                      <span className="text-5xl font-bold text-primary/20">{post.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-2 flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="text-lg font-semibold leading-snug group-hover:text-primary">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  )}
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    {post.author && <span>{post.author}</span>}
                    {post.published_at && (
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
