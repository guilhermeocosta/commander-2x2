import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  eslintConfigPrettier,
  {
    files: ["**/*.astro"],
    rules: {
      // astro check already reports undefined names, and ESLint doesn't know
      // Astro's ambient types (e.g. ImageMetadata).
      "no-undef": "off",
      // Featured-deck cards on the home page are focusable groups: focusing
      // one (by Tab or by tapping on touch screens) reveals its overlay with
      // the "Ver deck" link. Allow tabindex on role="group" for that pattern.
      "astro/jsx-a11y/no-noninteractive-tabindex": ["error", { roles: ["group"] }],
    },
  },
  {
    ignores: ["dist/**/*", ".astro/**/*", "node_modules/**/*", ".vercel/**/*", "**/PostHog.astro"],
  },
];
