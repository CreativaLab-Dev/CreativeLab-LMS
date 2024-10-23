'use server'

import { db } from "@/lib/db"
import { auth } from "@/auth"

export const deleteCourseAttachment = async (courseId: string, attachmentId: string) => {
  if (!courseId || !attachmentId) {
    return { error: "Datos invalidos" }
  }

  const session = await auth()
  if (!session) {
    return { error: "No autorizado" }
  }

  await db.attachment.delete({
    where: {
      id: attachmentId,
      courseId: courseId
    }
  })
  return { success: true }
}