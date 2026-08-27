import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Phone,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Code2,
  Lock,
  Cpu,
  MapPin,
} from 'lucide-react';
import { WebsiteSettings } from '../../types';

interface NavbarProps {
  settings?: WebsiteSettings | null;
  onOpenEstimator: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onOpenEstimator,
  onNavigateToSection,
  onOpenAdminLogin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Why Us', id: 'why-us' },
    { label: 'Process', id: 'process' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigateToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      {/* Top micro bar for Indian Tech Hubs & Quick Contact */}
      <div className="hidden lg:block border-b border-slate-100/80 pb-1.5 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-semibold border border-orange-200">
              <span className="text-xs">🇮🇳</span> India’s Premier Software & Cloud Engineering Powerhouse
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3 h-3 text-orange-500" />
              Bengaluru (HQ) • Hyderabad • Pune • Mumbai • Delhi-NCR | Global
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              24/7 Global Agile Sprints & Production SLAs
            </span>
            <button
              onClick={onOpenAdminLogin}
              className="hover:text-orange-600 flex items-center gap-1 transition-colors text-slate-400 font-semibold"
            >
              <Lock className="w-3 h-3" /> Admin Portal
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick('hero');
          }}
          id="nav-logo"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-9 h-9 bg-gradient-to-tr from-orange-500 via-amber-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-all">
            <Cpu className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
              UNICORN <span className="font-extrabold text-orange-600">TECH</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60 ml-0.5">🇮🇳</span>
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-slate-500 -mt-0.5">
              Software & Digital Solutions
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 border border-slate-200 px-3 py-1.5 rounded-full shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-orange-600 hover:bg-white rounded-full transition-all duration-150 cursor-pointer shadow-none hover:shadow-xs"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div className="hidden md:flex items-center gap-3">
          {settings?.phone && (
            <a
              id="nav-phone-link"
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50/60 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-600" />
              <span>{settings.phone}</span>
            </a>
          )}

          <button
            id="nav-estimator-btn"
            onClick={onOpenEstimator}
            className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 bg-white border border-slate-300 hover:border-blue-400 px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Cost & Scope Estimator</span>
          </button>

          <button
            id="nav-start-project-btn"
            onClick={() => handleItemClick('contact')}
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20 transition-all cursor-pointer active:scale-95"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 hover:text-orange-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="xl:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 shadow-xl mt-2 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="p-2 rounded-lg bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-900 flex items-center gap-2">
            <span>🇮🇳</span>
            <span>Engineering Hubs in Bengaluru, Hyderabad, Pune, Mumbai, Delhi-NCR</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className="text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-orange-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              id="mobile-estimator-btn"
              onClick={() => {
                onOpenEstimator();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4 text-blue-600" />
              <span>Scope & Cost Estimator</span>
            </button>

            <button
              id="mobile-start-project-btn"
              onClick={() => handleItemClick('contact')}
              className="w-full py-3 px-4 rounded-lg bg-orange-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-orange-700 transition-colors"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between pt-2 px-1 text-xs text-slate-500">
              <button
                id="mobile-admin-login-btn"
                onClick={() => {
                  onOpenAdminLogin();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-slate-500 hover:text-orange-600 font-semibold"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-1 text-slate-700 font-bold"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-600" />
                  <span>{settings.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
