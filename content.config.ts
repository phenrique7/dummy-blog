import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    article: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        date: z.string(),
        title: z.string(),
        category: z.string(),
        background: z.string(),
        description: z.string(),
        thumbnail: z.string().optional(),
      }),
    }),
  },
});
