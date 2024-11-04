'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import * as z from "zod"
import { EventExternalLinkSchema } from "../schemas"

export const updateExternalLinkEvent = async (eventId: string, values: z.infer<typeof EventExternalLinkSchema>) => {
  const validateFields = EventExternalLinkSchema.safeParse(values)

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
      externalLink: values.externalLink
    }
  })

  return { success: true }
}