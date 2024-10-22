'use server'

import { db } from "@/lib/db"
import * as z from "zod"
import { EditCourseDescriptionSchema } from "../../schemas"
import { auth } from "@/auth"

export const updateCourseDescription = async (courseId: string, values: z.infer<typeof EditCourseDescriptionSchema>) => {
  const validateFields = EditCourseDescriptionSchema.safeParse(values)

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
      description: values.description
    }
  })

  if (!course) {
    return { error: "Error al actualizar el curso" }
  }

  return { success: true }

}