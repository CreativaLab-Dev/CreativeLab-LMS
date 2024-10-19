'use server'

import * as z from "zod"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values)
  if (!validateFields.success) {
    return { error: "Credenciales invalidas" }
  }
  const { email, password, name } = validateFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await db.user.findUnique({
    where: {
      email,
    }
  })

  if (existingUser) {
    return { error: "Este correo ya esta siendo usado" }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })

  await signIn("credentials", {
    email,
    password,
    redirectTo: DEFAULT_LOGIN_REDIRECT
  })

  //Todo verification token

  return { success: 'Usuario agregado correctamente' }
}