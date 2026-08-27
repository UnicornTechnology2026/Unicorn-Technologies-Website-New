import React, { useState } from 'react';
import {
  Globe,
  Smartphone,
  TrendingUp,
  Wrench,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
  Shield,
  X,
  Code2,
  Lock,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ElementType;
  gradient: string;
  badge: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  keyBenefit: string;
}

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      id: 'website-development',
      title: 'Website & Web App Development',
      badge: 'Next.js 15 & React 19',
      icon: Globe,
      gradient: 'from-blue-600 to-indigo-600',
      shortDesc: 'Ultra-fast enterprise web portals, ONDC-enabled commerce platforms, and SaaS web apps built for maximum conversions.',
      fullDesc: 'We engineer blazing-fast, responsive, and SEO-dominant web platforms using Next.js 15, React 19, TypeScript, and modern headless architectures. From high-volume Indian eCommerce & ONDC storefronts to global enterprise portals, we achieve 98+ Google Core Web Vitals with sub-second page loads.',
      deliverables: [
        'Mobile-First Responsive UI/UX with Micro-Interactions',
        'Headless Next.js 15 Server-Side Rendering & Edge Caching',
        'ONDC Network Protocol & Beckn Protocol Connectors',
        'Payment Gateways: Razorpay, Cashfree, UPI & Stripe',
        'Headless CMS & Custom Role-Based Admin Dashboards',
        'Full SEO Schema, Sitemap & Core Web Vitals Optimization',
      ],
      techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Node.js', 'PostgreSQL'],
      timeline: '2 - 6 Weeks',
      keyBenefit: 'Sub-second load times with +80% higher mobile conversions.',
    },
    {
      id: 'mobile-app-development',
      title: 'Android & iOS Mobile App Development',
      badge: 'Native & Flutter 3.x',
      icon: Smartphone,
      gradient: 'from-orange-500 to-amber-500',
      shortDesc: 'Silky 60fps mobile applications engineered for Google Play & Apple App Store with vernacular language capabilities.',
      fullDesc: 'End-to-end mobile engineering from interactive Figma design systems to published Google Play and iOS App Store builds. We specialize in high-performance Flutter and React Native architectures for unified cross-platform velocity, as well as native Swift & Kotlin for hardware-intensive mobile solutions.',
      deliverables: [
        'Unified iOS (App Store) & Android (Google Play) Builds',
        'Vernacular Indian Language Voice & Text Search (8+ Languages)',
        'Biometric Authentication (Face ID, Fingerprint) & Offline SQLite Sync',
        'Real-Time WebRTC Audio/Video & Instant Push Notifications',
        'In-App Purchases, Subscriptions & UPI Deep-Linking',
        'Complete App Store Review & Security Compliance Audits',
      ],
      techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Fastify', 'WebSockets'],
      timeline: '4 - 10 Weeks',
      keyBenefit: 'Silky 60fps native performance with rapid cross-platform rollout.',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing & Growth Engineering',
      badge: 'High-ROAS Inbound',
      icon: TrendingUp,
      gradient: 'from-emerald-600 to-teal-500',
      shortDesc: 'Technical SEO, high-intent Google Search campaigns, regional vernacular ads, and conversion funnel optimization.',
      fullDesc: 'Supercharge your inbound pipeline with an engineering-led growth strategy. We combine deep technical SEO audits, high-converting programmatic landing page experiments, vernacular search campaigns across India, and B2B Account-Based Marketing (ABM) to maximize Return on Ad Spend (ROAS).',
      deliverables: [
        'Complete Technical & Regional Vernacular SEO Blueprint',
        'High-Intent Google Ads (PPC) & Meta Performance Marketing',
        'Conversion Rate Optimization (CRO) & Heatmap A/B Testing',
        'WhatsApp Business API Lead Nurturing & Automated CRM Sync',
        'GA4 Custom Funnel Analytics & Looker Studio Attribution Dashboards',
        'B2B LinkedIn ABM & Enterprise Outbound Funnel Architecture',
      ],
      techStack: ['Google Ads', 'SEMrush', 'GA4 Analytics', 'Meta Business', 'WhatsApp API', 'HubSpot'],
      timeline: 'Monthly Agile Sprints',
      keyBenefit: 'Average 4.2x ROAS with transparent weekly attribution analytics.',
    },
    {
      id: 'maintenance-support',
      title: 'Annual Maintenance & Support (AMC)',
      badge: '24/7 Follow-the-Sun SLA',
      icon: Wrench,
      gradient: 'from-blue-700 to-cyan-600',
      shortDesc: 'Round-the-clock uptime monitoring, automated vulnerability patching, cloud cost optimization, and proactive engineering.',
      fullDesc: 'Keep your mission-critical systems rock-solid with dedicated Site Reliability Engineers (SREs). Our AMC retainers include 24/7/365 infrastructure monitoring, automated security patch cycles, multi-region database backups, dependency upgrades, and ongoing cloud cost optimization on AWS Mumbai & GCP Delhi.',
      deliverables: [
        '24/7/365 Uptime Monitoring & Sub-15 Min Incident Response',
        'Scheduled Security Vulnerability Scanning & OS Patching',
        'Automated Daily Multi-Region Database Backups & Recovery Testing',
        'AWS & GCP Infrastructure Optimization (30-40% Cost Savings)',
        'Monthly Allotted Developer Sprint Hours for New Feature Upgrades',
        'Dedicated Solutions Architect & Guaranteed SLA Agreement',
      ],
      techStack: ['AWS CloudWatch', 'Kubernetes (EKS)', 'Docker', 'Prometheus', 'Grafana', 'Terraform'],
      timeline: 'Annual Retainer with Monthly Performance Reports',
      keyBenefit: '99.999% system availability with zero surprise outages or downtime.',
    },
    {
      id: 'custom-software',
      title: 'Custom Software & FinTech Solutions',
      badge: 'High-Concurrency Scalability',
      icon: Cpu,
      gradient: 'from-amber-600 to-orange-600',
      shortDesc: 'Bespoke microservices backends, UPI 2.0 payment switches, multi-tenant SaaS platforms, and enterprise ERPs.',
      fullDesc: 'When off-the-shelf software falls short, we engineer tailored software systems designed around your operational moat. We architect multi-tenant SaaS platforms, high-throughput UPI & payment switches, warehouse logistics engines, and automated enterprise workflows with 100% intellectual property ownership.',
      deliverables: [
        'Multi-Tenant SaaS Architecture with Automated Billing',
        'High-Concurrency Microservices Backends with Redis Caching',
        'UPI 2.0, NPCI & RBI-Compliant Payment Gateway Connectors',
        'Role-Based Access Control (RBAC), SSO & Enterprise Audit Trails',
        'Third-Party API Integrations, Webhook Engines & Kafka Pipelines',
        'Complete Source Code & Intellectual Property (IP) Transfer',
      ],
      techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis Cluster', 'Docker & K8s', 'Kafka', 'AWS/GCP'],
      timeline: '6 - 16 Weeks',
      keyBenefit: '100% IP ownership designed specifically for your proprietary moat.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Comprehensive Digital Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Specialized Engineering & Growth Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From initial strategy and architecture to rapid agile sprints and 24/7 scaling, we deliver end-to-end digital excellence with enterprise rigor.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col justify-between rounded-xl bg-white border border-slate-200/90 hover:border-orange-400 p-7 sm:p-8 transition-all shadow-sm hover:shadow-xl hover:shadow-orange-500/10 group ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white group-hover:scale-105 transition-all shadow-xs"
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Quick Feature Checklist */}
                  <ul className="space-y-2.5 mb-6 border-t border-slate-100 pt-4">
                    {service.deliverables.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    id={`service-details-btn-${service.id}`}
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    id={`service-quote-btn-${service.id}`}
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="px-4 py-2 rounded-lg bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white text-xs font-bold uppercase tracking-wider border border-orange-200/80 transition-all cursor-pointer shadow-xs"
                  >
                    Request Quote
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          id="service-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div
            id="service-modal-content"
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              id="close-service-modal"
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/20">
                <selectedService.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase font-bold tracking-wider text-orange-600">
                  {selectedService.badge}
                </span>
                <h3 className="text-2xl font-black tracking-tight text-slate-900">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">Estimated Delivery</div>
                <div className="text-base font-black text-slate-900 mt-1">{selectedService.timeline}</div>
              </div>
              <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200">
                <div className="text-[11px] font-mono text-orange-700 uppercase font-bold">Key Business Value</div>
                <div className="text-sm font-bold text-orange-950 mt-1">{selectedService.keyBenefit}</div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-3">
                Key Deliverables & Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stacks */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-3">
                Technologies & Tools Deployed
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200">
              <button
                id="modal-hire-service-btn"
                onClick={() => {
                  onSelectServiceForQuote(selectedService.title);
                  setSelectedService(null);
                }}
                className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-orange-600/20 transition-all cursor-pointer"
              >
                <span>Hire Us for {selectedService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="modal-close-btn"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto py-3.5 px-5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
