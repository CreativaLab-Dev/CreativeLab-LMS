'use server'

import { db } from "@/lib/db"
import * as z from "zod"
import { EditCourseIsNewSchema } from "../../schemas"
import { auth } from "@/auth"

export const updateCourseIsNew = async (courseId: string, values: z.infer<typeof EditCourseIsNewSchema>) => {
  const validateFields = EditCourseIsNewSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Datos invalidos" }
  }

  const session = await auth()
  if (!session) {
    return { error: "No autorizado" }
  }

  const course = await db.course.update({
    where: {
      id: courseId
    },
    data: {
      isNew: values.isNew
    }
  })

  if (!course) {
    return { error: "Error al actualizar el curso" }
  }

  return { success: true }

}