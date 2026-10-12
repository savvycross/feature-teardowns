import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const teardowns = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teardowns' }),
  schema: z.object({
    title: z.string(),
    app: z.string(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    readTime: z.number(), // minutes
    summary: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { teardowns };
