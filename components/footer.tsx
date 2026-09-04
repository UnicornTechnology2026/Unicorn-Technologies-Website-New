"use client";

import Link from "next/link";
import {
  Sparkles,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useSettings } from "./settings-provider";

const socialLinks = [
  { key: "facebook_url", icon: Facebook, label: "Facebook" },
  { key: "twitter_url", icon: Twitter, label: "Twitter" },
  { key: "linkedin_url", icon: Linkedin, label: "LinkedIn" },
  { key: "instagram_url", icon: Instagram, label: "Instagram" },
] as const;

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container-mx container-px py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <span>
                {settings.company_name.replace(" Technologies", "")}
                &nbsp; <span className="gradient-text">Technologies</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {settings.tagline}
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ key, icon: Icon, label }) => {
                const url = settings[key];
                if (!url) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-sm uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-sm uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary"
                >
                  Website Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary"
                >
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary"
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary"
                >
                  Maintenance & Support
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary"
                >
                  Custom Software
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-sm uppercase tracking-wider text-foreground">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              {settings.email && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-primary"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.phone && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={`tel:${settings.phone}`}
                    className="hover:text-primary"
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings.address && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{settings.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {settings.company_name}. All
            rights reserved.
          </p>
          <Link
            href="/admin/login"
            className="text-xs text-muted-foreground/60 hover:text-primary"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
