'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import * as z from "zod"
import { EventLocationSchema } from "../schemas"

export const updateLocationEvent = async (eventId: string, values: z.infer<typeof EventLocationSchema>) => {
  const validateFields = EventLocationSchema.safeParse(values)

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

  const urlRegex = /<iframe[^>]*src="([^"]+)"[^>]*>/;
  const match = values.location.match(urlRegex);

  let urlClean = ''

  if (match) {
    urlClean = match[1];
  }

  if (!urlClean) {
    return { error: "Url invalida" }
  }

  await db.event.update({
    where: {
      id: eventId
    },
    data: {
      location: urlClean
    }
  })

  return { success: true }
}