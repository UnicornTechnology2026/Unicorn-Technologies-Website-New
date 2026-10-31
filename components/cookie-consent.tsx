"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  CONSENT_VERSION,
  readConsent,
  writeConsent,
  clearTrackingCookies,
  type CookieConsent,
} from "@/lib/cookie-consent";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Ctx = {
  consent: CookieConsent | null;
  ready: boolean;
  save: (analytics: boolean, advertising: boolean) => void;
  openSettings: () => void;
};

const CookieCtx = createContext<Ctx | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieCtx);
  if (!ctx)
    throw new Error(
      "useCookieConsent must be used inside CookieConsentProvider",
    );
  return ctx;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  const save = useCallback(
    (analytics: boolean, advertising: boolean) => {
      const next: CookieConsent = {
        analytics,
        advertising,
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
      };
      const revoked =
        (consent?.analytics && !analytics) ||
        (consent?.advertising && !advertising);

      writeConsent(next);
      setConsent(next);
      setOpen(false);

      // Scripts that are already running can't be unloaded, so clear cookies and reload
      if (revoked) {
        clearTrackingCookies();
        window.location.reload();
      }
    },
    [consent],
  );

  return (
    <CookieCtx.Provider
      value={{ consent, ready, save, openSettings: () => setOpen(true) }}
    >
      {children}
      <CookieBanner onChoose={() => setOpen(true)} hidden={open} />
      <CookieSettingsDialog open={open} onOpenChange={setOpen} />
    </CookieCtx.Provider>
  );
}

/* ───────── Banner: Accept, Reject and Choose are identical in size and style ───────── */
function CookieBanner({
  onChoose,
  hidden,
}: {
  onChoose: () => void;
  hidden: boolean;
}) {
  const { consent, ready, save } = useCookieConsent();
  if (!ready || consent || hidden) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background p-4 shadow-2xl sm:p-6"
    >
      <div className="container-mx flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-3xl text-sm text-muted-foreground">
          We use cookies to keep the site working and, only if you agree, to
          understand how it is used (analytics) and to show ads (advertising).
          Nothing optional is loaded until you choose. See our{" "}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="grid shrink-0 grid-cols-3 gap-2 sm:w-[420px]">
          <Button variant="outline" onClick={() => save(true, true)}>
            Accept all
          </Button>
          <Button variant="outline" onClick={() => save(false, false)}>
            Reject all
          </Button>
          <Button variant="outline" onClick={onChoose}>
            Choose
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ───────── Settings dialog (also opened from the footer link) ───────── */
function CookieSettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { consent, save } = useCookieConsent();
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  // Start from the saved choice, or "off" if there isn't one
  useEffect(() => {
    if (open) {
      setAnalytics(consent?.analytics ?? false);
      setAdvertising(consent?.advertising ?? false);
    }
  }, [open, consent]);

  const rows = [
    {
      id: "necessary",
      title: "Strictly necessary",
      on: true,
      locked: true,
      desc: "Needed for the site and admin login to work. Always on.",
    },
    {
      id: "analytics",
      title: "Analytics",
      on: analytics,
      set: setAnalytics,
      desc: "Google Analytics: counts visits and shows which pages are used, so we can improve the site.",
    },
    {
      id: "advertising",
      title: "Advertising",
      on: advertising,
      set: setAdvertising,
      desc: "Google AdSense: lets Google show and measure ads and may set advertising cookies.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Cookie settings</DialogTitle>
          <DialogDescription>
            Choose which cookies you allow. You can change this at any time from
            the "Cookie settings" link in the footer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {rows.map((r) => (
            <div
              key={r.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-border p-4"
            >
              <div>
                <Label htmlFor={`ck-${r.id}`} className="font-semibold">
                  {r.title}
                </Label>
                <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <Switch
                id={`ck-${r.id}`}
                checked={r.on}
                disabled={r.locked}
                onCheckedChange={(v) => r.set?.(v)}
              />
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => save(false, false)}>
            Reject all
          </Button>
          <Button variant="outline" onClick={() => save(true, true)}>
            Accept all
          </Button>
          <Button
            variant="outline"
            onClick={() => save(analytics, advertising)}
          >
            Save choices
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
