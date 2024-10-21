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
  isPremium: z.boolean().optional(),
  modulos: z.array(z.object({
    title: z.string().min(1, {
      message: "Nombre es requerido"
    }),
    description: z.string().min(1, {
      message: "Descripcion es requerida"
    }),
    lessons: z.array(z.object({
      title: z.string().min(1, {
        message: "Nombre es requerido"
      }),
      description: z.string().min(1, {
        message: "Descripcion es requerida"
      }),
      content: z.string().optional(),
      videoPath: z.string().min(1, {
        message: "Video es requerido"
      }),
      duration: z.number().min(1, {
        message: "Duracion es requerida"
      }),
      isFree: z.boolean().optional(),
    }))
  }))
})

