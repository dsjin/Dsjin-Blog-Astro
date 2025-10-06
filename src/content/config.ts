import { z } from 'zod'
import { defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  schema: ({image}) => z.object({
    title: z.string(),
    description: z.string(),
    featured: z.boolean(),
    coverImage: image().optional(),
    tags: z.array(z.string()),
    author: z.object({
      profileImage: z.string().optional(),
      name: z.string()
    }),
    createdDate: z.date()
  })
})

export const collections = {
  blog: blogCollection
}
