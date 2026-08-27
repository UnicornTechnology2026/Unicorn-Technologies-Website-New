import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Code2,
  TrendingUp,
  Globe2,
  Smartphone,
  Server,
  Activity,
  Terminal,
  Database,
  MapPin,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onStartProject: () => void;
  onConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onConsultation }) => {
  const highlights = [
    'Sub-Second Next.js 15 & React 19 Architectures',
    'Native & Cross-Platform iOS/Android (Flutter & Swift)',
    'High-Throughput UPI, FinTech & Enterprise Cloud SLAs',
    'ISO 27001, SOC2 & ABDM-Compliant Engineering',
  ];

  const techPills = [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'Flutter 3',
    'Node.js',
    'Python AI',
    'PostgreSQL',
    'AWS ap-south-1',
    'Docker & K8s',
    'UPI 2.0 & ONDC',
  ];

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#f8fafc] text-slate-900 border-b border-slate-200/80"
    >
      {/* Background Tech Grids & Ambient Glows */}
      <div className="absolute inset-0 tech-grid opacity-70 pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-r from-orange-400/10 via-amber-300/10 to-blue-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Top Badge */}
            <div
              id="hero-badge"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs mb-5"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-800 font-extrabold flex items-center gap-1.5">
                <span>🇮🇳</span> India’s Software & Cloud Engineering Powerhouse
              </span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-6xl md:text-[68px] leading-[1.02] font-black tracking-tight text-slate-900 mb-6"
            >
              Engineering Digital <span className="text-orange-600">Breakthroughs</span> & Scalable Software.
            </h1>

            {/* Short Company Description */}
            <p
              id="hero-description"
              className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed mb-8"
            >
              Headquartered in Bengaluru with development hubs in Hyderabad, Pune, Mumbai & Delhi-NCR, <strong className="text-slate-900 font-semibold">Unicorn Technologies</strong> architects mission-critical web platforms, high-velocity iOS/Android mobile apps, custom AI/FinTech pipelines, and full-funnel digital growth strategies for Indian enterprises and global unicorns.
            </p>

            {/* Tech Stack Horizontal Ticker Bar */}
            <div className="flex flex-wrap items-center gap-1.5 mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-orange-500" /> Stack:
              </span>
              {techPills.map((pill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs hover:border-orange-300 transition-colors"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-cta-start-project"
                onClick={onStartProject}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-600/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-free-consultation"
                onClick={onConsultation}
                className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-7 py-4 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider hover:border-blue-500 hover:text-blue-600 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Get Free Scope & Estimate</span>
              </button>
            </div>

            {/* Key Value Checks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full border-t border-slate-200 pt-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual / Architecture Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Tech Matrix Frame */}
            <div
              id="hero-tech-card"
              className="relative rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xl shadow-slate-200/60 overflow-hidden"
            >
              {/* Top Terminal Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono font-bold text-slate-500 ml-2">
                    unicorn-engine-india.ts
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-600 animate-pulse" /> 99.999% SLA
                </span>
              </div>

              {/* Core Expertise List */}
              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-lg bg-slate-50 hover:bg-orange-50/50 border border-slate-200/70 hover:border-orange-200 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-800 group-hover:text-orange-600 flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-blue-600" /> Web & Cloud Platforms
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Sub-50ms Edge
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Next.js 15, React 19, Microservices & GraphQL</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 hover:bg-orange-50/50 border border-slate-200/70 hover:border-orange-200 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-800 group-hover:text-orange-600 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-orange-600" /> iOS & Android Mobile Apps
                    </span>
                    <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      60fps Native
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Flutter, React Native, Swift & Vernacular Voice UI</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 hover:bg-orange-50/50 border border-slate-200/70 hover:border-orange-200 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-800 group-hover:text-orange-600 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-amber-600" /> Custom FinTech & AI Software
                    </span>
                    <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      UPI 2.0 & ONDC
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Payment Switches, Enterprise ERP & AI Workflows</p>
                </div>
              </div>

              {/* Bottom Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xl font-black text-slate-900 tracking-tight">450+</div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Enterprise Apps</div>
                </div>
                <div className="p-3 rounded-lg bg-orange-50/70 border border-orange-200 text-center">
                  <div className="text-xl font-black text-orange-600 tracking-tight">99.4%</div>
                  <div className="text-[9px] text-orange-700 uppercase font-bold tracking-wider">Client Retention</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-center">
                  <div className="text-xl font-black text-blue-700 tracking-tight">5 Hubs</div>
                  <div className="text-[9px] text-blue-700 uppercase font-bold tracking-wider">Across India 🇮🇳</div>
                </div>
              </div>

              {/* Development Hubs Badge */}
              <div className="p-3 bg-gradient-to-r from-orange-50 via-amber-50 to-blue-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                <p className="text-[11px] text-slate-700 font-semibold leading-tight">
                  <strong className="text-slate-900 font-bold">Innovation Hubs:</strong> Bengaluru (Electronic City & ORR), Hyderabad (HITEC City), Pune, Mumbai (BKC) & Gurugram.
                </p>
              </div>
            </div>

            {/* Decorative Floating Glass Chip */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -bottom-4 -left-4 items-center gap-2.5 px-4 py-2.5 rounded-lg bg-white border border-slate-300 shadow-xl"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div className="text-left">
                <div className="text-[11px] font-black text-slate-900 uppercase tracking-wider">100% IP & Code Ownership</div>
                <div className="text-[10px] text-slate-500 font-medium">Full Indian & International IP Protection</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
