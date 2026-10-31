export const CONSENT_KEY = "ut_cookie_consent";
export const CONSENT_VERSION = 1; // bump this to ask everyone again (e.g. when you add a new tool)

export type CookieConsent = {
  analytics: boolean;
  advertising: boolean;
  version: number;
  timestamp: string;
};

export function readConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as CookieConsent;
    return c.version === CONSENT_VERSION ? c : null;
  } catch {
    return null;
  }
}

export function writeConsent(c: CookieConsent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {
    /* storage blocked: choice only lasts for this visit */
  }
}

// Remove Google Analytics / ads cookies when someone withdraws consent
export function clearTrackingCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => /^(_ga|_gid|_gat|__gads|__gpi|_gcl_)/.test(n));

  const host = location.hostname;
  const parts = host.split(".");
  const domains = [host, "." + host];
  if (parts.length > 2) domains.push("." + parts.slice(-2).join("."));

  for (const name of names) {
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}
