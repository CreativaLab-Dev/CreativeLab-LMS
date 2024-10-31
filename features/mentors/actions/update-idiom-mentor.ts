"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const updateIdiomMentor = async (
  mentorId: string,
  idioms: string[]
) => {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { success: false, error: "Usuario no autenticado" }
    }

    const existingMentor = await db.mentor.findUnique({
      where: {
        id: mentorId
      }
    })

    if (!existingMentor) {
      return { success: false, error: "Mentor no encontrado" }
    }

    await db.mentor.update({
      where: {
        id: mentorId
      },
      data: {
        idioms
      }
    })
    return { success: true }

  } catch (error) {
    console.log("[UPDATE_IDIOM_MENTOR]", error)
    return { error: "Algo salió mal" }
  }
}