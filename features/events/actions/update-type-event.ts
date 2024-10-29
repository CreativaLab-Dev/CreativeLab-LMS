'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import * as z from "zod"
import { EventTypeSchema } from "../schemas"
import { EventType } from "@prisma/client"

export const updateTypeEvent = async (eventId: string, values: z.infer<typeof EventTypeSchema>) => {
  const validateFields = EventTypeSchema.safeParse(values)

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

  const event = await db.event.update({
    where: {
      id: eventId
    },
    data: {
      type: values.type as EventType
    }
  })

  return { success: true }
}