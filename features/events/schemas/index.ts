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
  date: z.date().nullable(),
})

export const EventTimeSchema = z.object({
  time: z.string().min(2, {
    message: "Hora es requerido"
  }),
})

export const EventTypeSchema = z.object({
  type: z.string().min(2, {
    message: "Tipo es requerido"
  }),
})

export const EventLinkSchema = z.object({
  link: z.string().min(2, {
    message: "Titulo es requerido"
  }).url({
    message: "Url invalida"
  }),
})

export const EventLocationSchema = z.object({
  location: z.string().min(2, {
    message: "Titulo es requerido"
  })
})


export const EventOrganizerSchema = z.object({
  organizer: z.string().min(2, {
    message: "Titulo es requerido"
  }),
})