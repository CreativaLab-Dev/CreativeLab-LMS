'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import * as z from "zod"
import { EventTimeSchema } from "../schemas"

export const updateTimeEvent = async (eventId: string, values: z.infer<typeof EventTimeSchema>) => {
  const validateFields = EventTimeSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Datos invalidos" }
  }

  const session = await auth()
  if (!session) {
    return { error: "No hay sesion" }
  }

  const teacher = await db.teacher.findFirst({
    where: {
      userId: session.user.id
    }
  })

  if (!teacher) {
    return { error: "No eres profesor" }
  }

  const event = await db.event.findFirst({
    where: {
      id: eventId
    }
  })

  if (!event) {
    return { error: "Evento no encontrado" }
  }

  // Extraer fecha del evento
  const eventDate = new Date(event.date ?? "")
  if (isNaN(eventDate.getTime())) {
    return { error: "Fecha inválida en el evento" }
  }

  // Extraer hora y minutos del input `values.time`
  const [hours, minutes] = values.time.split(":").map(Number)

  // Crear nueva fecha combinada
  const newDate = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate(),
    hours,
    minutes
  )

  console.log(newDate)

  await db.event.update({
    where: {
      id: eventId
    },
    data: {
      date: newDate
    }
  })

  return { success: true }
}