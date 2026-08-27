'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useSettings } from './settings-provider';

export default function WhatsAppButton() {
  const { settings } = useSettings();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const number = (settings.whatsapp || '').replace(/\D/g, '');
  if (!number) return null;

  const href = `https://wa.me/${number}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#1da851] hover:shadow-xl ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm sm:inline">Chat with us</span>
    </a>
  );
}
