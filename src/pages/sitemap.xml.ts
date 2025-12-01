import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const pages = [
    {
      url: "/",
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      url: "/regras",
      changefreq: "monthly",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      url: "/banlist",
      changefreq: "weekly",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      url: "/faq",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      url: "/eventos",
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      url: "/decks",
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${site?.origin}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
