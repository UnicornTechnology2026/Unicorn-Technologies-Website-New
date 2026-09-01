"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Sparkles, CheckCircle2 } from "lucide-react";
import { useSettings } from "../settings-provider";

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="container-mx container-px relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
          >
            <Sparkles className="h-4 w-4" />
            {settings.tagline}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Unicorn <span className="gradient-text">Technologies</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-xl font-bold tracking-tight text-balance sm:text-2xl md:text-3xl lg:text-4xl"
          >
            {settings.hero_headline?.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="">
              {settings.hero_headline?.split(" ").slice(-2).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance md:text-xl"
          >
            {settings.hero_subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              {settings.hero_cta_primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-white px-6 font-semibold text-foreground transition-all hover:border-primary hover:shadow-md"
            >
              <Phone className="h-4 w-4 text-primary" />
              {settings.hero_cta_secondary}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            {["Free consultation", "No hidden costs", "Dedicated team"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {item}
                </span>
              ),
            )}
          </motion.div>
        </div>

        {/* Stats */}
        {(
          [
            "stats_clients",
            "stats_projects",
            "stats_team",
            "stats_years",
          ] as const
        ).some((k) => settings[k] && settings[k] !== "0") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              {
                label: "Happy Clients",
                value: settings.stats_clients,
                suffix: "+",
              },
              {
                label: "Projects Delivered",
                value: settings.stats_projects,
                suffix: "+",
              },
              { label: "Team Members", value: settings.stats_team, suffix: "" },
              {
                label: "Years Experience",
                value: settings.stats_years,
                suffix: "+",
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-foreground md:text-4xl">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
