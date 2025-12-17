import { defineCollection, z } from "astro:content";

const regras = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const faq = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const evento = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const changelog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  regras,
  faq,
  evento,
  changelog,
};
