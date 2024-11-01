'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getMentorsPublished = async () => {
  const session = await auth()
  if (!session) {
    return []
  }

  const mentors = await db.mentor.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  return mentors
}

