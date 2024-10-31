'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const updatePublishMentor = async (
  mentorId: string,
  isPublished: boolean
) => {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { error: "Usuario no autenticado" }
    }
    const existingMentor = await db.mentor.findUnique({
      where: {
        id: mentorId
      }
    })

    if (!existingMentor) {
      return { error: "Mentor no encontrado" }
    }

    await db.mentor.update({
      where: {
        id: mentorId
      },
      data: {
        isPublished,
      }
    })

    return { success: true }
  } catch (error) {
    console.error("[UPDATE_PUBLISH_MENTOR]", error)
    return { error: "Algo salió mal" }
  }
};