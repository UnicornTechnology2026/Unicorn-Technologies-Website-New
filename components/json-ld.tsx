import {
  Organization,
  WebSite,
  ProfessionalService,
} from "@/lib/structured-data";

// Emits a single JSON-LD script using @graph so Organization, WebSite and
// LocalBusiness/ProfessionalService are linked entities under one
// "@context" (previous version output a bare array with no @context,
// which most validators/Google treat as invalid structured data).
export function JSONLD() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [Organization, WebSite, ProfessionalService],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// For use on individual pages: renders any schema object(s) as their own
// JSON-LD script tag(s). Pass the output of buildFAQSchema /
// buildBreadcrumbSchema from lib/structured-data.ts.
export function PageJSONLD({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
