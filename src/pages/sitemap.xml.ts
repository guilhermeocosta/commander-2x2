import type { APIRoute } from "astro";
import { banlistData, decksData, eventsData, leaderboardData } from "../data";

type ChangeFreq = "daily" | "weekly" | "monthly";

interface RouteMeta {
  changefreq: ChangeFreq;
  priority: number;
  /** Last content change, from the backing data file's `updatedAt`. */
  lastmod?: string;
}

// Every .astro page becomes a sitemap entry automatically. This map only
// tunes the hints; routes missing from it get the defaults below.
const routeMeta: Record<string, Partial<RouteMeta>> = {
  "/": { changefreq: "weekly", priority: 1.0 },
  "/regras": { changefreq: "monthly", priority: 0.9 },
  "/banlist": { changefreq: "weekly", priority: 0.9, lastmod: banlistData.updatedAt },
  "/eventos": { changefreq: "weekly", priority: 0.8, lastmod: eventsData.updatedAt },
  "/hall-da-fama": { changefreq: "weekly", priority: 0.8, lastmod: leaderboardData.updatedAt },
  "/faq": { changefreq: "monthly", priority: 0.7 },
  "/decks": { changefreq: "weekly", priority: 0.7, lastmod: decksData.updatedAt },
  "/changelog": { changefreq: "monthly", priority: 0.5 },
};

const defaults: RouteMeta = { changefreq: "monthly", priority: 0.5 };

const routes = Object.keys(import.meta.glob("./*.astro"))
  .map((file) => file.replace(/^\.\//, "/").replace(/\.astro$/, ""))
  .filter((route) => route !== "/404")
  .map((route) => (route === "/index" ? "/" : route))
  .sort();

export const GET: APIRoute = ({ site }) => {
  const urls = routes.map((route) => {
    const { changefreq, priority, lastmod } = { ...defaults, ...routeMeta[route] };
    return [
      "  <url>",
      `    <loc>${new URL(route, site).href}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority.toFixed(1)}</priority>`,
      "  </url>",
    ].join("\n");
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
