import * as z from "zod"

export const ProfileSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es requerido"
  }),
  aboutMe: z.string(),
  age: z.string().min(1, {
    message: "La edad es requerida"
  }),
  image: z.string().optional()
})

