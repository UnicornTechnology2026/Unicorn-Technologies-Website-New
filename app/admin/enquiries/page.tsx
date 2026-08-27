"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Enquiry, EnquiryStatus } from "@/lib/types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Search, Mail, Phone, Building2, Inbox } from "lucide-react";

const STATUS_OPTIONS: { value: EnquiryStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_progress", label: "In Progress" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

const STATUS_STYLES: Record<EnquiryStatus, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-amber-100 text-amber-700 border-amber-200",
  in_progress: "bg-purple-100 text-purple-700 border-purple-200",
  proposal_sent: "bg-indigo-100 text-indigo-700 border-indigo-200",
  won: "bg-emerald-100 text-emerald-700 border-emerald-200",
  lost: "bg-red-100 text-red-700 border-red-200",
};

function statusLabel(status: EnquiryStatus) {
  return STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | EnquiryStatus>(
    "all",
  );
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadEnquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Could not load enquiries: " + error.message);
    } else {
      setEnquiries((data ?? []) as Enquiry[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const filtered = useMemo(() => {
    return enquiries.filter((e) => {
      const matchesStatus = statusFilter === "all" || e.status === statusFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        (e.company ?? "").toLowerCase().includes(q) ||
        e.service.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [enquiries, search, statusFilter]);

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("enquiries")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast.error("Could not update status: " + error.message);
    } else {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e)),
      );
      if (selected?.id === id) {
        setSelected((prev) => (prev ? { ...prev, status } : prev));
      }
      toast.success("Status updated");
    }
    setUpdatingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Enquiries</h1>
        <p className="text-sm text-muted-foreground">
          Contact form submissions from your website.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as "all" | EnquiryStatus)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <Inbox className="h-8 w-8 text-muted-foreground" />
            <p className="font-medium">No enquiries found</p>
            <p className="text-sm text-muted-foreground">
              {enquiries.length === 0
                ? "Submissions from the contact form will show up here."
                : "Try a different search or status filter."}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead className="hidden lg:table-cell">Service</TableHead>
                <TableHead className="hidden sm:table-cell">Received</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((enquiry) => (
                <TableRow
                  key={enquiry.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(enquiry)}
                >
                  <TableCell>
                    <div className="font-medium">{enquiry.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {enquiry.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {enquiry.company || "—"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {enquiry.service}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {formatDate(enquiry.created_at)}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Select
                      value={enquiry.status}
                      onValueChange={(v) =>
                        handleStatusChange(enquiry.id, v as EnquiryStatus)
                      }
                      disabled={updatingId === enquiry.id}
                    >
                      <SelectTrigger className="h-8 w-40 border-0 bg-transparent p-0">
                        <Badge
                          variant="outline"
                          className={STATUS_STYLES[enquiry.status]}
                        >
                          {updatingId === enquiry.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            statusLabel(enquiry.status)
                          )}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={STATUS_STYLES[selected.status]}
                  >
                    {statusLabel(selected.status)}
                  </Badge>
                  <span className="text-xs text-muted-foreground self-center">
                    Received {formatDate(selected.created_at)}
                  </span>
                </div>

                <div className="grid gap-2">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    {selected.email}
                  </a>
                  {selected.phone && (
                    <a
                      href={`tel:${selected.phone}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4 shrink-0" />
                      {selected.phone}
                    </a>
                  )}
                  {selected.company && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4 shrink-0" />
                      {selected.company}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 rounded-lg bg-secondary/40 p-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Service</div>
                    <div className="font-medium">{selected.service}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Budget</div>
                    <div className="font-medium">{selected.budget || "—"}</div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-xs text-muted-foreground">
                    Message
                  </div>
                  <p className="whitespace-pre-wrap rounded-lg border border-border p-3 text-foreground">
                    {selected.message}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Update status:
                  </span>
                  <Select
                    value={selected.status}
                    onValueChange={(v) =>
                      handleStatusChange(selected.id, v as EnquiryStatus)
                    }
                  >
                    <SelectTrigger className="h-8 w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
