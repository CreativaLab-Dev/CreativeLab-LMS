'use server'

import { db } from "@/lib/db"

export const getResourcesPublished = async (userId: string) => {
  try {
    const teacher = await db.teacher.findFirst({
      where: {
        userId
      }
    })

    if (!teacher) {
      return []
    }

    const resources = await db.resource.findMany({
      where: {
        isPublished: true,
      }
    })

    return resources
  } catch (error) {
    console.log("[GET_RESOURCE_OF_TEACHER_ERROR]", error)
    return []
  }
}

