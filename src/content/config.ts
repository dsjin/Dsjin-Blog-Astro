import { z } from 'zod'
import { defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured: z.boolean(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()),
    author: z.object({
      profileImage: z.string().optional(),
      name: z.string()
    }),
    createdDate: z.string()
  })
})

export const collections = {
  blog: blogCollection
}
