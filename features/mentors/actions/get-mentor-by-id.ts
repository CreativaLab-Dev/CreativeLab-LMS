'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getMentorById = async (mentorId: string) => {
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

  const mentor = await db.mentor.findFirst({
    where: {
      id: mentorId,
    }
  })

  if (!mentor) {
    return null
  }

  return mentor
}

