'use server'

import * as z from "zod"
import { NewCourseSchema } from "../../schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const AddNewCourseOfTeacher = async (values: z.infer<typeof NewCourseSchema>) => {
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

  const newCourse = await db.course.create({
    data: {
      name: values.name,
      description: values.description,
      imagePath: values.imagePath || '',
      isFeatured: values.isFeatured,
      isNew: values.isNew,
      teacherId: teacher.id
    }
  })

  if (!newCourse) {
    return { error: "Error al crear el curso" }
  }

  return { success: true, id: newCourse.id }
}