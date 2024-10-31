'use server'

import * as z from "zod"
import { NewEventSchema } from "../schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const createEvent = async (values: z.infer<typeof NewEventSchema>) => {
  const validateFields = NewEventSchema.safeParse(values)

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

  const newEvent = await db.event.create({
    data: {
      title: values.name,
    }
  })

  if (!newEvent) {
    return { error: "Error al crear el evento" }
  }

  return { success: true, id: newEvent.id }
}