import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        Response: "readonly",
        Request: "readonly",
        fetch: "readonly",
        URLSearchParams: "readonly",
        URL: "readonly",
        console: "readonly",
        document: "readonly",
        window: "readonly",
        HTMLInputElement: "readonly",
        Element: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      // Kept as a warning to match the pre-flat-config-migration policy;
      // tseslint's recommended set raises this to "error".
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      globals: {
        posthog: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      // Same "warn" policy as .ts/.tsx above (tseslint recommended sets "error").
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    ignores: ["dist/**/*", ".astro/**/*", "node_modules/**/*", ".vercel/**/*", "**/PostHog.astro"],
  },
];
