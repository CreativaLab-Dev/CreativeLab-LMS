'use server'

import { db } from "@/lib/db"
import * as z from "zod"
import { EditCourseImageSchema } from "../../schemas"
import { auth } from "@/auth"

export const updateCourseImage = async (courseId: string, values: z.infer<typeof EditCourseImageSchema>) => {
  const validateFields = EditCourseImageSchema.safeParse(values)

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
      imagePath: values.image
    }
  })

  if (!course) {
    return { error: "Error al actualizar el curso" }
  }

  return { success: true }

}