'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const updatePublishEvent = async (eventId: string, isPublished: boolean) => {
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
      isPublished: !isPublished
    }
  })

  return { success: true }
}