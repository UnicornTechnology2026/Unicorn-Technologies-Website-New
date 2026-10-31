"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSettings } from "./settings-provider";

const LAST_UPDATED = "31 October 2026";

export default function PrivacyPolicyDialog() {
  const { settings } = useSettings();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="hover:text-primary">
          Privacy Policy
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-6 pb-4 pt-6 text-left">
          <DialogTitle className="text-2xl">Privacy Policy</DialogTitle>
          <DialogDescription>Last updated: {LAST_UPDATED}</DialogDescription>
        </DialogHeader>

        <div className="max-h-[calc(85vh-110px)] space-y-6 overflow-y-auto px-6 pb-6 text-sm leading-relaxed text-muted-foreground [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          <p>
            {settings.company_name} respects your privacy. This policy explains
            what information we collect when you visit our website, how we use
            it, and the choices you have.
          </p>

          <section>
            <h3>1. Information We Collect</h3>
            <p>
              When you submit an enquiry through our contact form, we collect
              the details you provide: your name, company (optional), email,
              phone number (optional), the service you are interested in, your
              budget (optional), and your message. We also collect limited
              technical information automatically, such as browser type, device,
              pages visited, and approximate location, through cookies and
              analytics tools.
            </p>
          </section>

          <section>
            <h3>2. How We Use Your Information</h3>
            <ul>
              <li>
                Respond to your enquiries and provide quotes or consultations.
              </li>
              <li>Deliver, maintain, and improve our services and website.</li>
              <li>Understand how visitors use our website.</li>
              <li>
                Communicate with you about projects or support you asked for.
              </li>
              <li>
                Send marketing emails or WhatsApp messages, only if you agreed
                to them separately.
              </li>
              <li>Meet legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h3>3. Cookies, Analytics and Advertising</h3>
            <p>
              When you first visit, we ask for your choice. Optional cookies are
              not loaded until you agree, and you can change your choice at any
              time using the "Cookie settings" link in the footer.
            </p>
            <ul className="mt-2">
              <li>
                <strong>Strictly necessary:</strong> storage needed for the
                website and admin login to work. These do not need consent.
              </li>
              <li>
                <strong>Google Analytics (Google LLC), analytics:</strong>{" "}
                measures visits and page usage so we can improve the website. It
                may collect your IP address, device and browser details, and
                pages viewed. Loaded only if you accept analytics.
              </li>
              <li>
                <strong>Google AdSense (Google LLC), advertising:</strong>{" "}
                allows Google to show and measure ads and may set advertising
                cookies. Loaded only if you accept advertising.
              </li>
            </ul>
            <p className="mt-2">
              If you withdraw consent, we stop loading these tools and remove
              the cookies we can access. We currently use no other advertising
              pixels or chat widgets; if we add any, we will list them here and
              ask for your consent first.
            </p>
          </section>

          <section>
            <h3>4. Sharing of Information</h3>
            <p>
              We do not sell or rent your personal information. We share it only
              with trusted service providers that help us run the website (such
              as hosting, database, and analytics providers), and with
              authorities where required by law.
            </p>
          </section>

          <section>
            <h3>5. Data Security and Retention</h3>
            <p>
              We use reasonable measures to protect your information from
              unauthorised access, loss, or misuse. No method of transmission
              over the internet is completely secure. We keep your information
              only as long as needed for the purposes above or as required by
              law.
            </p>
          </section>

          <section>
            <h3>6. Your Rights and Complaints</h3>
            <p>
              You may request access to, correction of, or deletion of your
              personal information, or withdraw your consent, at any time.
              Marketing messages are sent only if you ticked the optional boxes
              on our forms, and every message contains a link to withdraw. You
              can also use our{" "}
              <a href="/grievance" className="text-primary hover:underline">
                Grievance Redressal page
              </a>{" "}
              to contact our Grievance Officer or raise a complaint. You will
              get a ticket number, we acknowledge complaints within 48 hours,
              and complaints about personal data are answered no later than 90
              days.
            </p>
          </section>

          <section>
            <h3>7. Third-Party Links &amp; Children</h3>
            <p>
              Our website may link to third-party sites whose privacy practices
              we do not control. Our services are intended for businesses and
              adults; we do not knowingly collect information from children
              under 18.
            </p>
          </section>

          <section>
            <h3>8. Changes to This Policy</h3>
            <p>
              We may update this policy from time to time. The latest version
              will always be available here with the updated date shown.
            </p>
          </section>

          <section>
            <h3>9. Contact Us</h3>
            <ul>
              {settings.email && (
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-primary hover:underline"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.phone && (
                <li>
                  Phone:{" "}
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-primary hover:underline"
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings.address && <li>Address: {settings.address}</li>}
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
