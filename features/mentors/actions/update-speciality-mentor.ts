"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const updateSpecialityMentor = async (
  mentorId: string,
  specialities: string[]
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
        specialty: specialities
      }
    })
    return { success: true }

  } catch (error) {
    console.log("[UPDATE_NAME_MENTOR]", error)
    return { error: "Algo salió mal" }
  }
}