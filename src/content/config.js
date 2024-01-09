import { string } from "astro/zod";
import { defineCollection, z } from "astro:content";

const pagesCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      cover: image()
        .refine(img => img.width >= 1024, {
          message: "Cover image must be at least 1024 pixels wide!",
        })
        .optional(),
    }),
});

const teamCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      teamfoto: z.object({
        img: image().refine(img => img.width >= 700, {
          message: "Teamfoto image must be at least 700 pixels wide!",
        }),
        alt: z.string(),
      }),
      heading_members_highlighted: z.string(),
      heading_members_active: z.string(),
      heading_members_former: z.string(),
      member: z.array(
        z.object({
          name: z.string(),
          img: image()
            .refine(img => img.width >= 100, {
              message: "Member image must be at least 300 pixels wide!",
            })
            .optional(),
          mode: z
            .object({
              highlighted: z.boolean().optional(),
              former: z.boolean().optional(),
              archived: z.boolean().optional(),
            })
            .optional(),
          details: z
            .array(
              z.object({
                description: z
                  .union([z.string(), z.number()])
                  .nullable()
                  .optional(),
                detail: z.union([z.string(), z.number()]).nullable().optional(),
              })
            )
            .optional(),
        })
      ),
    }),
});

const projCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      title_l: z.string(),
      title_zzl: z.string().optional(),
      archived: z.boolean().optional(),
      widehigh: z.string().optional(),
      publishDate: z.string().transform(string => new Date(string)),
      category: z.string(),
      project_keys: z.object({
        status: z.string().optional(),
        year: z.number(),
        year2: z.number(),
        // year: z.string().transform(string => new Date(string)),
        // year2: z.string().transform(string => new Date(string)),
        area: z.number(),
        tags: z.array(z.string()),
      }),
      titleimg: z.object({
        img: image().refine(img => img.width >= 400, {
          message: "Cover image must be at least 1080 pixels wide!",
        }),
        alt: z.string(),
      }),

      fotos: z
        .array(
          z.object({
            foto: image().refine(img => img.width >= 400, {
              message: "Cover image must be at least 1080 pixels wide!",
            }),
            alt: z.string(),
          })
        )
        .optional(),

      plans: z
        .array(
          z.object({
            plan: image().refine(img => img.width >= 400, {
              message: "Cover image must be at least 1080 pixels wide!",
            }),
            alt: z.string(),
          })
        )
        .optional(),
    }),
});

export const collections = {
  projects: projCollection,
  team: teamCollection,
  pages: pagesCollection,
};
