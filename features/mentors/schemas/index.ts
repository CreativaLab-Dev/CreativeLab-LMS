import * as z from 'zod'

export const NewMentorFormSchema = z.object({
  name: z.string().min(3,
    'El nombre debe tener al menos 3 caracteres'),
})

export const MentorNameFormSchema = z.object({
  name: z.string().min(3,
    'El nombre debe tener al menos 3 caracteres'),
})

export const MentorRoleFormSchema = z.object({
  role: z.string().min(3,
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

export const MentorSocialNetworksFormSchema = z.object({
  linkedinUrl: z.string(),
  twitterUrl: z.string(),
})

export const MentorSpecialityFormSchema = z.object({
  speciality: z.string().min(3,
    'La especialidad debe tener al menos 3 caracteres'),
})

export const MentorIndustryFormSchema = z.object({
  industry: z.string().min(3,
    'La industria debe tener al menos 3 caracteres'),
})

export const MentorIdiomFormSchema = z.object({
  idiom: z.string().min(3,
    'El idioma debe tener al menos 3 caracteres'),
})

export const MentorEmailFormSchema = z.object({
  email: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .email('El email no es válido')
})

export const MentorExternalLinkFormSchema = z.object({
  externalLink: z.string().min(3,
    'El nombre debe tener al menos 3 caracteres'),
})