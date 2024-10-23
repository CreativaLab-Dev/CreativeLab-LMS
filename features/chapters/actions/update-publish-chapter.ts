'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const updatePublishChapter = async (
  courseId: string,
  chapterId: string,
) => {
  const session = await auth()
  if (!session) return { error: 'No autorizado' }

  const chapter = await db.chapter.findFirst({
    where: {
      id: chapterId
    }
  })

  if (!chapter) {
    return { error: "No existe este capitulo" }
  }

  await db.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      isPublished: !chapter.isPublished
    }
  })
  return { success: true }
}