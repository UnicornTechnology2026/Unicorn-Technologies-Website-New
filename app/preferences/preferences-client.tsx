"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const API = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/manage-consent`;
const headers = {
  "Content-Type": "application/json",
  apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
};

type State = { email: string; consents: Record<string, boolean> };

export default function PreferencesClient() {
  const token = useSearchParams().get("token");
  const [state, setState] = useState<State | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) {
      setError(
        "This link is missing its token. Please use the link in our email.",
      );
      return;
    }
    fetch(`${API}?token=${token}`, { headers })
      .then(async (r) =>
        r.ok ? r.json() : Promise.reject((await r.json()).error),
      )
      .then(setState)
      .catch((e) => setError(String(e)));
  }, [token]);

  const save = useCallback(
    async (changes: Record<string, boolean>) => {
      setBusy(true);
      try {
        const r = await fetch(API, {
          method: "POST",
          headers,
          body: JSON.stringify({ token, changes }),
        });
        const data = await r.json();
        if (!r.ok) throw new Error(data.error);
        setState(data);
        toast.success("Your preferences have been saved.");
      } catch (e) {
        toast.error(
          e instanceof Error ? e.message : "Could not save. Please try again.",
        );
      } finally {
        setBusy(false);
      }
    },
    [token],
  );

  if (error) return <p className="mt-6 text-destructive">{error}</p>;
  if (!state) return <p className="mt-6 text-muted-foreground">Loading…</p>;

  const c = state.consents;
  return (
    <div className="mt-6 space-y-6">
      <p className="text-sm text-muted-foreground">
        Preferences for {state.email}
      </p>

      {[
        ["marketing_email", "Marketing emails"],
        ["marketing_whatsapp", "Marketing WhatsApp messages"],
      ].map(([key, label]) => (
        <div
          key={key}
          className="flex items-center justify-between rounded-lg border border-border p-4"
        >
          <Label htmlFor={key}>{label}</Label>
          <Switch
            id={key}
            checked={!!c[key]}
            disabled={busy}
            onCheckedChange={(v) => save({ [key]: v })}
          />
        </div>
      ))}

      <Button
        variant="outline"
        disabled={busy}
        onClick={() =>
          save({
            marketing_email: false,
            marketing_whatsapp: false,
            service_contact: false,
          })
        }
      >
        Withdraw all consent
      </Button>
      <p className="text-xs text-muted-foreground">
        Withdrawing consent means we stop contacting you. It doesn't affect
        anything done before.
      </p>
    </div>
  );
}
