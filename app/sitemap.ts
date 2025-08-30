
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://example.com/", changeFrequency: "monthly", priority: 1.0 },
    { url: "https://example.com/about", changeFrequency: "yearly", priority: 0.7 },
    { url: "https://example.com/experience", changeFrequency: "yearly", priority: 0.7 },
    { url: "https://example.com/resume", changeFrequency: "yearly", priority: 0.8 },
    { url: "https://example.com/contact", changeFrequency: "yearly", priority: 0.6 }
  ];
}
