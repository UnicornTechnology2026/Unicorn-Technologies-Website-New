"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Grievance, GrievanceStatus } from "@/lib/types";
import { GRIEVANCE_CATEGORIES } from "@/lib/grievance";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Loader2,
  Search,
  Mail,
  Phone,
  ShieldAlert,
  Trash2,
} from "lucide-react";

const STATUS_OPTIONS: { value: GrievanceStatus; label: string }[] = [
  { value: "received", label: "Received" },
  { value: "acknowledged", label: "Acknowledged" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

const STATUS_STYLES: Record<GrievanceStatus, string> = {
  received: "bg-blue-100 text-blue-700 border-blue-200",
  acknowledged: "bg-amber-100 text-amber-700 border-amber-200",
  in_progress: "bg-purple-100 text-purple-700 border-purple-200",
  resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-gray-100 text-gray-700 border-gray-200",
};

const statusLabel = (s: GrievanceStatus) =>
  STATUS_OPTIONS.find((o) => o.value === s)?.label ?? s;

const categoryLabel = (v: string) =>
  GRIEVANCE_CATEGORIES.find((c) => c.value === v)?.label ?? v;

const fmt = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const fmtDay = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const isOpen = (g: Grievance) =>
  g.status !== "resolved" && g.status !== "closed";

/** Deadline badge text and colour for a complaint */
function deadlineInfo(
  g: Grievance,
): { text: string; className: string } | null {
  if (!isOpen(g)) return null;
  const now = Date.now();
  if (!g.acknowledged_at && now > new Date(g.acknowledge_by).getTime()) {
    return {
      text: "Acknowledgement overdue",
      className: "bg-red-100 text-red-700 border-red-200",
    };
  }
  const daysLeft = Math.ceil(
    (new Date(g.resolve_by).getTime() - now) / 86400000,
  );
  if (daysLeft < 0)
    return {
      text: "Overdue",
      className: "bg-red-100 text-red-700 border-red-200",
    };
  if (daysLeft <= 3)
    return {
      text: `Due in ${daysLeft}d`,
      className: "bg-amber-100 text-amber-700 border-amber-200",
    };
  return {
    text: `${daysLeft}d left`,
    className: "bg-secondary text-muted-foreground border-border",
  };
}

export default function GrievancesPage() {
  const [items, setItems] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "open" | GrievanceStatus
  >("open");
  const [selected, setSelected] = useState<Grievance | null>(null);
  const [draftStatus, setDraftStatus] = useState<GrievanceStatus>("received");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Grievance | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("grievances")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Could not load grievances: " + error.message);
    else setItems((data ?? []) as Grievance[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  // Reset the editor when a complaint is opened
  useEffect(() => {
    if (selected) {
      setDraftStatus(selected.status);
      setNote(selected.resolution_note ?? "");
    }
  }, [selected?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const stats = useMemo(
    () => ({
      open: items.filter(isOpen).length,
      waiting: items.filter((g) => !g.acknowledged_at && isOpen(g)).length,
      overdue: items.filter((g) => deadlineInfo(g)?.className.includes("red"))
        .length,
    }),
    [items],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((g) => {
      const okStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "open"
            ? isOpen(g)
            : g.status === statusFilter;
      const okSearch =
        !q ||
        g.ticket_no.toLowerCase().includes(q) ||
        g.name.toLowerCase().includes(q) ||
        g.email.toLowerCase().includes(q);
      return okStatus && okSearch;
    });
  }, [items, search, statusFilter]);

  /** Saves status + note, and stamps acknowledged_at / resolved_at automatically */
  const save = async (
    g: Grievance,
    status: GrievanceStatus,
    resolutionNote: string,
  ) => {
    if (status === "resolved" && !resolutionNote.trim()) {
      toast.error("Add a resolution note before marking as resolved.");
      return;
    }
    setSaving(true);
    const now = new Date().toISOString();
    const patch: Partial<Grievance> = {
      status,
      resolution_note: resolutionNote.trim() || null,
      updated_at: now,
    };
    if (status !== "received" && !g.acknowledged_at)
      patch.acknowledged_at = now;
    if ((status === "resolved" || status === "closed") && !g.resolved_at)
      patch.resolved_at = now;

    const { error } = await supabase
      .from("grievances")
      .update(patch)
      .eq("id", g.id);
    setSaving(false);

    if (error) {
      toast.error("Could not save: " + error.message);
      return;
    }
    setItems((prev) =>
      prev.map((x) => (x.id === g.id ? { ...x, ...patch } : x)),
    );
    setSelected((prev) =>
      prev && prev.id === g.id ? { ...prev, ...patch } : prev,
    );
    toast.success("Complaint updated");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const { data, error } = await supabase
      .from("grievances")
      .delete()
      .eq("id", deleteTarget.id)
      .select("id");
    setDeleting(false);

    if (error) {
      toast.error("Could not delete: " + error.message);
      return;
    }
    if (!data || data.length === 0) {
      toast.error(
        "Nothing was deleted. Run the delete policy SQL in Supabase.",
      );
      return;
    }
    setItems((prev) => prev.filter((g) => g.id !== deleteTarget.id));
    if (selected?.id === deleteTarget.id) setSelected(null);
    setDeleteTarget(null);
    toast.success("Complaint deleted");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Grievances</h1>
        <p className="text-sm text-muted-foreground">
          Complaints raised on the Grievance Redressal page. Acknowledge within
          48 hours, resolve within 30 days (data complaints: 90 days at the
          latest).
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Open complaints", stats.open, ""],
          [
            "Awaiting acknowledgement",
            stats.waiting,
            stats.waiting ? "text-amber-600" : "",
          ],
          ["Overdue", stats.overdue, stats.overdue ? "text-red-600" : ""],
        ].map(([label, value, cls]) => (
          <div
            key={label as string}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className={`mt-1 text-2xl font-bold ${cls}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search ticket, name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as any)}
        >
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open only</SelectItem>
            <SelectItem value="all">All</SelectItem>
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
            <ShieldAlert className="h-8 w-8 text-muted-foreground" />
            <p className="font-medium">No complaints found</p>
            <p className="text-sm text-muted-foreground">
              {items.length === 0
                ? "Complaints submitted on the Grievance page will show up here."
                : "Try a different search or filter."}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Complainant</TableHead>
                <TableHead className="hidden lg:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Received</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((g) => {
                const dl = deadlineInfo(g);
                return (
                  <TableRow
                    key={g.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(g)}
                  >
                    <TableCell className="font-mono text-xs font-semibold">
                      {g.ticket_no}
                    </TableCell>

                    <TableCell>
                      <div className="font-medium">{g.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {g.email}
                      </div>
                    </TableCell>

                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {categoryLabel(g.category)}
                    </TableCell>

                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {fmt(g.created_at)}
                    </TableCell>

                    <TableCell>
                      {dl ? (
                        <Badge variant="outline" className={dl.className}>
                          {dl.text}
                        </Badge>
                      ) : (
                        "—"
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={STATUS_STYLES[g.status]}
                      >
                        {statusLabel(g.status)}
                      </Badge>
                    </TableCell>

                    {/* ✅ delete cell: inside TableRow, so `g` exists here */}
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete complaint"
                        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteTarget(g)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>
                  <span className="font-mono">{selected.ticket_no}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={STATUS_STYLES[selected.status]}
                  >
                    {statusLabel(selected.status)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {categoryLabel(selected.category)}
                  </span>
                </div>

                <div className="grid gap-2">
                  <div className="font-medium">{selected.name}</div>
                  <a
                    href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.ticket_no}`)}`}
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
                </div>

                <div className="grid grid-cols-2 gap-3 rounded-lg bg-secondary/40 p-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Received</div>
                    <div className="font-medium">
                      {fmt(selected.created_at)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Acknowledged</div>
                    <div className="font-medium">
                      {fmt(selected.acknowledged_at)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Acknowledge by (48h)
                    </div>
                    <div className="font-medium">
                      {fmt(selected.acknowledge_by)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Resolve by (30 days)
                    </div>
                    <div className="font-medium">
                      {fmtDay(selected.resolve_by)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      Legal limit (90 days)
                    </div>
                    <div className="font-medium">
                      {fmtDay(selected.legal_deadline)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Resolved</div>
                    <div className="font-medium">
                      {fmt(selected.resolved_at)}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-xs text-muted-foreground">
                    Complaint
                  </div>
                  <p className="select-text whitespace-pre-wrap rounded-lg border border-border p-3">
                    {selected.description}
                  </p>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={draftStatus}
                      onValueChange={(v) =>
                        setDraftStatus(v as GrievanceStatus)
                      }
                    >
                      <SelectTrigger className="w-full">
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
                  <div className="space-y-2">
                    <Label htmlFor="resolution">
                      Resolution note {draftStatus === "resolved" && "*"}
                    </Label>
                    <Textarea
                      id="resolution"
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="What was done to resolve this? The complainant can see this note when they track their ticket."
                    />
                  </div>
                  <Button
                    onClick={() => save(selected, draftStatus, note)}
                    disabled={saving}
                    className="w-full"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Choosing any status after "Received" records the
                    acknowledgement time. "Resolved" records the resolution time
                    and needs a note.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setDeleteTarget(selected)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete this complaint
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {deleteTarget?.ticket_no}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the complaint from {deleteTarget?.name} .
              The complainant will no longer be able to track this ticket.
              {deleteTarget &&
                isOpen(deleteTarget) &&
                " This complaint is still open and not yet resolved."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
