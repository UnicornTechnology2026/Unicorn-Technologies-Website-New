import React from 'react';
import {
  ShieldCheck,
  Zap,
  Users,
  Lock,
  Clock,
  Banknote,
  Award,
  Sparkles,
  Check,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Dedicated Senior Engineering Squads',
      description: 'Zero junior handover. You collaborate directly with seasoned full-stack architects and senior UI/UX specialists from our Bengaluru and Hyderabad tech centers.',
      icon: Users,
      badge: 'Top 1% Talent',
    },
    {
      title: '100% IP & Source Code Ownership',
      description: 'You own all intellectual property, repository commits, databases, and custom design systems from Day 1 under explicit legal transfer agreements.',
      icon: ShieldCheck,
      badge: 'Unrestricted Rights',
    },
    {
      title: 'Guaranteed 99.99% Production SLA',
      description: 'Enterprise Site Reliability Engineering with proactive incident detection, automated multi-zone failovers, and 24/7 emergency response.',
      icon: Clock,
      badge: 'Enterprise Uptime',
    },
    {
      title: 'Bank-Grade Security & NPCI Compliance',
      description: 'Adhering strictly to OWASP Top 10 security standards, end-to-end encryption, automated dependency audits, and Indian FinTech data localization.',
      icon: Lock,
      badge: 'Bank-Grade Shield',
    },
    {
      title: 'Bi-Weekly Agile Sprints & Live Demos',
      description: 'Iterative, fast-paced 2-week delivery cycles. Test working code in cloud staging environments with transparent Jira/Linear sprint tracking.',
      icon: Zap,
      badge: 'Rapid Velocity',
    },
    {
      title: 'Milestone-Based Transparent Pricing',
      description: 'Clear deliverables, fixed scope quotes, or dedicated monthly squads in INR or USD with zero hidden infrastructure surcharges.',
      icon: Banknote,
      badge: 'Transparent Contracts',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#f8fafc] text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-orange-500" />
            <span>Why Unicorn Technologies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Engineered For Technical Precision & Velocity
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We eliminate typical agency friction by delivering elite engineering discipline, transparent communication, and uncompromising software craftsmanship.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-xl bg-white border border-slate-200/90 hover:border-orange-400 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] uppercase tracking-wider text-slate-600">Guaranteed in every contract</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
