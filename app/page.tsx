import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/sections/hero";
import ServicesPreview from "@/components/sections/services-preview";
import Technologies from "@/components/sections/technologies";
import WhyChooseUs from "@/components/sections/why-choose-us";
import OurProcess from "@/components/sections/our-process";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import CTASection from "@/components/sections/cta";
import { JSONLD } from "@/components/json-ld";

export default function HomePage() {
  return (
    <>
      <JSONLD />
      <Navbar />
      <main>
        <Hero />
        <ServicesPreview />
        <Technologies />
        <WhyChooseUs />
        <OurProcess />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
