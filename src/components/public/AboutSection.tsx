import React from 'react';
import {
  ShieldCheck,
  Award,
  Users2,
  Code2,
  Cpu,
  Target,
  Sparkles,
  CheckCircle,
  Building2,
  MapPin,
  Flame,
} from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const values = [
    {
      title: 'Architectural Rigor',
      description: 'We adhere to uncompromising engineering standards. Every line conforms to strict type safety, zero memory leaks, and high-concurrency stress testing.',
      icon: Code2,
    },
    {
      title: '100% IP & Code Ownership',
      description: 'You own all source code repositories, Figma design systems, infrastructure scripts, and proprietary IP from Day 1 under clear Indian & international legal frameworks.',
      icon: ShieldCheck,
    },
    {
      title: 'Agile Transparency & Sprints',
      description: 'Direct bi-weekly sprint demos, shared Git repos, daily Slack / Jira updates, and direct access to senior engineers without bureaucratic overhead.',
      icon: Target,
    },
    {
      title: 'ROI & Conversion Driven',
      description: 'We bridge elite engineering with commercial viability. Every feature is constructed with business outcomes, user retention, and speed in mind.',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#f8fafc] text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5 text-orange-500" />
              <span>About Unicorn Technologies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
              Empowering Global Unicorns & Indian Enterprises with Scalable Tech.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              Founded in Bengaluru—India’s Silicon Valley—<strong className="text-slate-900 font-semibold">Unicorn Technologies</strong> was built on the conviction that mission-critical digital products should be architecturally bulletproof, blazingly fast, and commercially transformative.
            </p>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
              With innovation hubs across Bengaluru, Hyderabad, Pune, Mumbai, and Delhi-NCR, our multidisciplinary squads unite elite full-stack systems architects, UI/UX interaction designers, cloud SREs, and growth marketing strategists under a relentless agile delivery model.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">12+</div>
                <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">Years of Craft</div>
              </div>
              <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-orange-600">450+</div>
                <div className="text-[11px] text-orange-800 uppercase font-bold tracking-wider mt-0.5">Apps Shipped</div>
              </div>
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-black text-blue-700">120+</div>
                <div className="text-[11px] text-blue-800 uppercase font-bold tracking-wider mt-0.5">Engineers</div>
              </div>
            </div>
          </div>

          {/* Right Image / Visual Grid */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl p-2.5">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Unicorn Technologies Engineering Team Collaborating"
                className="w-full h-80 sm:h-96 object-cover rounded-xl"
                loading="lazy"
              />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold text-orange-600 tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-500" /> Engineering DNA
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    "Architecting software that handles millions of transactions with sub-second precision."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-xl bg-white border border-slate-200/90 hover:border-orange-400 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold">0{i + 1}</span>
                </div>
                <h3 className="text-base font-black tracking-tight text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{v.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
