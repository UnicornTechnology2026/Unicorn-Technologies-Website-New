import React, { useState } from 'react';
import {
  X,
  Calculator,
  Check,
  ArrowRight,
  Sparkles,
  Clock,
  IndianRupee,
  Layers,
} from 'lucide-react';

interface ProjectEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEstimate: (data: {
    service: string;
    budget: string;
    timeline: string;
    features: string[];
    summary: string;
  }) => void;
}

export const ProjectEstimatorModal: React.FC<ProjectEstimatorModalProps> = ({
  isOpen,
  onClose,
  onSubmitEstimate,
}) => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [projectType, setProjectType] = useState<string>('Website Development');
  const [features, setFeatures] = useState<string[]>([
    'Custom UI/UX & High-Performance Design',
    'Admin CMS & Data Management',
  ]);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'express'>('standard');

  if (!isOpen) return null;

  const projectTypes = [
    { label: 'Website Development', baseInr: 150000, baseUsd: 2500, baseWeeks: 3 },
    { label: 'Android & iOS Mobile App Development', baseInr: 350000, baseUsd: 5500, baseWeeks: 6 },
    { label: 'Custom Software Solutions', baseInr: 500000, baseUsd: 8000, baseWeeks: 8 },
    { label: 'Digital Marketing & Growth', baseInr: 80000, baseUsd: 1200, baseWeeks: 2 },
    { label: 'Annual Maintenance & Support', baseInr: 60000, baseUsd: 900, baseWeeks: 1 },
  ];

  const availableFeatures = [
    { name: 'Custom UI/UX & High-Performance Design', inr: 45000, usd: 700, weeks: 1 },
    { name: 'Admin CMS & Data Management', inr: 60000, usd: 900, weeks: 1 },
    { name: 'Payment Gateway (UPI, Razorpay, Stripe)', inr: 35000, usd: 500, weeks: 0.5 },
    { name: 'Real-time Chat & Push Notifications', inr: 70000, usd: 1100, weeks: 1.5 },
    { name: 'Third-Party API & Webhook Integrations', inr: 50000, usd: 800, weeks: 1 },
    { name: 'Role-Based Authentication & Security Audit', inr: 55000, usd: 850, weeks: 1 },
    { name: 'SEO Architecture & Core Web Vitals Optimization', inr: 30000, usd: 450, weeks: 0.5 },
  ];

  const currentType = projectTypes.find((p) => p.label === projectType) || projectTypes[0];

  const selectedFeaturesInr = availableFeatures
    .filter((f) => features.includes(f.name))
    .reduce((sum, f) => sum + f.inr, 0);

  const selectedFeaturesUsd = availableFeatures
    .filter((f) => features.includes(f.name))
    .reduce((sum, f) => sum + f.usd, 0);

  const selectedWeeksTotal = availableFeatures
    .filter((f) => features.includes(f.name))
    .reduce((sum, f) => sum + f.weeks, 0);

  const rawCostInr = currentType.baseInr + selectedFeaturesInr;
  const rawCostUsd = currentType.baseUsd + selectedFeaturesUsd;
  const rawWeeks = Math.ceil((currentType.baseWeeks + selectedWeeksTotal) * (timelineSpeed === 'express' ? 0.75 : 1));

  const finalCostInr = timelineSpeed === 'express' ? Math.round(rawCostInr * 1.2) : rawCostInr;
  const finalCostUsd = timelineSpeed === 'express' ? Math.round(rawCostUsd * 1.2) : rawCostUsd;

  // Format budget range
  const lowerInr = Math.floor((finalCostInr * 0.9) / 10000) * 10000;
  const upperInr = Math.ceil((finalCostInr * 1.15) / 10000) * 10000;
  const inrRangeStr = `₹${(lowerInr / 100000).toFixed(1)}L - ₹${(upperInr / 100000).toFixed(1)}L`;

  const lowerUsd = Math.floor((finalCostUsd * 0.9) / 500) * 500;
  const upperUsd = Math.ceil((finalCostUsd * 1.15) / 500) * 500;
  const usdRangeStr = `$${lowerUsd.toLocaleString()} - $${upperUsd.toLocaleString()}`;

  const budgetDisplay = currency === 'INR' ? inrRangeStr : usdRangeStr;

  const toggleFeature = (name: string) => {
    if (features.includes(name)) {
      setFeatures(features.filter((f) => f !== name));
    } else {
      setFeatures([...features, name]);
    }
  };

  const handleApply = () => {
    const summary = `${projectType} with [${features.join(', ')}]. Speed: ${
      timelineSpeed === 'express' ? 'Express Priority' : 'Standard Agile'
    }.`;

    onSubmitEstimate({
      service: projectType,
      budget: `${inrRangeStr} (${usdRangeStr})`,
      timeline: `~${rawWeeks} Weeks`,
      features,
      summary,
    });
    onClose();
  };

  return (
    <div
      id="estimator-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="estimator-modal-content"
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh] text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          id="close-estimator-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6 pr-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Scope & Cost Estimator
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Configure your requirements to receive a realistic timeline and budget range.
              </p>
            </div>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                currency === 'INR' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                currency === 'USD' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Step 1: Project Type */}
        <div className="mb-6">
          <label className="block text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-3">
            1. Select Primary Service
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {projectTypes.map((type) => (
              <button
                key={type.label}
                type="button"
                onClick={() => setProjectType(type.label)}
                className={`p-3 rounded-xl text-left text-xs font-bold tracking-tight border transition-all flex items-center justify-between cursor-pointer ${
                  projectType === type.label
                    ? 'bg-orange-50/80 border-orange-500 text-orange-900 ring-1 ring-orange-500'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{type.label}</span>
                {projectType === type.label && <Check className="w-4 h-4 text-orange-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Features Included */}
        <div className="mb-6">
          <label className="block text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-3">
            2. Desired Capabilities & Features
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableFeatures.map((feat) => {
              const isChecked = features.includes(feat.name);
              return (
                <button
                  key={feat.name}
                  type="button"
                  onClick={() => toggleFeature(feat.name)}
                  className={`p-2.5 rounded-xl text-left text-xs border transition-all flex items-center justify-between cursor-pointer ${
                    isChecked
                      ? 'bg-orange-50/80 border-orange-400 text-orange-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate pr-2">{feat.name}</span>
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-orange-600 text-white' : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Speed Delivery */}
        <div className="mb-6">
          <label className="block text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-3">
            3. Delivery Priority
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTimelineSpeed('standard')}
              className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                timelineSpeed === 'standard'
                  ? 'bg-blue-50 border-blue-500 text-blue-900 ring-1 ring-blue-500'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="font-bold text-slate-900">Standard Agile Velocity</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Optimal pace & full QA cycles</div>
            </button>
            <button
              type="button"
              onClick={() => setTimelineSpeed('express')}
              className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                timelineSpeed === 'express'
                  ? 'bg-orange-50 border-orange-500 text-orange-900 ring-1 ring-orange-500'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="font-bold text-orange-700">Express Priority Sprint</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Dedicated engineering squad (+20%)</div>
            </button>
          </div>
        </div>

        {/* Estimate Output Box */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Estimated Budget Range ({currency})</div>
              <div className="text-xl font-black text-slate-900">{budgetDisplay}</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Estimated Delivery</div>
              <div className="text-xl font-black text-blue-700">~{rawWeeks} Weeks</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            id="apply-estimate-to-contact"
            onClick={handleApply}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 transition-all cursor-pointer"
          >
            <span>Apply To Project Consultation Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
