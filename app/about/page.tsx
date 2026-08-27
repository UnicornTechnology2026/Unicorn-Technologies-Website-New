import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Reveal } from '@/components/animations';
import WhyChooseUs from '@/components/sections/why-choose-us';
import OurProcess from '@/components/sections/our-process';
import CTASection from '@/components/sections/cta';
import { Target, Eye, Heart, Users, Rocket, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Unicorn Technologies — our mission, vision, and the team behind innovative software and digital solutions.',
};

const values = [
  { icon: Target, title: 'Our Mission', description: 'To empower businesses with cutting-edge digital solutions that drive growth, efficiency, and innovation.' },
  { icon: Eye, title: 'Our Vision', description: 'To be the most trusted technology partner for businesses seeking to transform ideas into impactful digital products.' },
  { icon: Heart, title: 'Our Values', description: 'Integrity, excellence, and client success are at the core of everything we do. We build relationships, not just software.' },
];

const stats = [
  { icon: Users, label: 'Expert Team', value: 'Dedicated' },
  { icon: Rocket, label: 'Fast Delivery', value: 'Agile' },
  { icon: Award, label: 'Quality First', value: 'Proven' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="absolute inset-0 hero-grid" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="container-mx container-px relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">About Us</span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                We Build <span className="gradient-text">Digital Futures</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Unicorn Technologies is a full-service software and digital solutions company. We help startups and enterprises design, build, and scale world-class digital products that users love.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24">
          <div className="container-mx container-px">
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <Reveal key={v.title} delay={i * 0.1}>
                    <div className="h-full rounded-2xl border border-border bg-card p-8 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold">{v.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container-mx container-px">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">Our Story</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  From Idea to <span className="gradient-text">Impact</span>
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Unicorn Technologies was founded with a simple belief: great software should be accessible to businesses of all sizes. We started as a small team of passionate developers and designers, and have grown into a full-service digital solutions provider.
                  </p>
                  <p>
                    Today, we work with clients across industries — from ambitious startups to established enterprises — helping them navigate the complexities of digital transformation. Our team brings deep technical expertise, creative problem-solving, and a relentless focus on delivering measurable results.
                  </p>
                  <p>
                    What sets us apart is not just what we build, but how we build it. We believe in transparency, collaboration, and continuous improvement. When you work with us, you are not just getting a vendor — you are getting a partner invested in your success.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center">
                        <Icon className="mx-auto h-8 w-8 text-primary" />
                        <div className="mt-3 text-2xl font-bold">{s.value}</div>
                        <div className="text-sm text-muted-foreground">{s.label}</div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <OurProcess />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
