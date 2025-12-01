import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

export default defineConfig({
  adapter: vercel(),
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    mdx(),
  ],
  build: {
    format: "file",
  },
});
