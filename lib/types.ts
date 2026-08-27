export type EnquiryStatus =
  | 'new'
  | 'contacted'
  | 'in_progress'
  | 'proposal_sent'
  | 'won'
  | 'lost';

export interface Enquiry {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  service: string;
  budget: string | null;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface EnquiryNote {
  id: string;
  enquiry_id: string;
  admin_id: string | null;
  body: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string | null;
  company: string | null;
  quote: string;
  avatar_url: string | null;
  rating: number;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  company_name: string;
  tagline: string | null;
  about_description: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  hero_headline: string | null;
  hero_subheadline: string | null;
  hero_cta_primary: string | null;
  hero_cta_secondary: string | null;
  stats_clients: string | null;
  stats_projects: string | null;
  stats_team: string | null;
  stats_years: string | null;
}

export interface Admin {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'super_admin';
}
