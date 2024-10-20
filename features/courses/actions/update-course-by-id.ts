'use server'

import * as z from "zod"
import { auth } from "@/auth"
import { db } from "@/lib/db"

import { NewCourseSchema } from "../schemas"

export const UpdateCourseById = async (courseId: string, values: z.infer<typeof NewCourseSchema>) => {
  const validateFields = NewCourseSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Datos invalidos" }
  }

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
    return { error: "El actual usuario no es profesor" }
  }

  const courseUpdated = await db.course.update({
    where: {
      id: courseId,
    },
    data: {
      name: values.name,
      description: values.description,
      imagePath: values.imagePath || '',
      isFeatured: values.isFeatured,
      isNew: values.isNew,
      teacherId: teacher.id
    }
  })

  if (!courseUpdated) {
    return { error: "Error al editar el curso" }
  }

  return { success: true }
}