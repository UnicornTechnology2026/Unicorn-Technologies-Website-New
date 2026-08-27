'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/animations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary based on scope and complexity. A standard website takes 4-8 weeks, while custom software or mobile apps can range from 8-24 weeks. We provide a detailed timeline during the discovery phase.',
  },
  {
    question: 'What is your pricing model?',
    answer:
      'We offer flexible pricing models including fixed-price projects, time-and-materials, and dedicated team arrangements. The best model depends on your project requirements, which we discuss during the free consultation.',
  },
  {
    question: 'Do you provide ongoing maintenance after launch?',
    answer:
      'Yes. We offer annual maintenance and support plans that include security updates, bug fixes, performance monitoring, and feature enhancements. Our goal is to ensure your product continues to perform optimally.',
  },
  {
    question: 'Can you work with our existing team or codebase?',
    answer:
      'Absolutely. We frequently collaborate with in-house teams and work within existing codebases. Our developers are experienced in picking up established projects and contributing effectively.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer:
      'We specialize in modern web technologies (Next.js, React, Node.js), mobile development (React Native, Swift, Kotlin), cloud infrastructure (AWS, GCP), and a wide range of databases and third-party integrations.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Simply reach out through our contact form or schedule a free consultation. We will discuss your requirements, provide an initial proposal, and guide you through the next steps to kick off your project.',
  },
];

export default function FAQ() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-mx container-px">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a question not covered here? Reach out to our team — we are happy to help.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl border border-border bg-card px-5"
                >
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
