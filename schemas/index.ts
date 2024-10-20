import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "El email no es valido"
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida"
  })
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "El email no es valido"
  }),
  password: z.string().min(6, {
    message: "Minimo 6 caracteres"
  }),
  name: z.string().min(1, {
    message: "El nombre es requerido"
  }),
  role: z.enum(["student", "teacher"], {
    message: "El rol es requerido"
  })
})