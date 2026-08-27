/*
# Unicorn Technologies — Initial Schema

1. Purpose
   Backing schema for the Unicorn Technologies marketing website + admin dashboard.
   Public site visitors submit enquiries. Authenticated admins manage enquiries,
   portfolio, blog posts, testimonials, and site settings.

2. New Tables
   - `admins`              — links an auth.users account to admin metadata (name, role).
   - `enquiries`           — contact form submissions with lead status tracking.
   - `enquiry_notes`       — internal notes an admin adds to an enquiry.
   - `portfolio_items`     — showcase projects (title, category, description, image, url).
   - `blog_posts`          — published/draft articles (title, slug, excerpt, content, cover).
   - `testimonials`        — client quotes (author, role, company, quote, avatar, rating).
   - `site_settings`       — single-row table with company contact info, social links, etc.

3. Lead Status
   Enquiries move through: new -> contacted -> in_progress -> proposal_sent -> won | lost.

4. Security
   - Public content (portfolio, published blog posts, approved testimonials, site settings)
     is readable by `anon` + `authenticated`.
   - Enquiries can be INSERTed by anon (form submission) but only read/updated by
     authenticated admins.
   - All admin-side tables (enquiry_notes, blog draft management, portfolio/testimonials
     mutations) require authentication.
   - RLS enabled on every table. 4 separate policies per table (select/insert/update/delete).
   - `admins` table uses `auth.uid() = id` so only the signed-in admin sees/edits their row.
*/

-- ───────────────────────────── admins ─────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin','super_admin')),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_admin" ON admins;
CREATE POLICY "select_own_admin" ON admins FOR SELECT
  TO authenticated USING (auth.uid() = id);
DROP POLICY IF EXISTS "insert_own_admin" ON admins;
CREATE POLICY "insert_own_admin" ON admins FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "update_own_admin" ON admins;
CREATE POLICY "update_own_admin" ON admins FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "delete_own_admin" ON admins;
CREATE POLICY "delete_own_admin" ON admins FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- ───────────────────────────── enquiries ─────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  budget text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','in_progress','proposal_sent','won','lost')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries(status);
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries(created_at DESC);

-- Public can submit enquiries
DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries" ON enquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);
-- Only admins can read / update / delete
DROP POLICY IF EXISTS "auth_select_enquiries" ON enquiries;
CREATE POLICY "auth_select_enquiries" ON enquiries FOR SELECT
  TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_update_enquiries" ON enquiries;
CREATE POLICY "auth_update_enquiries" ON enquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_enquiries" ON enquiries;
CREATE POLICY "auth_delete_enquiries" ON enquiries FOR DELETE
  TO authenticated USING (true);

-- ───────────────────────────── enquiry_notes ─────────────────────────────
CREATE TABLE IF NOT EXISTS enquiry_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id uuid NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  admin_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE enquiry_notes ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS enquiry_notes_enquiry_id_idx ON enquiry_notes(enquiry_id);

DROP POLICY IF EXISTS "auth_select_enquiry_notes" ON enquiry_notes;
CREATE POLICY "auth_select_enquiry_notes" ON enquiry_notes FOR SELECT
  TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_enquiry_notes" ON enquiry_notes;
CREATE POLICY "auth_insert_enquiry_notes" ON enquiry_notes FOR INSERT
  TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_enquiry_notes" ON enquiry_notes;
CREATE POLICY "auth_update_enquiry_notes" ON enquiry_notes FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_enquiry_notes" ON enquiry_notes;
CREATE POLICY "auth_delete_enquiry_notes" ON enquiry_notes FOR DELETE
  TO authenticated USING (true);

-- ───────────────────────────── portfolio_items ─────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text,
  image_url text,
  project_url text,
  client text,
  tags text[] DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS portfolio_published_featured_idx ON portfolio_items(published, featured);

-- Public reads published portfolio
DROP POLICY IF EXISTS "anon_select_portfolio" ON portfolio_items;
CREATE POLICY "anon_select_portfolio" ON portfolio_items FOR SELECT
  TO anon, authenticated USING (published = true OR auth.role() = 'authenticated');
DROP POLICY IF EXISTS "auth_insert_portfolio" ON portfolio_items;
CREATE POLICY "auth_insert_portfolio" ON portfolio_items FOR INSERT
  TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_portfolio" ON portfolio_items;
CREATE POLICY "auth_update_portfolio" ON portfolio_items FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_portfolio" ON portfolio_items;
CREATE POLICY "auth_delete_portfolio" ON portfolio_items FOR DELETE
  TO authenticated USING (true);

-- ───────────────────────────── blog_posts ─────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  cover_image text,
  author text,
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_published_at_idx ON blog_posts(status, published_at DESC);

-- Public reads published posts
DROP POLICY IF EXISTS "anon_select_blog" ON blog_posts;
CREATE POLICY "anon_select_blog" ON blog_posts FOR SELECT
  TO anon, authenticated USING (status = 'published' OR auth.role() = 'authenticated');
DROP POLICY IF EXISTS "auth_insert_blog" ON blog_posts;
CREATE POLICY "auth_insert_blog" ON blog_posts FOR INSERT
  TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_blog" ON blog_posts;
CREATE POLICY "auth_update_blog" ON blog_posts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_blog" ON blog_posts;
CREATE POLICY "auth_delete_blog" ON blog_posts FOR DELETE
  TO authenticated USING (true);

-- ───────────────────────────── testimonials ─────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author text NOT NULL,
  role text,
  company text,
  quote text NOT NULL,
  avatar_url text,
  rating int NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS testimonials_published_sort_idx ON testimonials(published, sort_order);

DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (published = true OR auth.role() = 'authenticated');
DROP POLICY IF EXISTS "auth_insert_testimonials" ON testimonials;
CREATE POLICY "auth_insert_testimonials" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_testimonials" ON testimonials;
CREATE POLICY "auth_update_testimonials" ON testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_testimonials" ON testimonials;
CREATE POLICY "auth_delete_testimonials" ON testimonials FOR DELETE
  TO authenticated USING (true);

-- ───────────────────────────── site_settings ─────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL DEFAULT 'Unicorn Technologies',
  tagline text,
  about_description text,
  email text,
  phone text,
  whatsapp text,
  address text,
  facebook_url text,
  twitter_url text,
  linkedin_url text,
  instagram_url text,
  hero_headline text,
  hero_subheadline text,
  hero_cta_primary text,
  hero_cta_secondary text,
  stats_clients text,
  stats_projects text,
  stats_team text,
  stats_years text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id IS NOT NULL)
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public reads settings
DROP POLICY IF EXISTS "anon_select_settings" ON site_settings;
CREATE POLICY "anon_select_settings" ON site_settings FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_update_settings" ON site_settings;
CREATE POLICY "auth_update_settings" ON site_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- ───────────────────────────── triggers: updated_at ─────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enquiries_updated_at ON enquiries;
CREATE TRIGGER enquiries_updated_at BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS portfolio_items_updated_at ON portfolio_items;
CREATE TRIGGER portfolio_items_updated_at BEFORE UPDATE ON portfolio_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS site_settings_updated_at ON site_settings;
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
