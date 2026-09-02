"use client";

import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useSettings } from "./settings-provider";

export function SettingsInfo() {
  const { settings } = useSettings();

  const infoItems = [
    {
      icon: Mail,
      label: "Email",
      value: settings.email,
      href: settings.email ? `mailto:${settings.email}` : null,
    },
    {
      icon: Phone,
      label: "Phone",
      value: settings.phone,
      href: settings.phone ? `tel:${settings.phone}` : null,
    },
    { icon: MapPin, label: "Address", value: settings.address, href: null },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      href: null,
    },
  ].filter((item) => item.value);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 md:p-8">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Prefer to reach us directly? Use the details below.
        </p>
        <div className="mt-6 space-y-5">
          {infoItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
