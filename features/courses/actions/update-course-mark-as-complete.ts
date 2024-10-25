'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const updateCourseMarkAsComplete = async (
  courseId: string,
  chapterId: string
) => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) return { error: 'No autorizado' }

  const course = await db.course.findFirst({
    where: {
      id: courseId
    }
  })

  if (!course) {
    return { error: "No existe este el curso" }
  }

  const chapter = await db.chapter.findFirst({
    where: {
      id: chapterId
    }
  })

  if (!chapter) {
    return { error: "No existe este capítulo" }
  }

  await db.userProgress.upsert({
    where: {
      userId_chapterId: {
        userId: session.user.id,
        chapterId: chapterId
      }
    },
    create: {
      userId: session.user.id,
      chapterId: chapterId,
      isCompleted: true
    },
    update: {
      isCompleted: true
    }
  })

  return { success: true }
}