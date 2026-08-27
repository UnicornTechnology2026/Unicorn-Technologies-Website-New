import React, { useState, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { WebsiteSettings } from '../../types';

interface ContactSectionProps {
  settings?: WebsiteSettings | null;
  initialService?: string;
  initialBudget?: string;
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  initialService,
  initialBudget,
  initialMessage,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Website Development',
    budget: '₹5 Lakh - ₹15 Lakh ($6k - $18k)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [enquiryId, setEnquiryId] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
    if (initialBudget) {
      setFormData((prev) => ({ ...prev, budget: initialBudget }));
    }
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialService, initialBudget, initialMessage]);

  const serviceOptions = [
    'Website Development',
    'Android & iOS Mobile App Development',
    'Digital Marketing & Growth',
    'Annual Maintenance & Support',
    'Custom Software Solutions',
    'AI / Cloud & DevOps Consulting',
  ];

  const budgetOptions = [
    '< ₹3 Lakh ($3,500)',
    '₹3 Lakh - ₹5 Lakh ($3,500 - $6,000)',
    '₹5 Lakh - ₹15 Lakh ($6,000 - $18,000)',
    '₹15 Lakh - ₹35 Lakh ($18,000 - $42,000)',
    '₹35 Lakh+ ($42,000+)',
    'Enterprise / Sprint Retainer',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Basic frontend validations
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your contact phone or WhatsApp number.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMessage('Please provide a brief description of your project or requirements.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitEnquiry(formData);
      setSuccessMessage(res.message);
      setEnquiryId(res.enquiryId);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'Website Development',
        budget: '₹5 Lakh - ₹15 Lakh ($6k - $18k)',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to send message. Please try again or reach out via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = `https://wa.me/${(settings?.whatsappNumber || '919880012345').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Unicorn Technologies team, I would like to enquire about engineering a digital solution for our company.'
  )}`;

  return (
    <section id="contact" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Initiate Your Project</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Let's Engineer Something Exceptional
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Share your project vision, timeline, and goals. Our engineering leads in Bengaluru review every submission and provide a detailed technical feasibility feedback within 2-4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-lg relative">
              {successMessage ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">Project Enquiry Transmitted!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {successMessage}
                  </p>
                  {enquiryId && (
                    <div className="text-xs font-mono text-orange-700 bg-orange-50 py-2 px-4 rounded-lg inline-block border border-orange-200 font-bold">
                      Tracking Reference: {enquiryId}
                    </div>
                  )}
                  <div className="pt-6">
                    <button
                      onClick={() => {
                        setSuccessMessage(null);
                        setEnquiryId(null);
                      }}
                      className="px-6 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-xs font-bold uppercase tracking-wider text-slate-800 transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2"
                      >
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Rohan Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2"
                      >
                        Company / Organization
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        placeholder="e.g. Bharat Logistics Ltd"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2"
                      >
                        Business Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="rohan@bharatlogistics.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2"
                      >
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="+91 98800 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Service Required */}
                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2"
                      >
                        Service Required *
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-slate-900">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget */}
                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2"
                      >
                        Estimated Budget (INR / USD)
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-white text-slate-900">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2"
                    >
                      Project Scope, Requirements & Target Launch *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Tell us about the project goals, target launch timeline, key integrations (UPI, ONDC, CRM, Cloud), or current technical challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors resize-none shadow-2xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-enquiry-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Specification...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Specification</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Protected by mutual NDA & bank-grade 256-bit encryption. No spam, ever.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Info & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 shadow-sm">
              <h3 className="text-xl font-black tracking-tight text-slate-900 mb-2">Direct Contact Channels</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Prefer direct communication? Reach our solutions advisory team directly via phone, email, or instant WhatsApp consultation.
              </p>

              <div className="space-y-4">
                {settings?.phone && (
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 hover:border-orange-500 transition-all group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Direct Helpline</div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors mt-0.5">
                        {settings.phone}
                      </div>
                    </div>
                  </a>
                )}

                {settings?.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 hover:border-orange-500 transition-all group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Executive Inquiries</div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                        {settings.email}
                      </div>
                    </div>
                  </a>
                )}

                {settings?.address && (
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Bengaluru Headquarters</div>
                      <div className="text-xs text-slate-700 leading-relaxed mt-0.5 font-medium">
                        {settings.address}
                      </div>
                    </div>
                  </div>
                )}

                {settings?.officeHours && (
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Operating Hours (IST)</div>
                      <div className="text-xs text-slate-700 leading-relaxed mt-0.5 font-medium">
                        {settings.officeHours}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Instant WhatsApp Action */}
              <a
                id="contact-whatsapp-btn"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
