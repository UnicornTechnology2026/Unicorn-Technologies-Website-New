import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PreferencesClient from "./preferences-client";

export const metadata: Metadata = {
  title: "Communication Preferences",
  robots: { index: false, follow: false },
};

export default function PreferencesPage() {
  return (
    <>
      <Navbar />
      <main className="container-mx container-px pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-bold">Communication preferences</h1>
          <Suspense
            fallback={<p className="mt-6 text-muted-foreground">Loading…</p>}
          >
            <PreferencesClient />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
