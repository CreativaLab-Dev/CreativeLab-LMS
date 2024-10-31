import * as z from 'zod'

export const NewMentorFormSchema = z.object({
  name: z.string().min(3,
    'El nombre debe tener al menos 3 caracteres'),
})

export const MentorNameFormSchema = z.object({
  name: z.string().min(3,
    'El nombre debe tener al menos 3 caracteres'),
})

export const MentorAboutMeFormSchema = z.object({
  aboutMe: z.string().min(3,
    'El campo debe tener al menos 3 caracteres'),
})

export const MentorImageFormSchema = z.object({
  imageUrl: z.string()
    .url('La URL de la imagen no es válida')
})