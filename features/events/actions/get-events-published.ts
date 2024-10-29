'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getEventsPublished = async () => {
  const session = await auth()
  if (!session) {
    return []
  }

  const events = await db.event.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  return events
}

