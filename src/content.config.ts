import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  // Type-check frontmatter using a schema
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
    }),
});

const services = defineCollection({
  // Load Markdown files in the `src/content/services/` directory.
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/services",
  }),
  schema: ({ image }) =>
    z.object({
      heading: z.string(),
      image: image(),
      order: z.number(),
    }),
});

const tabs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/tabs" }),
  schema: ({}) =>
    z.object({
      title: z.string(),
    }),
});

const lists = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/lists",
  }),
  schema: ({}) =>
    z.object({
      heading: z.string(),
      group: z.string(),
      order: z.number().optional(),
    }),
});

export const collections = { blog, services, tabs, lists };
