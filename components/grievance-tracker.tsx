"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/submit-grievance`;

export default function GrievanceTracker() {
  const [ticket, setTicket] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const track = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ action: "track", ticket_no: ticket, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.grievance);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Could not find that ticket.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fmt = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "—";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="t-ticket">Ticket number</Label>
          <Input
            id="t-ticket"
            placeholder="UT-2026-00001"
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="t-email">Email used</Label>
          <Input
            id="t-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <Button
        onClick={track}
        disabled={loading || !ticket || !email}
        variant="outline"
      >
        {loading ? "Checking…" : "Check status"}
      </Button>

      {result && (
        <div className="rounded-lg border border-border p-4 text-sm space-y-1">
          <p>
            <strong>{result.ticket_no}</strong> — status:{" "}
            <span className="font-semibold capitalize">
              {result.status.replace("_", " ")}
            </span>
          </p>
          <p>Received: {fmt(result.created_at)}</p>
          <p>Acknowledged: {fmt(result.acknowledged_at)}</p>
          <p>Target resolution date: {fmt(result.resolve_by)}</p>
          {result.resolution_note && (
            <p>Resolution: {result.resolution_note}</p>
          )}
        </div>
      )}
    </div>
  );
}
