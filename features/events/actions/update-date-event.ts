'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import * as z from "zod"
import { EventDateSchema } from "../schemas"

export const updateDateEvent = async (eventId: string, values: z.infer<typeof EventDateSchema>) => {
  const validateFields = EventDateSchema.safeParse(values)

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

  await db.event.update({
    where: {
      id: eventId
    },
    data: {
      date: values.date
    }
  })

  return { success: true }
}