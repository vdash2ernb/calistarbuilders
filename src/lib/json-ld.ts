import { company } from "@/content/company";
import { services } from "@/content/services";

// Escape "<" so the payload can't close the surrounding <script> tag.
function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  return serialize({
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.name,
    url: company.url,
    logo: `${company.url}/brand/calistar-logo.png`,
    image: `${company.url}/brand/calistar-logo.png`,
    telephone: "+1-714-613-2500",
    email: company.email,
    areaServed: { "@type": "State", name: "California" },
    ...(company.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressRegion: company.address.region,
        postalCode: company.address.postalCode,
        addressCountry: "US",
      },
    }),
    ...(company.social.length > 0 && { sameAs: company.social.map((s) => s.href) }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction management services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${company.url}/services/${s.slug}/` },
      })),
    },
  });
}
