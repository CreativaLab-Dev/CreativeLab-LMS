import * as z from "zod"

export const chapterTitleSchema = z.object({
  title: z.string().min(2, {
    message: "Nombre es requerido"
  }),
})