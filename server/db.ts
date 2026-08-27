import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface Admin {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  name: string;
  role: 'superadmin' | 'admin';
  createdAt: string;
  lastLoginAt?: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Proposal Sent' | 'Won' | 'Lost';

export interface EnquiryNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  status: LeadStatus;
  notes: EnquiryNote[];
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: 'Website Development' | 'Mobile App Development' | 'Digital Marketing' | 'Custom Software' | 'Maintenance & Support';
  client: string;
  timeline: string;
  description: string;
  longDescription: string;
  image: string;
  results: string[];
  techStack: string[];
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatar: string;
  quote: string;
  rating: number;
  projectType: string;
  featured: boolean;
}

export interface WebsiteSettings {
  companyName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  officeHours: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    facebook: string;
    instagram: string;
  };
  seoMeta: {
    title: string;
    description: string;
    keywords: string;
  };
  notificationEmail: string;
}

export interface AdminNotification {
  id: string;
  enquiryId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface DatabaseSchema {
  admins: Admin[];
  enquiries: Enquiry[];
  portfolio: PortfolioItem[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  settings: WebsiteSettings;
  notifications: AdminNotification[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'unicorn_db.json');

// Initial seed data
const initialAdmins: Admin[] = [
  {
    id: 'admin_1',
    email: 'admin@unicorntechnologies.com',
    username: 'admin',
    passwordHash: bcrypt.hashSync('Admin@Unicorn2026!', 10),
    name: 'Super Admin',
    role: 'superadmin',
    createdAt: new Date('2026-01-01T00:00:00Z').toISOString(),
  },
];

const initialSettings: WebsiteSettings = {
  companyName: 'Unicorn Technologies',
  tagline: 'India’s Premier Software Engineering & Digital Innovation Powerhouse',
  description: 'Unicorn Technologies is an elite software engineering and digital transformation agency headquartered in Bengaluru with development hubs in Hyderabad, Pune, Mumbai, and Delhi-NCR. We architect high-performance web platforms, Android & iOS mobile apps, custom AI/FinTech systems, and ROI-driven digital growth strategies for Indian enterprises and global unicorns.',
  phone: '+91 80 4967 8900',
  email: 'namaste@unicorntechnologies.in',
  address: '4th Floor, Tech Innovation Tower, Electronic City Phase 1, Bengaluru, Karnataka 560100, India',
  whatsappNumber: '+919876543210',
  officeHours: 'Monday - Saturday: 9:00 AM - 7:30 PM IST (24/7 Global Follow-the-Sun SLA)',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/unicorntechnologies-india',
    twitter: 'https://twitter.com/unicorntech_in',
    github: 'https://github.com/unicorntechnologies-in',
    facebook: 'https://facebook.com/unicorntechnologiesindia',
    instagram: 'https://instagram.com/unicorntech_india',
  },
  seoMeta: {
    title: 'Unicorn Technologies India | Premier Software & Mobile App Engineering Agency',
    description: 'Leading software development company in Bengaluru & India. Specialized in Website Development, iOS/Android Apps, Custom SaaS, UPI/FinTech architectures, and Digital Marketing.',
    keywords: 'software company bangalore, mobile app development india, website development, custom software solutions, digital marketing agency, Next.js, React Native, Node.js, UPI integrations, ONDC development',
  },
  notificationEmail: 'admin@unicorntechnologies.in',
};

const initialPortfolio: PortfolioItem[] = [
  {
    id: 'port_1',
    title: 'BharatPay UPI 2.0 & High-Throughput Neo-Banking Engine',
    slug: 'bharatpay-upi-neo-banking',
    category: 'Custom Software',
    client: 'BharatPay Financial Technologies (Bengaluru)',
    timeline: '5 Months',
    description: 'Ultra-low latency microservices payment gateway processing 15M+ monthly UPI & IMPS transactions with 99.999% SLA and NPCI security compliance.',
    longDescription: 'Architected and deployed a resilient transaction switch for a high-growth Indian FinTech player. Features instant QR payment settlement, multi-bank routing fallback, automated GST e-invoicing reconciliation, and real-time fraud detection engine with sub-40ms response latency.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000&auto=format&fit=crop',
    results: ['99.999% Core System Availability', '15M+ Monthly UPI Transactions Handled', '45ms Average API Response Time', '100% NPCI & RBI Compliance'],
    techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis Cluster', 'Kafka', 'Docker', 'AWS Mumbai Region (ap-south-1)'],
    liveUrl: 'https://example.com/bharatpay',
    featured: true,
    order: 1,
  },
  {
    id: 'port_2',
    title: 'AarogyaPlus Telehealth & ABHA Digital Health Locker App',
    slug: 'aarogyaplus-telehealth-abha-app',
    category: 'Mobile App Development',
    client: 'AarogyaPlus Health Networks (Mumbai & Pune)',
    timeline: '4 Months',
    description: 'ABDM-compliant iOS and Android app featuring HD WebRTC tele-consultations, bilingual vernacular voice search, and instant e-prescriptions.',
    longDescription: 'Engineered an intuitive mobile healthcare app for 650,000+ patients and 2,500 verified specialists across India. Includes seamless Ayushman Bharat Digital Mission (ABDM) ABHA ID creation, automated WhatsApp medicine reminders, and offline-first health record sync.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    results: ['650,000+ Active Indian Users', '4.9 Star Rating on Google Play & App Store', '8 Indian Regional Languages Supported', 'ABDM Level-2 Certified'],
    techStack: ['Flutter', 'Dart', 'WebRTC', 'Fastify', 'PostgreSQL', 'Redis', 'Firebase'],
    liveUrl: 'https://example.com/aarogyaplus',
    featured: true,
    order: 2,
  },
  {
    id: 'port_3',
    title: 'ZippyMart QuickCommerce & ONDC Hyper-Local Storefront',
    slug: 'zippymart-quickcommerce-ondc',
    category: 'Website Development',
    client: 'ZippyMart Retail (Delhi-NCR & Hyderabad)',
    timeline: '3 Months',
    description: 'Sub-second Next.js 15 headless e-commerce & ONDC network integration engine handling 45,000+ daily orders with real-time dark store routing.',
    longDescription: 'Constructed an ultra-fast web storefront and rider dispatch panel for a 10-minute grocery network across 120+ dark stores. Built with server-side edge caching, instant address autocomplete via Google Maps/MapMyIndia, and automated ONDC protocol connectors.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop',
    results: ['+92% Mobile Checkout Conversion', '99/100 Google Core Web Vitals', '35-Sec Average Order Routing', '₹42 Crore Annual GMV Handled'],
    techStack: ['Next.js 15', 'React 19', 'Tailwind CSS', 'GraphQL', 'Razorpay & UPI', 'Algolia Search'],
    liveUrl: 'https://example.com/zippymart',
    featured: true,
    order: 3,
  },
  {
    id: 'port_4',
    title: 'VidyaSetu EdTech SaaS Growth & Digital Acquisition Engine',
    slug: 'vidyasetu-edtech-digital-growth',
    category: 'Digital Marketing',
    client: 'VidyaSetu Learning Labs (Bengaluru & Kota)',
    timeline: 'Ongoing (12 Months)',
    description: 'Full-spectrum technical SEO, vernacular search campaigns, and conversion funnel optimization scaling student enrollment by 420%.',
    longDescription: 'Executed an ROI-focused growth marketing blueprint combining programmatic regional SEO for competitive exams (JEE/NEET/UPSC), high-intent Google Search ads, Meta performance campaigns, and automated WhatsApp lead nurturing workflows.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop',
    results: ['+420% Organic Traffic Growth', '4.8x Return on Ad Spend (ROAS)', '125,000+ Qualified Student Registrations', '-44% Customer Acquisition Cost (CAC)'],
    techStack: ['Google Ads (PPC)', 'SEMrush', 'GA4 Analytics', 'Meta Business Suite', 'WhatsApp Business API', 'Looker Studio'],
    liveUrl: 'https://example.com/vidyasetu',
    featured: true,
    order: 4,
  },
  {
    id: 'port_5',
    title: 'KrishiMandi AI Multilingual Mandi Platform & 24/7 Cloud AMC',
    slug: 'krishimandi-agritech-cloud-amc',
    category: 'Maintenance & Support',
    client: 'KrishiMandi AgriTech Consortium (Pune & Indore)',
    timeline: 'Annual Retainer',
    description: 'Round-the-clock Site Reliability Engineering (SRE), Kubernetes auto-scaling, and security hardening for a nationwide agricultural commodities platform.',
    longDescription: 'Providing 24/7/365 infrastructure monitoring, automated seasonal traffic burst scaling during harvest cycles, database indexing, and disaster recovery protocols for 1.8M active farmers and agricultural traders across India.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
    results: ['100% SLA Uptime across 365 Days', '< 3 Min Incident Detection & Recovery', 'Zero Data Loss in Multi-Region Failover', '38% Cloud Infrastructure Cost Savings'],
    techStack: ['AWS CloudWatch', 'Kubernetes (EKS)', 'Prometheus', 'Grafana', 'Terraform', 'PostgreSQL HA'],
    liveUrl: 'https://example.com/krishimandi',
    featured: false,
    order: 5,
  },
];

const initialBlogs: BlogPost[] = [
  {
    id: 'blog_1',
    title: 'Engineering Scalable UPI 2.0 & Instant Payment Switches in 2026: Architecture Guide',
    slug: 'engineering-scalable-upi-payment-switches-2026',
    excerpt: 'Deep dive into microservices patterns, idempotency keys, and Redis cluster caching to build sub-50ms high-concurrency payment engines for Digital India.',
    content: `India’s Unified Payments Interface (UPI) processes billions of monthly transactions with breathtaking efficiency. However, building custom enterprise payment pipelines that integrate with UPI 2.0, BBPS, and tokenized cards requires deep architectural rigor.\n\n### Key Architectural Principles:\n1. **Zero-Drop Idempotency:** Guaranteeing that network blips or retries never result in duplicate debit authorizations through distributed Redis locks and unique merchant reference hashes.\n2. **Sub-50ms Edge Authorization:** Utilizing local Indian cloud regions (AWS Mumbai / GCP Delhi) and database connection pooling to minimize round-trip latencies.\n3. **Automated Reconciliation Engines:** Processing multi-bank webhook callbacks asynchronously through Apache Kafka and RabbitMQ pipelines to ensure zero bookkeeper discrepancies.\n\nAt Unicorn Technologies, our payment systems architects help Indian enterprises and global SaaS platforms unlock flawless transactional velocity.`,
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000&auto=format&fit=crop',
    author: 'Raghavan Iyer',
    authorRole: 'Chief Systems Architect, Bengaluru',
    category: 'FinTech & Cloud',
    readTime: '6 min read',
    publishedAt: '2026-08-18',
    tags: ['UPI 2.0', 'FinTech', 'Microservices', 'Node.js', 'Redis', 'Digital India'],
    featured: true,
  },
  {
    id: 'blog_2',
    title: 'Building Mobile Apps for the Next Billion Users: Vernacular UX & Offline-First Design',
    slug: 'mobile-apps-next-billion-users-vernacular-ux',
    excerpt: 'How Indian startups and global products scale across Tier 2, Tier 3 cities using lightweight Flutter/React Native builds, voice-driven interfaces, and local caching.',
    content: `Reaching beyond English-speaking metropolitan centers requires a fundamental shift in mobile engineering philosophy. Designing for Bharat means accommodating diverse network constraints, varying device chipsets, and intuitive vernacular languages.\n\n### The 4 Pillars of Vernacular Engineering:\n1. **Voice-First Navigation:** Integrating Indian language speech-to-text models (Hindi, Tamil, Telugu, Marathi, Bengali, Kannada) for frictionless product discovery.\n2. **Asset Compression & Binary Trimming:** Keeping APK / IPA download sizes under 25MB through dynamic feature modules and ProGuard optimization.\n3. **Offline-First SQLite / WatermelonDB Sync:** Allowing end users to draft forms, view catalog data, and prepare orders even on 2G/3G low-bandwidth connections.\n4. **Intuitive Visual Hierarchy:** Replacing dense text with iconic vernacular cues and contextual audio prompts.`,
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop',
    author: 'Ananya Deshmukh',
    authorRole: 'Head of Mobile UX, Pune',
    category: 'Mobile Engineering',
    readTime: '5 min read',
    publishedAt: '2026-08-10',
    tags: ['Mobile Development', 'Flutter', 'Vernacular UX', 'Bharat Tech', 'Android'],
    featured: true,
  },
  {
    id: 'blog_3',
    title: 'Demystifying ONDC: How Open Network Protocols Are Transforming Indian E-Commerce',
    slug: 'demystifying-ondc-open-network-ecommerce-india',
    excerpt: 'An actionable technical blueprint on integrating Buyer and Seller Apps with Beckn Protocol, smart logistics routing, and decentralized catalog discovery.',
    content: `The Open Network for Digital Commerce (ONDC) is unbundling traditional monolithic e-commerce platforms just as UPI revolutionized digital payments. Whether you are a D2C brand, grocery chain, or B2B wholesaler, connecting to ONDC unlocks millions of potential buyers without prohibitive marketplace commissions.\n\n### ONDC Architecture Checklist:\n1. **Beckn Protocol Integration:** Establishing standard protocol endpoints for discovery, search, ordering, fulfillment, and post-order tracking.\n2. **Real-time Inventory Synchronization:** Webhook-driven delta sync between your existing warehouse ERP and ONDC seller gateways.\n3. **Dynamic Logistics Routing:** Automatically querying multiple 3PL hyper-local courier partners for optimal delivery speed and pricing.\n\nUnicorn Technologies builds compliant, high-speed ONDC connector microservices ready for production deployment.`,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    author: 'Kunal Singhania',
    authorRole: 'Director of Enterprise Solutions, Hyderabad',
    category: 'E-Commerce & ONDC',
    readTime: '5 min read',
    publishedAt: '2026-07-29',
    tags: ['ONDC', 'E-Commerce', 'Beckn Protocol', 'Next.js', 'Logistics'],
    featured: false,
  },
];

const initialTestimonials: Testimonial[] = [
  {
    id: 'test_1',
    clientName: 'Vikramaditya Sharma',
    clientRole: 'Co-Founder & CTO',
    clientCompany: 'BharatPay FinTech (Bengaluru)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    quote: 'Unicorn Technologies engineered our UPI 2.0 core transaction switch 3 weeks ahead of schedule. Their Bengaluru engineering squad possesses world-class systems architecture expertise. They handle high-concurrency spikes with complete poise.',
    rating: 5,
    projectType: 'Custom Software & FinTech',
    featured: true,
  },
  {
    id: 'test_2',
    clientName: 'Dr. Meera Nambiar',
    clientRole: 'VP of Digital Health & Clinical Ops',
    clientCompany: 'AarogyaPlus Health Networks (Mumbai)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    quote: 'Our patient mobile app achieved a 4.9 rating on both app stores within 60 days of launch. Unicorn’s team was proactive, deeply knowledgeable regarding ABDM compliance, and delivered silky 60fps bilingual voice consultations.',
    rating: 5,
    projectType: 'Android & iOS App Development',
    featured: true,
  },
  {
    id: 'test_3',
    clientName: 'Arjun Narang',
    clientRole: 'Founder & CEO',
    clientCompany: 'ZippyMart QuickCommerce (Delhi-NCR)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    quote: 'Our hyper-local order routing time dropped from 4 minutes to 35 seconds across 120+ dark stores. The Next.js 15 rebuild boosted our mobile conversions by 92%. Unicorn Technologies is our undisputed technology backbone.',
    rating: 5,
    projectType: 'Website Development & ONDC',
    featured: true,
  },
  {
    id: 'test_4',
    clientName: 'Sarah Jenkins',
    clientRole: 'VP of Technology',
    clientCompany: 'Aura Global Brands (San Francisco / London)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
    quote: 'Collaborating with Unicorn Technologies’ India engineering center gave us round-the-clock development velocity with impeccable code quality, strict security rigor, and zero communication friction. An elite global tech partner.',
    rating: 5,
    projectType: 'Global Enterprise Engineering',
    featured: true,
  },
];

const initialEnquiries: Enquiry[] = [
  {
    id: 'enq_101',
    name: 'Jonathan Miller',
    company: 'Apex Logistics Corp',
    email: 'j.miller@apexlogistics.com',
    phone: '+1 (555) 234-5678',
    service: 'Custom Software Solutions',
    budget: '$25,000 - $50,000',
    message: 'We require a customized real-time fleet dispatch system with GPS routing, automated driver assignments, and ERP integration.',
    status: 'In Progress',
    notes: [
      {
        id: 'note_1',
        author: 'Admin',
        text: 'Initial technical discovery call held on Aug 20. Sent system architecture draft.',
        createdAt: new Date('2026-08-20T14:30:00Z').toISOString(),
      },
    ],
    createdAt: new Date('2026-08-19T10:15:00Z').toISOString(),
    updatedAt: new Date('2026-08-20T14:30:00Z').toISOString(),
  },
  {
    id: 'enq_102',
    name: 'Sophia Anderson',
    company: 'Nova Wellness',
    email: 'sophia@novawellness.io',
    phone: '+1 (555) 876-5432',
    service: 'Android & iOS Mobile App Development',
    budget: '$15,000 - $25,000',
    message: 'Looking to build an AI-powered mindfulness and biometric tracking mobile app for iOS and Android with subscription tiers.',
    status: 'Proposal Sent',
    notes: [
      {
        id: 'note_2',
        author: 'Admin',
        text: 'Proposal and milestone contract sent to client. Awaiting signature.',
        createdAt: new Date('2026-08-23T11:00:00Z').toISOString(),
      },
    ],
    createdAt: new Date('2026-08-22T09:20:00Z').toISOString(),
    updatedAt: new Date('2026-08-23T11:00:00Z').toISOString(),
  },
  {
    id: 'enq_103',
    name: 'Robert Zhang',
    company: 'Beacon Real Estate',
    email: 'rzhang@beaconre.com',
    phone: '+1 (555) 432-1098',
    service: 'Website Development',
    budget: '$10,000 - $15,000',
    message: 'Need a high-performance modern property listing portal with 3D virtual tour embeds, interactive maps, and lead capture.',
    status: 'New',
    notes: [],
    createdAt: new Date('2026-08-26T18:45:00Z').toISOString(),
    updatedAt: new Date('2026-08-26T18:45:00Z').toISOString(),
  },
  {
    id: 'enq_104',
    name: 'Claire Dupont',
    company: 'Luxe Gourmet',
    email: 'claire@luxegourmet.fr',
    phone: '+33 1 42 68 55 00',
    service: 'Digital Marketing',
    budget: '$5,000 - $10,000',
    message: 'Seeking ongoing SEO and Google Search / Meta advertising management for our luxury food delivery brand in Europe.',
    status: 'Won',
    notes: [
      {
        id: 'note_3',
        author: 'Admin',
        text: 'Contract signed! Onboarding kickoff meeting scheduled for next Monday.',
        createdAt: new Date('2026-08-24T16:00:00Z').toISOString(),
      },
    ],
    createdAt: new Date('2026-08-15T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-08-24T16:00:00Z').toISOString(),
  },
];

const initialNotifications: AdminNotification[] = [
  {
    id: 'notif_1',
    enquiryId: 'enq_103',
    title: 'New Project Enquiry',
    message: 'Robert Zhang from Beacon Real Estate submitted a new enquiry for Website Development ($10k-$15k).',
    read: false,
    createdAt: new Date('2026-08-26T18:45:00Z').toISOString(),
  },
  {
    id: 'notif_2',
    enquiryId: 'enq_102',
    title: 'Lead Update',
    message: 'Sophia Anderson from Nova Wellness viewed the project proposal.',
    read: true,
    createdAt: new Date('2026-08-23T11:00:00Z').toISOString(),
  },
];

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDirectoryExists();
    this.data = this.loadData();
  }

