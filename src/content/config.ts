// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Ben Medcalf'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  })
});

export const collections = {
  blog
};

