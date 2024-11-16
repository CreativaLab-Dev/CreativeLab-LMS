'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getMembershipById = async (membershipId: string) => {
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

  const membership = await db.membership.findUnique({
    where: {
      id: membershipId,
    }
  })

  if (!membership) {
    return null
  }

  return membership
}

