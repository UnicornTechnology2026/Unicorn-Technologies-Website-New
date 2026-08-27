import {
  Code2,
  Smartphone,
  Megaphone,
  ShieldCheck,
  Layers,
  type LucideIcon,
} from 'lucide-react';

import webAppImg from '../assest/web-app.jpg';
import appDevImg from '../assest/app-dev.jpg';
import digitalImg from '../assest/digital1.png';
import supportImg from '../assest/support.jpg';
import customImg from '../assest/custom.jpg';
 
export const SERVICES = [
  {
    slug: 'website-development',
    title: 'Website Development',
    icon: Code2,
    short: 'High-performance websites built with modern frameworks.',
    image:webAppImg,
    description:
      'We craft lightning-fast, SEO-optimized websites using Next.js, React, and modern web technologies. From corporate sites to complex web applications, we deliver experiences that convert visitors into customers.',
    features: [
      'Responsive & mobile-first design',
      'SEO optimization & Core Web Vitals',
      'Headless CMS integration',
      'E-commerce capabilities',
      'Performance optimization',
      'Accessibility compliance',
    ],
   
  },
  {
    slug: 'mobile-app-development',
    title: 'Android & iOS Mobile App Development',
    icon: Smartphone,
    short: 'Native and cross-platform mobile apps for iOS and Android.',
    image:appDevImg,
    description:
      'We build native and cross-platform mobile applications that deliver exceptional user experiences. From concept to App Store launch, we handle the entire mobile development lifecycle.',
    features: [
      'Native iOS & Android development',
      'Cross-platform (React Native) solutions',
      'App Store & Play Store deployment',
      'Push notifications & real-time features',
      'Offline-first architecture',
      'App analytics & monitoring',
    ],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    icon: Megaphone,
    short: 'Data-driven marketing that grows your audience and revenue.',
    image:digitalImg,
    description:
      'We drive growth through strategic digital marketing. From SEO and content marketing to paid advertising and social media, we help you reach the right audience and convert them into loyal customers.',
    features: [
      'Search Engine Optimization (SEO)',
      'Pay-Per-Click advertising (PPC)',
      'Social media marketing',
      'Content marketing strategy',
      'Email marketing automation',
      'Analytics & conversion optimization',
    ],
  },
  {
    slug: 'maintenance-support',
    title: 'Annual Maintenance & Support',
    icon: ShieldCheck,
    short: 'Ongoing maintenance, security updates, and technical support.',
    image:supportImg,
    description:
      'We provide comprehensive maintenance and support plans to keep your digital products running smoothly. From security patches to feature updates, we ensure your investment stays protected.',
    features: [
      '24/7 monitoring & uptime guarantees',
      'Security patches & updates',
      'Bug fixes & performance tuning',
      'Content updates & backups',
      'Technical support tickets',
      'Monthly performance reports',
    ],
  },
  {
    slug: 'custom-software',
    title: 'Custom Software Solutions',
    icon: Layers,
    short: 'Tailored software built to solve your unique business challenges.',
    image: customImg,
    description:
      'We design and build custom software solutions tailored to your specific business needs. From internal tools to SaaS platforms, we engineer scalable, secure, and maintainable systems.',
    features: [
      'Custom CRM & ERP systems',
      'API development & integration',
      'Cloud infrastructure & DevOps',
      'Database design & optimization',
      'Legacy system modernization',
      'Scalable microservices architecture',
    ],
  },
] as const;

export type ServiceItem = (typeof SERVICES)[number] & { icon: LucideIcon };

export const LEAD_STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  in_progress: 'In Progress',
  proposal_sent: 'Proposal Sent',
  won: 'Won',
  lost: 'Lost',
};

export const LEAD_STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  contacted: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  in_progress: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  proposal_sent: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  won: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  lost: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export const BUDGET_OPTIONS = [
  'Under ₹ 5,000',
  '₹5,000 - ₹15,000',
  '₹15,000 - ₹50,000',
  '₹50,000 - ₹100,000',
  '₹100,000+',
  'Not sure yet',
];

export const SERVICE_OPTIONS = [
  'Website Development',
  'Mobile App Development',
  'Digital Marketing',
  'Maintenance & Support',
  'Custom Software Solutions',
  'Other',
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description:
      'We start by understanding your business, goals, and target audience. Through in-depth consultation, we define project scope, timeline, and success metrics.',
  },
  {
    step: '02',
    title: 'Design & Prototyping',
    description:
      'Our design team creates wireframes and interactive prototypes. We iterate based on your feedback until every pixel aligns with your vision and brand identity.',
  },
  {
    step: '03',
    title: 'Development & Testing',
    description:
      'We build your solution using modern, scalable technologies. Rigorous testing ensures your product is fast, secure, and bug-free across all devices and platforms.',
  },
  {
    step: '04',
    title: 'Launch & Support',
    description:
      'We deploy your product to production and provide ongoing support. We monitor performance, gather user feedback, and continuously optimize for growth.',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Expert Team',
    description:
      'Our seasoned developers, designers, and strategists bring years of experience across diverse industries and technologies.',
  },
  {
    title: 'Client-Centric Approach',
    description:
      'We put your business goals first. Every decision we make is driven by what will deliver the most value to your organization.',
  },
  {
    title: 'On-Time Delivery',
    description:
      'We respect deadlines. Our agile methodology ensures transparent progress tracking and predictable delivery timelines.',
  },
  {
    title: 'Scalable Solutions',
    description:
      'We build with growth in mind. Our architectures scale seamlessly from your first user to your millionth.',
  },
  {
    title: 'Transparent Communication',
    description:
      'You always know where your project stands. Regular updates, clear reporting, and direct access to your team.',
  },
  {
    title: 'Post-Launch Support',
    description:
      'Our relationship does not end at launch. We provide ongoing maintenance, updates, and strategic guidance.',
  },
];
