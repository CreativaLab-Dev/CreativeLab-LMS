import * as z from "zod"

export const NewEventSchema = z.object({
  name: z.string().min(2, {
    message: "Titulo es requerido"
  }),
})

export const EventTitleSchema = z.object({
  title: z.string().min(2, {
    message: "Titulo es requerido"
  }),
})

export const EventDescriptionSchema = z.object({
  description: z.string().min(2, {
    message: "Titulo es requerido"
  }),
})

export const EventImageSchema = z.object({
  imageUrl: z.string().min(2, {
    message: "Imagen es requerido"
  }).url({
    message: "Url invalida"
  }),
})

export const EventDateSchema = z.object({
  date: z.string().min(2, {
    message: "Titulo es requerido"
  }),
})