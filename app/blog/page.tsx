import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Reveal } from '@/components/animations';
import CTASection from '@/components/sections/cta';
import BlogList from '@/components/blog-list';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and industry news from the Unicorn Technologies team on software development, digital marketing, and technology trends.',
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-12">
          <div className="absolute inset-0 hero-grid" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="container-mx container-px relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Blog</span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Insights & <span className="gradient-text">Articles</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Thoughts on software development, technology trends, and the digital landscape from our team.
              </p>
            </Reveal>
          </div>
        </section>

        <BlogList />

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
