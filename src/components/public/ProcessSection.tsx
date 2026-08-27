import React from 'react';
import {
  Compass,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Discovery & Tech Blueprint',
      description: 'We analyze your business requirements, target users, API integrations, and architect a robust system roadmap with milestone commitments.',
      icon: Compass,
      deliverables: 'SRS Spec, DB Schema & Tech Stack Matrix',
    },
    {
      stepNumber: '02',
      title: 'UI/UX & Interactive Design',
      description: 'Our product designers create clickable high-fidelity Figma prototypes, modern design systems, and mobile-optimized conversion funnels.',
      icon: Palette,
      deliverables: 'Figma Design System & Clickable Flow',
    },
    {
      stepNumber: '03',
      title: 'Agile Full-Stack Coding',
      description: 'Development in 2-week sprints with continuous integration, automated unit testing, and live cloud previews for rapid stakeholder review.',
      icon: Code2,
      deliverables: 'Clean TypeScript, Cloud Staging & Demos',
    },
    {
      stepNumber: '04',
      title: 'QA, Security & Stress Audit',
      description: 'Rigorous end-to-end testing across 25+ device profiles, OWASP security scans, UPI/payment gateway audits, and sub-100ms speed tuning.',
      icon: ShieldCheck,
      deliverables: 'QA Report, Security Audit & 95+ Vitals',
    },
    {
      stepNumber: '05',
      title: 'Production Cutover & 24/7 SLA',
      description: 'Zero-downtime production deployment to cloud edge (AWS/GCP/Vercel) accompanied by real-time APM monitoring and hyper-care warranty.',
      icon: Rocket,
      deliverables: 'Production Live, Full Repo IP, 24/7 SLA',
    },
  ];

  return (
    <section id="process" className="py-24 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>How We Deliver</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            5-Stage High-Velocity Delivery Process
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A battle-tested agile methodology engineered to eliminate technical debt, prevent launch delays, and build world-class software on time.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-slate-200/90 hover:border-orange-400 hover:shadow-lg transition-all flex flex-col justify-between group relative"
              >
                {/* Step Number */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-orange-600 px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200">
                      Phase {step.stepNumber}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-black tracking-tight text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[10px] font-mono font-bold text-orange-700 uppercase">Deliverables</div>
                  <div className="text-xs font-semibold text-slate-800 mt-0.5">{step.deliverables}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
