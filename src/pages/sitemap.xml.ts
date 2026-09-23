import type { APIRoute } from "astro";
import { banlistData, decksData, eventsData, leaderboardData } from "../data";

// Every .astro page becomes a sitemap entry automatically. Pages backed by a
// data file also get its `updatedAt` as `lastmod`.
const lastmod: Record<string, string> = {
  "/banlist": banlistData.updatedAt,
  "/eventos": eventsData.updatedAt,
  "/hall-da-fama": leaderboardData.updatedAt,
  "/decks": decksData.updatedAt,
};

const routes = Object.keys(import.meta.glob("./*.astro"))
  .map((file) => file.replace(/^\.\//, "/").replace(/\.astro$/, ""))
  .filter((route) => route !== "/404")
  .map((route) => (route === "/index" ? "/" : route))
  .sort();

export const GET: APIRoute = ({ site }) => {
  const urls = routes.map((route) =>
    [
      "  <url>",
      `    <loc>${new URL(route, site).href}</loc>`,
      ...(lastmod[route] ? [`    <lastmod>${lastmod[route]}</lastmod>`] : []),
      "  </url>",
    ].join("\n")
  );

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`);
};
