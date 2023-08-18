import { defineCollection, z } from "astro:content";

const projCollection = defineCollection({

  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    title_l: z.string(),
    title_zzl: z.string().optional(),
    archived: z.string().optional(),
    widehigh: z.string().optional(),
    publishDate: z.string().transform((string) => new Date(string)),
    category: z.string(),
    project_keys: z.object({
      status: z.string().optional(),
      year: z.string().transform((string) => new Date(string)),
      year2: z.string().transform((string) => new Date(string)),
      area: z.string(),
      tags: z.array(z.string()),
    }),
    titleimg: z.object({
      img: image().refine((img)  => img.width >= 400, {
        message: "Cover image must be at least 1080 pixels wide!"
      }),
      alt: z.string(),
    }),

    fotos: z.array(z.object({
      foto: image().refine((img)  => img.width >= 400, {
        message: "Cover image must be at least 1080 pixels wide!"
      }),
      alt: z.string(),
    })),

    plans: z.array(z.object({
      plan: image().refine((img)  => img.width >= 400, {
        message: "Cover image must be at least 1080 pixels wide!"
      }),
      alt: z.string(),
    })).optional(),
  })
})


export const collections = {
  projects: projCollection,
};

