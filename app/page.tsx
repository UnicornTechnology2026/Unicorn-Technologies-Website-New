import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Hero from '@/components/sections/hero';
import ServicesPreview from '@/components/sections/services-preview';
import WhyChooseUs from '@/components/sections/why-choose-us';
import OurProcess from '@/components/sections/our-process';
import PortfolioPreview from '@/components/sections/portfolio-preview';
import Testimonials from '@/components/sections/testimonials';
import BlogPreview from '@/components/sections/blog-preview';
import FAQ from '@/components/sections/faq';
import CTASection from '@/components/sections/cta';
import { JSONLD } from '@/components/json-ld';

export default function HomePage() {
  return (
    <>
      <JSONLD />
      <Navbar />
      <main>
        <Hero />
        <ServicesPreview />
        <WhyChooseUs />
        <OurProcess />
        <PortfolioPreview />
        <Testimonials />
        <BlogPreview />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