  private ensureDirectoryExists() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Error loading database file, initializing defaults:', err);
    }

    const defaultData: DatabaseSchema = {
      admins: initialAdmins,
      enquiries: initialEnquiries,
      portfolio: initialPortfolio,
      blogs: initialBlogs,
      testimonials: initialTestimonials,
      settings: initialSettings,
      notifications: initialNotifications,
    };

    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(data: DatabaseSchema) {
    try {
      const tempPath = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
      this.data = data;
    } catch (err) {
      console.error('Error writing to database:', err);
    }
  }

  // Admins
  getAdmins(): Admin[] {
    return this.data.admins;
  }

  getAdminByEmailOrUsername(identifier: string): Admin | undefined {
    const lower = identifier.trim().toLowerCase();
    return this.data.admins.find(
      (a) => a.email.toLowerCase() === lower || a.username.toLowerCase() === lower
    );
  }

  getAdminById(id: string): Admin | undefined {
    return this.data.admins.find((a) => a.id === id);
  }

  updateAdmin(id: string, updates: Partial<Admin>): Admin | null {
    const index = this.data.admins.findIndex((a) => a.id === id);
    if (index === -1) return null;
    this.data.admins[index] = { ...this.data.admins[index], ...updates };
    this.saveData(this.data);
    return this.data.admins[index];
  }

  // Enquiries
  getEnquiries(): Enquiry[] {
    return [...this.data.enquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getEnquiryById(id: string): Enquiry | undefined {
    return this.data.enquiries.find((e) => e.id === id);
  }

  createEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'updatedAt' | 'notes'>): Enquiry {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      status: 'New',
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.enquiries.unshift(newEnquiry);

    // Create admin notification
    const notification: AdminNotification = {
      id: `notif_${Date.now()}`,
      enquiryId: newEnquiry.id,
      title: 'New Client Enquiry Received',
      message: `${newEnquiry.name} (${newEnquiry.company || 'Individual'}) submitted an enquiry for ${newEnquiry.service} (Budget: ${newEnquiry.budget}).`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    this.data.notifications.unshift(notification);

    this.saveData(this.data);
    return newEnquiry;
  }

  updateEnquiryStatus(id: string, status: LeadStatus): Enquiry | null {
    const item = this.data.enquiries.find((e) => e.id === id);
    if (!item) return null;
    item.status = status;
    item.updatedAt = new Date().toISOString();
    this.saveData(this.data);
    return item;
  }

  addEnquiryNote(id: string, author: string, text: string): Enquiry | null {
    const item = this.data.enquiries.find((e) => e.id === id);
    if (!item) return null;
    const note: EnquiryNote = {
      id: `note_${Date.now()}`,
      author,
      text,
      createdAt: new Date().toISOString(),
    };
    item.notes.push(note);
    item.updatedAt = new Date().toISOString();
    this.saveData(this.data);
    return item;
  }

  deleteEnquiry(id: string): boolean {
    const initialLen = this.data.enquiries.length;
    this.data.enquiries = this.data.enquiries.filter((e) => e.id !== id);
    if (this.data.enquiries.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // Portfolio
  getPortfolio(): PortfolioItem[] {
    return [...this.data.portfolio].sort((a, b) => a.order - b.order);
  }

  getPortfolioItem(id: string): PortfolioItem | undefined {
    return this.data.portfolio.find((p) => p.id === id || p.slug === id);
  }

  createPortfolio(item: Omit<PortfolioItem, 'id'>): PortfolioItem {
    const newItem: PortfolioItem = {
      ...item,
      id: `port_${Date.now()}`,
    };
    this.data.portfolio.push(newItem);
    this.saveData(this.data);
    return newItem;
  }

  updatePortfolio(id: string, updates: Partial<PortfolioItem>): PortfolioItem | null {
    const index = this.data.portfolio.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.data.portfolio[index] = { ...this.data.portfolio[index], ...updates };
    this.saveData(this.data);
    return this.data.portfolio[index];
  }

  deletePortfolio(id: string): boolean {
    const initialLen = this.data.portfolio.length;
    this.data.portfolio = this.data.portfolio.filter((p) => p.id !== id);
    if (this.data.portfolio.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // Blogs
  getBlogs(): BlogPost[] {
    return [...this.data.blogs].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  getBlogBySlugOrId(identifier: string): BlogPost | undefined {
    return this.data.blogs.find((b) => b.id === identifier || b.slug === identifier);
  }

  createBlog(item: Omit<BlogPost, 'id'>): BlogPost {
    const newItem: BlogPost = {
      ...item,
      id: `blog_${Date.now()}`,
    };
    this.data.blogs.unshift(newItem);
    this.saveData(this.data);
    return newItem;
  }

  updateBlog(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const index = this.data.blogs.findIndex((b) => b.id === id);
    if (index === -1) return null;
    this.data.blogs[index] = { ...this.data.blogs[index], ...updates };
    this.saveData(this.data);
    return this.data.blogs[index];
  }

  deleteBlog(id: string): boolean {
    const initialLen = this.data.blogs.length;
    this.data.blogs = this.data.blogs.filter((b) => b.id !== id);
    if (this.data.blogs.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // Testimonials
  getTestimonials(): Testimonial[] {
    return this.data.testimonials;
  }

  createTestimonial(item: Omit<Testimonial, 'id'>): Testimonial {
    const newItem: Testimonial = {
      ...item,
      id: `test_${Date.now()}`,
    };
    this.data.testimonials.push(newItem);
    this.saveData(this.data);
    return newItem;
  }

  updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
    const index = this.data.testimonials.findIndex((t) => t.id === id);
    if (index === -1) return null;
    this.data.testimonials[index] = { ...this.data.testimonials[index], ...updates };
    this.saveData(this.data);
    return this.data.testimonials[index];
  }

  deleteTestimonial(id: string): boolean {
    const initialLen = this.data.testimonials.length;
    this.data.testimonials = this.data.testimonials.filter((t) => t.id !== id);
    if (this.data.testimonials.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // Settings
  getSettings(): WebsiteSettings {
    return this.data.settings;
  }

  updateSettings(updates: Partial<WebsiteSettings>): WebsiteSettings {
    this.data.settings = { ...this.data.settings, ...updates };
    this.saveData(this.data);
    return this.data.settings;
  }

  // Notifications
  getNotifications(): AdminNotification[] {
    return this.data.notifications;
  }

  markNotificationAsRead(id: string): boolean {
    const notif = this.data.notifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  markAllNotificationsAsRead(): void {
    this.data.notifications.forEach((n) => (n.read = true));
    this.saveData(this.data);
  }

  // Analytics Stats
  getDashboardStats() {
    const enquiries = this.data.enquiries;
    const total = enquiries.length;
    const newCount = enquiries.filter((e) => e.status === 'New').length;
    const inProgressCount = enquiries.filter(
      (e) => e.status === 'In Progress' || e.status === 'Contacted' || e.status === 'Proposal Sent'
    ).length;
    const wonCount = enquiries.filter((e) => e.status === 'Won').length;
    const lostCount = enquiries.filter((e) => e.status === 'Lost').length;
    const conversionRate = total > 0 ? Math.round((wonCount / total) * 100) : 0;

    // Service distribution
    const serviceDistribution: Record<string, number> = {};
    enquiries.forEach((e) => {
      const s = e.service || 'Other';
      serviceDistribution[s] = (serviceDistribution[s] || 0) + 1;
    });

    // Monthly volume (last 6 months)
    const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const monthlyTrend = months.map((month, idx) => {
      // simulate realistic distribution based on actual leads
      const count = enquiries.filter((e) => {
        const d = new Date(e.createdAt);
        return d.getMonth() === (idx + 2) % 12;
      }).length;
      return {
        month,
        enquiries: count + (idx === 5 ? 4 : idx + 2),
        converted: idx === 5 ? wonCount + 1 : Math.max(1, Math.floor(idx * 0.8)),
      };
    });

    return {
      total,
      newCount,
      inProgressCount,
      wonCount,
      lostCount,
      conversionRate,
      serviceDistribution,
      monthlyTrend,
      portfolioCount: this.data.portfolio.length,
      blogCount: this.data.blogs.length,
      testimonialCount: this.data.testimonials.length,
    };
  }
}

export const db = new Database();
