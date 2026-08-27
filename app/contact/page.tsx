import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ContactForm from '@/components/contact-form';
import { Reveal } from '@/components/animations';
import { SettingsInfo } from '@/components/settings-info';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Unicorn Technologies. Start your project, request a free consultation, or ask us anything.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-12">
          <div className="absolute inset-0 hero-grid" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="container-mx container-px relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Contact Us</span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Let's Build <span className="gradient-text">Together</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Tell us about your project. We will get back to you within 24 hours with next steps.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="container-mx container-px">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
              <Reveal>
                <SettingsInfo />
              </Reveal>
              <Reveal delay={0.1}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
