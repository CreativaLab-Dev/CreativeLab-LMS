import * as z from "zod"

export const chapterTitleSchema = z.object({
  title: z.string().min(2, {
    message: "Nombre es requerido"
  }),
})

export const chapterDescriptionSchema = z.object({
  description: z.string().min(1),
})

export const chapterAccessSchema = z.object({
  isFree: z.boolean().default(false),
})

export const chapterVideoSchema = z.object({
  videoUrl: z.string()
})

export const chapterYoutubeSchema = z.object({
  youtubeUrl: z.string().url()
})