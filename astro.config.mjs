import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://commander2x2.org",
  adapter: vercel({
    imageService: true,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: "file",
  },
  image: {
    domains: ["cards.scryfall.io"],
  },
});
