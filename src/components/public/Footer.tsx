import React from 'react';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Facebook,
  Instagram,
  ArrowRight,
  Lock,
  Heart,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { WebsiteSettings } from '../../types';

interface FooterProps {
  settings?: WebsiteSettings | null;
  onNavigateToSection: (sectionId: string) => void;
  onOpenAdminLogin: () => void;
  onOpenEstimator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigateToSection,
  onOpenAdminLogin,
  onOpenEstimator,
}) => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Website Development',
    'Android & iOS Mobile App Development',
    'Digital Marketing & Growth',
    'Annual Maintenance & Support',
    'Custom Software Solutions',
  ];

  const quickLinks = [
    { label: 'About Us', id: 'about' },
    { label: 'Our Services', id: 'services' },
    { label: 'Case Studies', id: 'portfolio' },
    { label: 'Why Unicorn', id: 'why-us' },
    { label: '5-Step Process', id: 'process' },
    { label: 'Client Reviews', id: 'testimonials' },
    { label: 'Knowledge Base & Blog', id: 'blog' },
    { label: 'Frequently Asked Questions', id: 'faq' },
    { label: 'Contact Us', id: 'contact' },
  ];

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-blue-600 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                UNICORN<span className="text-orange-400">.</span>TECH
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {settings?.description ||
                'Unicorn Technologies is a premier software engineering & digital transformation powerhouse in Bengaluru, delivering enterprise-grade web, mobile, and cloud solutions.'}
            </p>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Engineering Hubs: Bengaluru • Hyderabad • Pune • Mumbai</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {settings?.socialLinks.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-orange-500 hover:bg-orange-500 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-orange-500 hover:bg-orange-500 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks.github && (
                <a
                  href={settings.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-orange-500 hover:bg-orange-500 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-orange-500 hover:bg-orange-500 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-orange-500 hover:bg-orange-500 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase text-orange-400 tracking-widest font-bold">
              Engineering Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((srv, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigateToSection('services')}
                    className="text-xs font-medium text-slate-300 hover:text-orange-400 transition-colors cursor-pointer text-left"
                  >
                    {srv}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase text-orange-400 tracking-widest font-bold">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.slice(0, 6).map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigateToSection(link.id)}
                    className="text-xs font-medium text-slate-300 hover:text-orange-400 transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Action */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase text-orange-400 tracking-widest font-bold">
              Bengaluru Office
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              {settings?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>{settings.phone}</span>
                </div>
              )}
              {settings?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>{settings.email}</span>
                </div>
              )}
              {settings?.address && (
                <div className="flex items-start gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEstimator}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-orange-500 hover:bg-slate-700 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Calculate Scope & Budget</span>
                <ArrowRight className="w-3 h-3 text-orange-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} {settings?.companyName || 'Unicorn Technologies Private Limited'}. All rights reserved. Registered under MCA (India).
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <button
              onClick={() => onNavigateToSection('faq')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy & DPDP Compliance
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigateToSection('faq')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Security Policy
            </button>
            <span>•</span>
            <button
              id="footer-admin-login-link"
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
