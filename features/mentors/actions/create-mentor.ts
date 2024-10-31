'use server'

import * as z from "zod"
import { NewMentorFormSchema } from "../schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const createMentor = async (values: z.infer<typeof NewMentorFormSchema>) => {
  const validateFields = NewMentorFormSchema.safeParse(values)

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

  const newMentor = await db.mentor.create({
    data: {
      name: values.name,
    }
  })

  if (!newMentor) {
    return { error: "Error al crear el evento" }
  }

  return { success: true, id: newMentor.id }
}