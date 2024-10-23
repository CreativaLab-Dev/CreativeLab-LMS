'use server'

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const updateChapters = async (
  courseId: string,
  updateData: { id: string, position: number }[]
) => {
  const session = await auth()
  if (!session?.user) {
    return { error: "Usuario no autenticado" }
  }

  const teacher = await db.teacher.findFirst({
    where: {
      userId: session.user.id
    }
  })

  if (!teacher) {
    return { error: "Usuario no autorizado" }
  }

  const ownCourse = await db.course.findUnique({
    where: {
      id: courseId,
      teacherId: teacher.id
    }
  })

  if (!ownCourse) {
    return { error: "Curso no encontrado" }
  }
  await db.$transaction(async (tx) => {
    for (let item of updateData) {
      await tx.chapter.update({
        where: {
          id: item.id
        },
        data: {
          position: item.position
        }
      })
    }
  })

  return { success: true }
}