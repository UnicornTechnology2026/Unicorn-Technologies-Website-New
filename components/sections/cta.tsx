'use client';

import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Reveal } from '@/components/animations';
import { useSettings } from '../settings-provider';

export default function CTASection() {
  const { settings } = useSettings();

  return (
    <section className="py-20 md:py-28">
      <div className="container-mx container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-cyan-600 px-8 py-16 text-center md:px-16 md:py-24">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Ready to Build Something Great?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                Let us turn your idea into a powerful digital product. Get a free consultation with our experts today.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 font-semibold text-primary transition-all hover:bg-white/90 hover:shadow-xl"
                >
                  {settings.hero_cta_primary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {settings.phone && (
                  <a
                    href={`tel:${settings.phone}`}
                    className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/30 px-6 font-semibold text-white transition-all hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    Call Us
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
