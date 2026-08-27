import React from 'react';
import { MessageSquareQuote, Star, Sparkles, Building2 } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 bg-[#f8fafc] text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Client Endorsements & CXO Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Trusted By Engineering Leaders & Founders
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Hear directly from our technology partners about our agile delivery velocity, transparent sprint communication, and architectural excellence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="p-8 rounded-xl bg-white border border-slate-200/90 hover:border-orange-400 transition-all flex flex-col justify-between shadow-sm hover:shadow-lg group"
            >
              <div>
                {/* Rating Stars & Project Type */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {test.projectType}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal italic mb-8">
                  "{test.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <img
                  src={test.avatar}
                  alt={test.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-400/80 shadow-xs"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-base font-black tracking-tight text-slate-900">{test.clientName}</h4>
                  <p className="text-xs text-slate-500">
                    {test.clientRole}, <span className="text-orange-600 font-bold">{test.clientCompany}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
