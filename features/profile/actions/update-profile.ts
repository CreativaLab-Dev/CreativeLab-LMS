'use server'

import * as z from "zod"
import { ProfileSchema } from "../schemas"
import { db } from "@/lib/db"
import { auth } from "@/auth"

export const updateProfile = async (values: z.infer<typeof ProfileSchema>) => {
  const validateFields = ProfileSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Datos invalidos" }
  }

  const { name, aboutMe, age, image } = validateFields.data

  const session = await auth()
  if (!session) {
    return { error: "Usuario no autenticado" }
  }

  const userId = session.user.id
  if (!userId) {
    return { error: "Usuario no encontrado" }
  }

  await db.user.update({
    where: { id: userId },
    data: {
      name,
      aboutMe,
      age: Number(age),
      image: image
    }
  })

  return { success: true }
}