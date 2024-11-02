'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getResourceById = async (resourceId: string) => {
  try {
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

    const resource = await db.resource.findUnique({
      where: {
        id: resourceId,
      }
    })

    if (!resource) {
      return null
    }

    return resource
  } catch (error) {
    console.log("[GET_RESOURCE_BY_ID_ERROR]", error)
    return null
  }
}

