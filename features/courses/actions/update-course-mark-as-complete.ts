'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const updateCourseMarkAsComplete = async (
  courseId: string,
  chapterId: string,
  isCompleted: boolean
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

  const student = await db.student.findFirst({
    where: {
      userId: session.user.id
    }
  })

  if (!student) {
    return { error: "No existe este estudiante" }
  }

  const studentCourse = await db.studentCourse.findFirst({
    where: {
      courseId: courseId,
      studentId: student.id
    }
  })

  if (!studentCourse) {
    await db.studentCourse.create({
      data: {
        courseId: courseId,
        studentId: student.id
      }
    })
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
      isCompleted: !isCompleted
    },
    update: {
      isCompleted: !isCompleted
    }
  })

  return { success: true }
}