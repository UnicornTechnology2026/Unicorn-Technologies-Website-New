import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const POLICY_VERSION = "2026-10-31";
const PURPOSES = [
  "service_contact",
  "marketing_email",
  "marketing_whatsapp",
] as const;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    let token: string | null;
    let body: { token?: string; changes?: Record<string, boolean> } = {};
    if (req.method === "GET") {
      token = new URL(req.url).searchParams.get("token");
    } else {
      body = await req.json();
      token = body.token ?? null;
    }
    if (!token || !UUID_RE.test(token))
      return json({ error: "Invalid link" }, 400);

    const { data: subject } = await supabase
      .from("consent_subjects")
      .select("email")
      .eq("token", token)
      .maybeSingle();
    if (!subject)
      return json({ error: "This link is invalid or has expired" }, 404);

    if (req.method === "POST") {
      const rows = Object.entries(body.changes ?? {})
        .filter(
          ([p, v]) =>
            (PURPOSES as readonly string[]).includes(p) &&
            typeof v === "boolean",
        )
        .map(([purpose, granted]) => ({
          email: subject.email,
          purpose,
          granted,
          source: "preference_page",
          policy_version: POLICY_VERSION,
          consent_text: granted
            ? "Opted in on the preferences page."
            : "Withdrawn on the preferences page / unsubscribe link.",
          user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
        }));
      if (rows.length) {
        const { error } = await supabase.from("consent_records").insert(rows);
        if (error) throw new Error(error.message);
      }
    }

    const { data: current } = await supabase
      .from("current_consents")
      .select("purpose, granted")
      .eq("email", subject.email);

    const [user, domain] = subject.email.split("@");
    return json({
      email: `${user[0]}***@${domain}`,
      consents: Object.fromEntries(
        (current ?? []).map((c) => [c.purpose, c.granted]),
      ),
    });
  } catch (err) {
    console.error(err);
    return json({ error: "Server error" }, 500);
  }
});
