import React, { useState } from 'react';
import {
  Briefcase,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  Clock,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem } from '../../types';

interface PortfolioSectionProps {
  items: PortfolioItem[];
  onSelectProjectForQuote: (projectName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  items,
  onSelectProjectForQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories = [
    'All',
    'Website Development',
    'Mobile App Development',
    'Custom Software',
    'Digital Marketing',
    'Maintenance & Support',
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="portfolio" className="py-24 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Proven Track Record & Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Featured Deployments & Engineering Success
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Explore how we engineered scalable cloud platforms, high-converting web portals, and mobile experiences across India and global markets.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`portfolio-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white font-extrabold shadow-md shadow-orange-600/20'
                  : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-orange-600 hover:bg-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between rounded-xl bg-white border border-slate-200/90 hover:border-orange-400 overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all"
              >
                {/* Image Cover */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md bg-white/95 text-slate-800 border border-slate-200 shadow-xs backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {item.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-orange-600 text-white shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">{item.client}</span>
                      <span className="font-mono text-[11px] font-semibold text-slate-500">{item.timeline}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors mb-3">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Results Badges */}
                    {item.results && item.results.length > 0 && (
                      <div className="p-3 rounded-lg bg-orange-50/70 border border-orange-200 mb-4 space-y-1">
                        <div className="text-[10px] font-mono text-orange-700 uppercase font-bold tracking-wider">
                          Key Outcome & ROI
                        </div>
                        <div className="text-xs font-bold text-slate-900">
                          {item.results[0]}
                        </div>
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.techStack.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      id={`view-case-study-${item.id}`}
                      onClick={() => setActiveModalItem(item)}
                      className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-500 hover:text-orange-600 flex items-center gap-1 uppercase font-semibold text-[11px]"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      {activeModalItem && (
        <div
          id="portfolio-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            id="portfolio-modal-content"
            className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              id="close-portfolio-modal"
              onClick={() => setActiveModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-60 rounded-xl overflow-hidden mb-6 bg-slate-100 border border-slate-200">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-white text-slate-900 border border-slate-200">
                  {activeModalItem.category}
                </span>
                <span className="text-xs text-white bg-black/70 px-2.5 py-1 rounded backdrop-blur-md font-semibold">
                  Client: {activeModalItem.client}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-3">{activeModalItem.title}</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              {activeModalItem.longDescription || activeModalItem.description}
            </p>

            {/* Results / Key Impact */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-3">
                Measurable Impact & Architecture Benchmarks
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModalItem.results.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200 flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-900">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-3">
                Tech Stack Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalItem.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200">
              <button
                id="modal-similar-project-btn"
                onClick={() => {
                  onSelectProjectForQuote(activeModalItem.title);
                  setActiveModalItem(null);
                }}
                className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-orange-600/20 transition-all cursor-pointer"
              >
                <span>Build a Similar Solution For Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveModalItem(null)}
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
