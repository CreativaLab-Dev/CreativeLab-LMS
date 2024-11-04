'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getEventsNewPublished = async () => {
  const session = await auth()
  if (!session) {
    return []
  }

  const events = await db.event.findMany({
    where: {
      isPublished: true,
      date: {
        gte: new Date()
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  return events
}

