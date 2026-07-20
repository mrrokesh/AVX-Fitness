import { siteConfig } from "@/data/site";
import { faqs } from "@/data/content";

export function JsonLd() {
  const localBusiness: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    description: siteConfig.seo.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.mapsLat,
      longitude: siteConfig.mapsLng,
    },
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    sameAs: [siteConfig.instagramUrl, siteConfig.founderInstagramUrl].filter(Boolean),
    areaServed: `${siteConfig.city}, ${siteConfig.state}`,
  };

  if (siteConfig.phone) localBusiness.telephone = siteConfig.phone;
  if (siteConfig.email) localBusiness.email = siteConfig.email;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
