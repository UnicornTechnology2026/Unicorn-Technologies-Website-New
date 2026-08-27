import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanNumber = (whatsappNumber || '919880012345').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    'Hello Unicorn Technologies! I would like to discuss a new software engineering project.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white border border-slate-200 text-slate-800 p-4 rounded-xl shadow-xl max-w-xs relative hidden sm:block"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="text-xs font-black tracking-tight text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Need Technical Advice?
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Chat directly with our solutions architecture team in Bengaluru on WhatsApp.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all group cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-white group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
};
