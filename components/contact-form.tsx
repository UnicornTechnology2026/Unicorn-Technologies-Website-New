"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { enquirySchema, type EnquiryFormData } from "@/lib/validations";
import { SERVICE_OPTIONS, BUDGET_OPTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@radix-ui/react-checkbox";
import Link from "next/link";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      service_consent: false,
      marketing_email: false,
      marketing_whatsapp: false,
    },
  });

  const serviceConsent = watch("service_consent");
  const marketingEmail = watch("marketing_email");
  const marketingWhatsapp = watch("marketing_whatsapp");

  const serviceValue = watch("service");
  const budgetValue = watch("budget");

  const onSubmit = async (data: EnquiryFormData) => {
    setLoading(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const response = await fetch(
        `${supabaseUrl}/functions/v1/submit-enquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit. Please try again.");
      }

      toast.success(
        "Thank you! We have received your enquiry and will respond within 24 hours.",
      );
      setSubmitted(true);
      reset();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (formErrors: typeof errors) => {
    if (formErrors.service_consent) {
      toast.error("Please tick the agreement box before sending your enquiry.");
      document
        .getElementById("service_consent")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      document.getElementById("service_consent")?.focus();
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">Enquiry Submitted!</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Thank you for reaching out. Our team will review your enquiry and get
          back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="#37373b pr-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...register("company")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 pt-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 pt-5">
        <div className="space-y-2">
          <Label>Service Required *</Label>
          <Select
            value={serviceValue}
            onValueChange={(v) =>
              setValue("service", v, { shouldValidate: true })
            }
          >
            <SelectTrigger
              className={errors.service ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="text-xs text-destructive">{errors.service.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Budget</Label>
          <Select
            value={budgetValue}
            onValueChange={(v) => setValue("budget", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a budget range" />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_OPTIONS.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2 py-5">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* ── Consent ── */}
      <div className="space-y-4 pb-5">
        {/* 1. Needed to deliver the service */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="service_consent"
            checked={serviceConsent}
            onChange={(e) =>
              setValue("service_consent", e.target.checked, {
                shouldValidate: true,
              })
            }
            aria-invalid={!!errors.service_consent}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-gray-400 accent-[#EF0907]"
          />
          <Label
            htmlFor="service_consent"
            className="text-sm font-normal leading-snug"
          >
            I agree that Unicorn Technologies may store my details and contact
            me by email or phone to respond to this enquiry. See our{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            . *
          </Label>
        </div>
        {errors.service_consent && (
          <p className="text-sm font-medium text-destructive">
            {errors.service_consent.message}
          </p>
        )}

        {/* 2. Optional marketing, kept separate from the above */}
        <div className="rounded-lg border border-border p-4 space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Optional: you can still send your enquiry without ticking these
          </p>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="marketing_email"
              checked={marketingEmail}
              onChange={(e) => setValue("marketing_email", e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-gray-400 accent-[#EF0907]"
            />
            <Label
              htmlFor="marketing_email"
              className="text-sm font-normal leading-snug"
            >
              Send me occasional emails about offers, news and tips.
            </Label>
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="marketing_whatsapp"
              checked={marketingWhatsapp}
              onChange={(e) =>
                setValue("marketing_whatsapp", e.target.checked, {
                  shouldValidate: true,
                })
              }
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-gray-400 accent-[#EF0907]"
            />
            <Label
              htmlFor="marketing_whatsapp"
              className="text-sm font-normal leading-snug"
            >
              Send me updates on WhatsApp at the phone number above.
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">
            You can withdraw any of these at any time using the link in every
            message we send.
          </p>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Enquiry
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground pt-4">
        We respond within 24 hours. Your information is kept confidential.
      </p>
    </form>
  );
}
