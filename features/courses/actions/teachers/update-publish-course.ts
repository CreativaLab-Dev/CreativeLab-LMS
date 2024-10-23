'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const updatePublishCourse = async (
  courseId: string,
) => {
  const session = await auth()
  if (!session) return { error: 'No autorizado' }

  const course = await db.course.findFirst({
    where: {
      id: courseId
    }
  })

  if (!course) {
    return { error: "No existe este el curso" }
  }

  await db.course.update({
    where: {
      id: courseId,
    },
    data: {
      isPublished: !course.isPublished
    }
  })
  return { success: true }
}