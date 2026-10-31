import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { isIP } from "node:net";

// Keep this wording identical to what the form displays.
const POLICY_VERSION = "2026-10-31";
const CONSENT_TEXT = {
  service_contact:
    "I agree that Unicorn Technologies may store my details and contact me by email or phone to respond to this enquiry.",
  marketing_email: "Send me occasional emails about offers, news and tips.",
  marketing_whatsapp: "Send me updates on WhatsApp at the phone number above.",
} as const;

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

const esc = (s: unknown) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

Deno.serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const { name, company, phone, service, budget, message } = body;
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    if (!name || !email || !service || !message) {
      return json({ error: "Missing required fields" }, 400);
    }
    // Consent needed for the service must be an explicit true
    if (body.service_consent !== true) {
      return json(
        { error: "Please agree to us contacting you about your enquiry." },
        400,
      );
    }
    const marketingEmail = body.marketing_email === true;
    const marketingWhatsapp = body.marketing_whatsapp === true;
    if (marketingWhatsapp && !String(phone ?? "").trim()) {
      return json(
        { error: "A phone number is required for WhatsApp updates." },
        400,
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1. Store the enquiry
    const { data: enquiry, error: dbError } = await supabase
      .from("enquiries")
      .insert({ name, email, company, phone, service, budget, message })
      .select()
      .single();
    if (dbError) throw new Error(dbError.message);

    // 2. Record consent (one row per purpose, including "no")
    const ipRaw =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "";
    const base = {
      email,
      enquiry_id: enquiry.id,
      source: "contact_form",
      policy_version: POLICY_VERSION,
      ip_address: isIP(ipRaw) ? ipRaw : null,
      user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
    };

    await supabase
      .from("consent_subjects")
      .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });

    const { error: consentError } = await supabase
      .from("consent_records")
      .insert([
        {
          ...base,
          purpose: "service_contact",
          granted: true,
          consent_text: CONSENT_TEXT.service_contact,
        },
        {
          ...base,
          purpose: "marketing_email",
          granted: marketingEmail,
          consent_text: CONSENT_TEXT.marketing_email,
        },
        {
          ...base,
          purpose: "marketing_whatsapp",
          granted: marketingWhatsapp,
          consent_text: CONSENT_TEXT.marketing_whatsapp,
        },
      ]);
    if (consentError) throw new Error(consentError.message);

    // 3. Email the admin (user input escaped to prevent HTML injection)
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Enquiries <enquiries@yourdomain.com>",
        to: [Deno.env.get("ADMIN_EMAIL")!],
        reply_to: email,
        subject: `New Enquiry: ${service} — ${name}`,
        html: `
          <h2>New Enquiry</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Company:</strong> ${esc(company) || "—"}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Phone:</strong> ${esc(phone) || "—"}</p>
          <p><strong>Service:</strong> ${esc(service)}</p>
          <p><strong>Budget:</strong> ${esc(budget) || "—"}</p>
          <p><strong>Message:</strong></p>
          <p>${esc(message).replace(/\n/g, "<br>")}</p>
          <hr>
          <p><strong>Marketing email:</strong> ${marketingEmail ? "YES" : "no"} ·
             <strong>Marketing WhatsApp:</strong> ${marketingWhatsapp ? "YES" : "no"}</p>
        `,
      }),
    });
    if (!emailRes.ok)
      console.error("Email send failed:", await emailRes.text());

    return json({ success: true, id: enquiry.id });
  } catch (err) {
    console.error(err);
    return json(
      { error: err instanceof Error ? err.message : "Server error" },
      500,
    );
  }
});
