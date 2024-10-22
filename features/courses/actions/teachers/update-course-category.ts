'use server'

import { db } from "@/lib/db"
import * as z from "zod"
import { EditCourseCategorySchema } from "../../schemas"
import { auth } from "@/auth"

export const updateCourseCategory = async (courseId: string, values: z.infer<typeof EditCourseCategorySchema>) => {
  const validateFields = EditCourseCategorySchema.safeParse(values)
  console.log(validateFields)

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
      categoryId: values.categoryId
    }
  })

  if (!course) {
    return { error: "Error al actualizar el curso" }
  }

  return { success: true }

}