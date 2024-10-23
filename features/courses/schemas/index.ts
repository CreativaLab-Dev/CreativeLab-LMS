import * as z from "zod"

export const NewCourseSchema = z.object({
  name: z.string().min(2, {
    message: "Nombre es requerido"
  }),
})

export const EditCourseTitleSchema = z.object({
  title: z.string().min(2, {
    message: "Nombre es requerido"
  }),
})

export const EditCourseDescriptionSchema = z.object({
  description: z.string().min(2, {
    message: "Nombre es requerido"
  }),
})

export const EditCourseImageSchema = z.object({
  image: z.string().min(2, {
    message: "Nombre es requerido"
  }),
})

export const EditCourseCategorySchema = z.object({
  categoryId: z.string().min(2, {
    message: "Categoria es requerida"
  }),
})

export const EditCourseAttachmentSchema = z.object({
  url: z.string().min(2, {
    message: "Url es requerida"
  }),
})