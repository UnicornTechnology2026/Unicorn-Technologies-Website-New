import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Reveal } from '@/components/animations';
import CTASection from '@/components/sections/cta';
import PortfolioGrid from '@/components/portfolio-grid';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our portfolio of web, mobile, and custom software projects delivered for clients across various industries.',
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="absolute inset-0 hero-grid" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="container-mx container-px relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Portfolio</span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Our <span className="gradient-text">Projects</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                A selection of products we have designed and built. Every project is a testament to our commitment to quality and innovation.
              </p>
            </Reveal>
          </div>
        </section>

        <PortfolioGrid />

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
