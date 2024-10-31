'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import * as z from "zod"
import { MentorImageFormSchema } from "../schemas"

export const updateImageMentor = async (
  eventId: string,
  values: z.infer<typeof MentorImageFormSchema>
) => {
  const validateFields = MentorImageFormSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Datos invalidos" }
  }

  const session = await auth()
  if (!session) {
    return { error: "No hay sesion" }
  }

  const teacher = await db.teacher.findFirst({
    where: {
      userId: session.user.id
    }
  })

  if (!teacher) {
    return { error: "No eres profesor" }
  }

  await db.mentor.update({
    where: {
      id: eventId
    },
    data: {
      imageUrl: values.imageUrl
    }
  })

  return { success: true }
}