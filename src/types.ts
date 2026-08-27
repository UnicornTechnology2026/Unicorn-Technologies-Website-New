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

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'superadmin' | 'admin';
  lastLoginAt?: string;
}

export interface DashboardStats {
  total: number;
  newCount: number;
  inProgressCount: number;
  wonCount: number;
  lostCount: number;
  conversionRate: number;
  serviceDistribution: Record<string, number>;
  monthlyTrend: Array<{
    month: string;
    enquiries: number;
    converted: number;
  }>;
  portfolioCount: number;
  blogCount: number;
  testimonialCount: number;
}
