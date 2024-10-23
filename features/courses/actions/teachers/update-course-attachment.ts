'use server'

import { db } from "@/lib/db"
import * as z from "zod"
import { EditCourseAttachmentSchema } from "../../schemas"
import { auth } from "@/auth"

export const updateCourseAttachment = async (courseId: string, values: z.infer<typeof EditCourseAttachmentSchema>) => {
  const validateFields = EditCourseAttachmentSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Datos invalidos" }
  }

  const session = await auth()
  if (!session) {
    return { error: "No autorizado" }
  }

  const { url } = validateFields.data

  const name = url.split('/').pop() ?? 'without-name-xd'

  const course = await db.attachment.create({
    data: {
      name,
      courseId,
      url,
    }
  })

  if (!course) {
    return { error: "Error al actualizar el curso" }
  }

  return { success: true }

}