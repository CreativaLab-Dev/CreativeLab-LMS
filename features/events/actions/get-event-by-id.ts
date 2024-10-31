'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getEventById = async (eventId: string) => {
  const session = await auth()
  if (!session) {
    return null
  }

  const teacher = await db.teacher.findFirst({
    where: {
      userId: session.user.id
    }
  })

  if (!teacher) {
    return null
  }

  const event = await db.event.findFirst({
    where: {
      id: eventId,
    }
  })

  if (!event) {
    return null
  }

  return event
}

