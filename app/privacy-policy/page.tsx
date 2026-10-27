import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Reveal } from "@/components/animations";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Unicorn Technologies, Nagpur collects, uses, and protects your personal information when you use our website.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Unicorn Technologies, Nagpur",
    description:
      "Read how Unicorn Technologies, Nagpur collects, uses, and protects your personal information when you use our website.",
    url: "https://www.unicorntechnologiess.com/privacy-policy",
    type: "website",
    siteName: "Unicorn Technologies",
  },
};

const LAST_UPDATED = "27 October 2026";
const EMAIL = "narendra@unicorntechnologiess.com";
const PHONE = "+91 9921224567";
const ADDRESS =
  "382, Near Trikoni Garden, Shankar Nagar, Nagpur, Maharashtra 440010";

const sections = [
  {
    title: "1. Information We Collect",
    body: (
      <>
        <p>
          When you submit an enquiry through our contact form, we collect the
          information you provide, including your name, company name (optional),
          email address, phone number (optional), the service you are interested
          in, your budget range (optional), and your message.
        </p>
        <p>
          We also collect limited technical information automatically, such as
          your browser type, device, pages visited, and approximate location,
          through cookies and analytics tools.
        </p>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>
            Respond to your enquiries and provide quotes or consultations.
          </li>
          <li>Deliver, maintain, and improve our services and website.</li>
          <li>Understand how visitors use our website through analytics.</li>
          <li>
            Communicate with you about projects, support, or updates you have
            asked for.
          </li>
          <li>Meet legal and regulatory obligations.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Cookies and Analytics",
    body: (
      <p>
        Our website uses Google Analytics to understand traffic and usage
        patterns. Google Analytics uses cookies to collect anonymous usage data.
        You can disable cookies in your browser settings or opt out using the
        Google Analytics opt-out browser add-on; some parts of the site may work
        differently as a result.
      </p>
    ),
  },
  {
    title: "4. Sharing of Information",
    body: (
      <>
        <p>
          We do not sell or rent your personal information. We may share it only
          with:
        </p>
        <ul>
          <li>
            Trusted service providers that help us run the website (for example
            hosting, database, and analytics providers), who are bound to use it
            only for those purposes.
          </li>
          <li>
            Authorities, where required by law or to protect our rights and
            safety.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Data Security and Retention",
    body: (
      <p>
        We use reasonable technical and organisational measures to protect your
        information from unauthorised access, loss, or misuse. No method of
        transmission over the internet is completely secure, so we cannot
        guarantee absolute security. We keep your information only for as long
        as needed for the purposes described in this policy or as required by
        law.
      </p>
    ),
  },
  {
    title: "6. Your Rights",
    body: (
      <p>
        You may request access to, correction of, or deletion of the personal
        information we hold about you, or withdraw your consent to its use, by
        contacting us using the details below. We will respond within a
        reasonable time.
      </p>
    ),
  },
  {
    title: "7. Third-Party Links",
    body: (
      <p>
        Our website may contain links to third-party websites, such as social
        media pages. We are not responsible for their privacy practices and
        encourage you to read their policies.
      </p>
    ),
  },
  {
    title: "8. Children's Privacy",
    body: (
      <p>
        Our services are intended for businesses and adults. We do not knowingly
        collect personal information from children under 18.
      </p>
    ),
  },
  {
    title: "9. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. The latest version
        will always be available on this page with the updated date shown at the
        top.
      </p>
    ),
  },
  {
    title: "10. Contact Us",
    body: (
      <>
        <p>
          If you have any questions about this Privacy Policy or how we handle
          your information, please contact us:
        </p>
        <ul>
          <li>
            Email:{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="text-primary hover:underline"
            >
              {EMAIL}
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href={`tel:${PHONE}`} className="text-primary hover:underline">
              {PHONE}
            </a>
          </li>
          <li>Address: {ADDRESS}</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="absolute inset-0 hero-grid" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="container-mx container-px relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Legal
              </span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Privacy <span className="gradient-text">Policy</span>
              </h1>
              <p className="mt-6 text-sm text-muted-foreground">
                Last updated: {LAST_UPDATED}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="container-mx container-px">
            <div className="mx-auto max-w-3xl">
              <p className="leading-relaxed text-muted-foreground">
                Unicorn Technologies respects your privacy. This policy explains
                what information we collect when you visit
                www.unicorntechnologiess.com, how we use it, and the choices you
                have.
              </p>

              <div className="mt-10 space-y-10">
                {sections.map((s) => (
                  <div key={s.title}>
                    <h2 className="text-xl font-semibold">{s.title}</h2>
                    <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
                      {s.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
