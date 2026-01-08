import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

export default defineConfig({
  adapter: vercel({
    imageService: true,
  }),
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: "file",
  },
});
