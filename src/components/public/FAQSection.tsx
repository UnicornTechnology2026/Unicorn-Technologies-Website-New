import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'Who owns the source code and intellectual property (IP)?',
      answer:
        'You own 100% of the source code, design systems, databases, and intellectual property from Day 1. Upon milestone completion, full repository rights and cloud deployment scripts are transferred directly to your organization. We sign a strict mutual NDA before any technical discussions.',
      category: 'Ownership & Legal',
    },
    {
      question: 'How do you price projects (INR vs. USD, Fixed vs. Dedicated Squad)?',
      answer:
        'We support both GST-compliant Indian Rupee (INR) invoicing and multi-currency international billing (USD/EUR/GBP/AED). We offer milestone-based fixed price contracts (ideal for well-defined scopes) and dedicated agile engineering squads on monthly sprint retainers.',
      category: 'Pricing & Billing',
    },
    {
      question: 'What is your typical project kickoff timeline?',
      answer:
        'Discovery blueprints and initial sprint backlogs begin within 3 to 5 business days of contract execution. Web platforms typically launch in 2 to 4 weeks, while full enterprise SaaS platforms and mobile apps take between 6 to 12 weeks.',
      category: 'Timeline',
    },
    {
      question: 'Do you provide post-launch maintenance, SLAs, and security support?',
      answer:
        'Yes. We provide comprehensive Annual Maintenance Contracts (AMC) that guarantee 99.99% uptime, 24/7 incident response, automated security vulnerability scans, database backups, dependency upgrades, and dedicated developer hours for ongoing feature additions.',
      category: 'Support & AMC',
    },
    {
      question: 'How do you ensure data localization, NPCI compliance, and security?',
      answer:
        'Every project follows strict OWASP Top 10 security guidelines, automated static code analysis (SAST), end-to-end data encryption in transit and at rest, role-based access control (RBAC), and full compliance with Indian DPDP Act & RBI data localization directives.',
      category: 'Security & Compliance',
    },
    {
      question: 'Can you work with our existing codebase or internal engineering team?',
      answer:
        'Absolutely. Our senior architects regularly conduct technical audits of existing codebases to modernize legacy systems, refactor bottlenecks, or augment your existing internal team with specialized squads for rapid feature releases.',
      category: 'Engineering',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to know about our engineering standards, contracting, IP ownership, and delivery timelines.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="faq-search-input"
            type="text"
            placeholder="Search FAQs by keyword (e.g., pricing, IP, security, timeline, GST)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all shadow-2xs"
          />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-white border-orange-400 shadow-md shadow-orange-500/5'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <button
                  id={`faq-toggle-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 pr-2">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen ? 'bg-orange-600 text-white rotate-180' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                    >
                      <p>{faq.answer}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200">
                          {faq.category}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
