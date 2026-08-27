import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, User, Tag, Sparkles } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogs }) => {
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 bg-[#f8fafc] text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-orange-500" />
            <span>Engineering & Tech Insights</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Perspectives On Architecture, Fintech & Scale
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Practical breakdowns, architectural decisions, and technical strategies straight from our senior engineering architects in Bengaluru.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-xl bg-white border border-slate-200/90 hover:border-orange-400 overflow-hidden flex flex-col justify-between group transition-all shadow-sm hover:shadow-xl hover:shadow-orange-500/10"
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md bg-white/95 text-slate-800 border border-slate-200 shadow-xs backdrop-blur-md">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1 font-mono text-[11px] font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-orange-600 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors mb-3 leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-6 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    By <span className="font-bold text-slate-800">{blog.author}</span>
                  </div>
                  <button
                    id={`read-blog-btn-${blog.id}`}
                    onClick={() => setActiveBlog(blog)}
                    className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Blog Article Reader Modal */}
      {activeBlog && (
        <div
          id="blog-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveBlog(null)}
        >
          <div
            id="blog-modal-content"
            className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="close-blog-modal"
              onClick={() => setActiveBlog(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header tags */}
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 font-mono font-bold">
              <span className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 border border-orange-200 uppercase">
                {activeBlog.category}
              </span>
              <span>•</span>
              <span>{activeBlog.readTime}</span>
              <span>•</span>
              <span>{activeBlog.publishedAt}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
              {activeBlog.title}
            </h2>

            {/* Author */}
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-200 text-sm text-slate-700">
              <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-700 font-bold">
                {activeBlog.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900 uppercase tracking-wider text-xs">{activeBlog.author}</div>
                <div className="text-xs text-slate-500">{activeBlog.authorRole}</div>
              </div>
            </div>

            {/* Cover */}
            <div className="rounded-xl overflow-hidden mb-8 h-64 bg-slate-100 border border-slate-200">
              <img
                src={activeBlog.coverImage}
                alt={activeBlog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line mb-8 font-normal">
              {activeBlog.content}
            </div>

            {/* Tags */}
            {activeBlog.tags && activeBlog.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold text-slate-500 mr-2 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-orange-600" /> Topics:
                </span>
                {activeBlog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
