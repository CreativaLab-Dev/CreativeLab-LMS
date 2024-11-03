'use server'

import { db } from "@/lib/db"

export const getResourcesPublished = async (userId: string) => {
  try {
    const student = await db.student.findFirst({
      where: {
        userId
      }
    })

    if (!student) {
      return []
    }

    const resources = await db.resource.findMany({
      where: {
        isPublished: true,
      }
    })

    return resources
  } catch (error) {
    console.log("[GET_RESOURCE_PUBLISHED_ERROR]", error)
    return []
  }
}

