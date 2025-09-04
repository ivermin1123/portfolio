import { SITE } from "@/lib/seo";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role,
    description: SITE.tagline,
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    sameAs: [
      "https://linkedin.com/in/ivermin1123",
      "https://github.com/ivermin1123",
      "https://facebook.com/yivermin1123",
      "https://instagram.com/ivermin1123",
    ],
    knowsAbout: [
      "Frontend Development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Web Development",
      "UI/UX Design",
      "Responsive Design",
    ],
    alumniOf: "Software Engineering",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE.name} - Portfolio`,
    description: SITE.tagline,
    url: SITE.url,
    author: {
      "@type": "Person",
      name: SITE.name,
    },
    publisher: {
      "@type": "Person",
      name: SITE.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${SITE.name} - Portfolio`,
    url: SITE.url,
    logo: `${SITE.url}${SITE.ogImage}`,
    description: SITE.tagline,
    founder: {
      "@type": "Person",
      name: SITE.name,
    },
    sameAs: ["https://linkedin.com/in/ivermin1123", "https://github.com/ivermin1123"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
