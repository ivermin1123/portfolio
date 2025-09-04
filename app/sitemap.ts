import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hoangle.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/experience`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/resume`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];
}
