/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://hoangle.xyz",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/admin/*", "/private/*", "/_next/*", "/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://hoangle.xyz"}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority and change frequency based on path
    let priority = 0.7;
    let changeFrequency = "monthly";

    if (path === "/") {
      priority = 1.0;
      changeFrequency = "monthly";
    } else if (path === "/resume") {
      priority = 0.9;
      changeFrequency = "yearly";
    } else if (path === "/work") {
      priority = 0.9;
      changeFrequency = "monthly";
    } else if (path === "/about" || path === "/experience") {
      priority = 0.8;
      changeFrequency = "yearly";
    } else if (path === "/projects") {
      priority = 0.8;
      changeFrequency = "monthly";
    } else if (path.startsWith("/projects/")) {
      priority = 0.7;
      changeFrequency = "monthly";
    } else if (path === "/blog") {
      priority = 0.6;
      changeFrequency = "weekly";
    } else if (path === "/contact") {
      priority = 0.7;
      changeFrequency = "yearly";
    }

    return {
      loc: path,
      changefreq: changeFrequency,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async _config => {
    // Import projects dynamically to avoid build issues
    const { projects } = await import("./lib/projects.ts");

    return projects.map(project => ({
      loc: `/projects/${project.slug}`,
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
};
