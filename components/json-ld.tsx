import { Organization, WebSite, ProfessionalService } from '@/lib/structured-data';

export function JSONLD() {
  const data = [Organization, WebSite, ProfessionalService];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
