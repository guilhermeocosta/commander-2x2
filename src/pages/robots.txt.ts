import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${site?.origin}/sitemap.xml

# Block common non-content paths
Disallow: /_astro/
Disallow: /api/
Disallow: /.well-known/

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

# Crawl delay for respectful crawling
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
