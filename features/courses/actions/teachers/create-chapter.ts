'use server'

import * as z from "zod"
import { EditCourseChapterSchema } from "../../schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const createChapter = async (courseId: string, values: z.infer<typeof EditCourseChapterSchema>) => {
  const validateFields = EditCourseChapterSchema.safeParse(values)

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

  const lastModule = await db.module.findFirst({
    where: {
      courseId,
    },
    orderBy: {
      position: 'desc'
    }
  })

  const newPosition = lastModule ? lastModule.position + 1 : 0

  const newModule = await db.module.create({
    data: {
      title: values.title,
      description: '',
      position: newPosition,
      courseId,
    }
  })

  if (!newModule) {
    return { error: "Error al crear el curso" }
  }

  return { success: true, id: newModule.id }
}