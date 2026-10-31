"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { grievanceSchema, type GrievanceFormData } from "@/lib/validations";
import { GRIEVANCE_CATEGORIES } from "@/lib/grievance";
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

const API = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/submit-grievance`;
const headers = {
  "Content-Type": "application/json",
  apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
};

async function call(payload: object) {
  const res = await fetch(API, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

export default function GrievanceForm() {
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<GrievanceFormData>({ resolver: zodResolver(grievanceSchema) });
  const category = watch("category");

  const onSubmit = async (d: GrievanceFormData) => {
    setLoading(true);
    try {
      const r = await call(d);
      setTicket(r.ticket_no);
      reset();
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Could not submit. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (ticket) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <h3 className="mt-4 text-xl font-semibold">Complaint received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your ticket number is
        </p>
        <p className="mt-1 text-2xl font-bold tracking-wide">{ticket}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Please save this number. We have also emailed it to you.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setTicket(null)}
        >
          Submit another complaint
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* honeypot: hidden from humans */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("website")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="g-name">Name *</Label>
          <Input
            id="g-name"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="g-email">Email *</Label>
          <Input
            id="g-email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="g-phone">Phone</Label>
          <Input id="g-phone" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label>Type of complaint *</Label>
          <Select
            value={category}
            onValueChange={(v) =>
              setValue("category", v, { shouldValidate: true })
            }
          >
            <SelectTrigger
              className={errors.category ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {GRIEVANCE_CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-xs text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="g-desc">Describe your complaint *</Label>
        <Textarea
          id="g-desc"
          rows={6}
          {...register("description")}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p className="text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={loading} size="lg" className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit complaint"
        )}
      </Button>
    </form>
  );
}
