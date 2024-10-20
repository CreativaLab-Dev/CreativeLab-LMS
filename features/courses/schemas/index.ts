import * as z from "zod"

export const NewCourseSchema = z.object({
  name: z.string().min(1, {
    message: "Nombre es requerido"
  }),
  description: z.string().min(1, {
    message: "Descripcion es requerida"
  }),
  imagePath: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
})

