import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CTASection from '@/components/sections/cta';
import { supabase } from '@/lib/supabase/client';
import type { BlogPost } from '@/lib/types';
import { CalendarDays, ArrowLeft, Tag } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, cover_image')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
    },
  };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: PageProps) {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  const post = data as BlogPost | null;

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main>
        <article className="pt-32 pb-16 md:pt-40">
          <div className="container-mx container-px">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            <div className="mx-auto mt-8 max-w-3xl">
              {post.tags && post.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
                {post.title}
              </h1>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                {post.author && <span className="font-medium text-foreground">{post.author}</span>}
                {post.published_at && (
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>

              {post.cover_image && (
                <div className="mt-8 overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full object-cover"
                  />
                </div>
              )}

              {post.excerpt && (
                <p className="mt-8 text-lg font-medium text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-8 space-y-6 leading-relaxed text-foreground/90">
                {post.content.split('\n').map((paragraph, idx) => {
                  if (!paragraph.trim()) return null;
                  if (paragraph.startsWith('# ')) {
                    return <h2 key={idx} className="text-2xl font-bold mt-10 mb-2">{paragraph.slice(2)}</h2>;
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h3 key={idx} className="text-xl font-semibold mt-8 mb-2">{paragraph.slice(3)}</h3>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return <li key={idx} className="ml-6 text-muted-foreground">{paragraph.slice(2)}</li>;
                  }
                  return <p key={idx} className="text-muted-foreground">{paragraph}</p>;
                })}
              </div>
            </div>
          </div>
        </article>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
