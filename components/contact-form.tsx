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
  });

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
    <form onSubmit={handleSubmit(onSubmit)} className="#37373b pr-5">
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
          <Input id="phone" {...register("phone")} />
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

      <div className="space-y-2 pt-5">
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
