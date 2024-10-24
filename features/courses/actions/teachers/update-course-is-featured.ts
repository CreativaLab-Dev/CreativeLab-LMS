'use server'

import { db } from "@/lib/db"
import * as z from "zod"
import { EditCourseIsFeaturedSchema } from "../../schemas"
import { auth } from "@/auth"

export const updateCourseIsFeatured = async (courseId: string, values: z.infer<typeof EditCourseIsFeaturedSchema>) => {
  const validateFields = EditCourseIsFeaturedSchema.safeParse(values)

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
      isFeatured: values.isFeatured
    }
  })

  if (!course) {
    return { error: "Error al actualizar el curso" }
  }

  return { success: true }

}