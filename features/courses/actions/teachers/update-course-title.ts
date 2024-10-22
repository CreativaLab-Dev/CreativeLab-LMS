'use server'

import { db } from "@/lib/db"
import * as z from "zod"
import { EditCourseTitleSchema } from "../../schemas"
import { auth } from "@/auth"

export const updateCourseTitle = async (courseId: string, values: z.infer<typeof EditCourseTitleSchema>) => {
  const validateFields = EditCourseTitleSchema.safeParse(values)

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
      name: values.title
    }
  })

  if (!course) {
    return { error: "Error al actualizar el curso" }
  }

  return { success: true }

}