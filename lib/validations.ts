import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

export const portfolioSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  image_url: z.string().optional(),
  project_url: z.string().optional(),
  client: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  cover_image: z.string().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published']).default('draft'),
});

export const testimonialSchema = z.object({
  author: z.string().min(1, 'Author name is required'),
  role: z.string().optional(),
  company: z.string().optional(),
  quote: z.string().min(5, 'Quote is required'),
  avatar_url: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
  published: z.boolean().default(true),
});

export const settingsSchema = z.object({
  company_name: z.string().min(1),
  tagline: z.string().optional(),
  about_description: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  facebook_url: z.string().optional(),
  twitter_url: z.string().optional(),
  linkedin_url: z.string().optional(),
  instagram_url: z.string().optional(),
  hero_headline: z.string().optional(),
  hero_subheadline: z.string().optional(),
  hero_cta_primary: z.string().optional(),
  hero_cta_secondary: z.string().optional(),
  stats_clients: z.string().optional(),
  stats_projects: z.string().optional(),
  stats_team: z.string().optional(),
  stats_years: z.string().optional(),
});
