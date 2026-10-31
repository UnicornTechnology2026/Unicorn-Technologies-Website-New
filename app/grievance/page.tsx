import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GrievanceForm from "@/components/grievance-form";
import GrievanceTracker from "@/components/grievance-tracker";
import {
  GRIEVANCE_OFFICER as O,
  GRIEVANCE_TIMELINES as T,
} from "@/lib/grievance";

export const metadata: Metadata = {
  title: "Grievance Redressal",
  description:
    "Contact our Grievance Officer, raise a complaint about your personal data or our services, and track it with a ticket number.",
  alternates: { canonical: "/grievance" },
};

export default function GrievancePage() {
  return (
    <>
      <Navbar />
      <main className="container-mx container-px pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-3xl space-y-12">
          <header>
            <h1 className="text-4xl font-bold tracking-tight">
              Grievance Redressal
            </h1>
            <p className="mt-4 text-muted-foreground">
              If you have a concern about how we handle your personal data, or
              about our services, please contact our Grievance Officer using the
              details below or the complaint form.
            </p>
          </header>

          <section className="rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold">Grievance Officer</h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[140px_1fr]">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium">{O.name}</dd>
              <dt className="text-muted-foreground">Designation</dt>
              <dd>{O.designation}</dd>
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a className="underline" href={`mailto:${O.email}`}>
                  {O.email}
                </a>
              </dd>
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a
                  className="underline"
                  href={`tel:${O.phone.replace(/\s/g, "")}`}
                >
                  {O.phone}
                </a>
              </dd>
              <dt className="text-muted-foreground">Address</dt>
              <dd>{O.address}</dd>
              <dt className="text-muted-foreground">Hours</dt>
              <dd>{O.hours}</dd>
            </dl>
          </section>

          <section>
            <h2 className="text-xl font-semibold">How we handle complaints</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>
                Every complaint gets a ticket number (for example
                UT-2026-00001).
              </li>
              <li>
                We acknowledge your complaint <strong>{T.acknowledge}</strong>.
              </li>
              <li>
                We aim to resolve it <strong>{T.resolve}</strong>.
              </li>
              <li>
                Complaints about personal data are answered{" "}
                <strong>{T.dataMax}</strong>.
              </li>
              <li>
                You can also email the Grievance Officer directly. We will give
                you a ticket number.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-6 text-xl font-semibold">Raise a complaint</h2>
            <GrievanceForm />
          </section>

          <section>
            <h2 className="mb-6 text-xl font-semibold">Track a complaint</h2>
            <GrievanceTracker />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
