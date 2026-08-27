"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { SiteSettings } from "@/lib/types";

const defaultSettings: SiteSettings = {
  id: "",
  company_name: "Unicorn Technologies",
  tagline: "Software & Digital Solutions",
  about_description:
    "We are a full-service software and digital solutions company helping startups and enterprises build, scale, and maintain world-class digital products.",
  email: "narendra@unicorntechnologiess.com",
  phone: "+91 9921224567 ",
  whatsapp: "+91 9921224567",
  address: "382, Near Trikoni Garden, Shankar Nagar, Nagpur",
  facebook_url: "",
  twitter_url: "",
  linkedin_url: "",
  instagram_url: "",
  hero_headline: "Transforming Ideas Into Digital Reality",
  hero_subheadline:
    "Custom software, web, and mobile solutions engineered to grow your business.",
  hero_cta_primary: "Start Your Project",
  hero_cta_secondary: "Get Free Consultation",
  stats_clients: "0",
  stats_projects: "0",
  stats_team: "0",
  stats_years: "0",
};

interface SettingsContextValue {
  settings: SiteSettings;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  loading: true,
  refresh: async () => {},
});

export function SiteSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (data) setSettings({ ...defaultSettings, ...data });
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
