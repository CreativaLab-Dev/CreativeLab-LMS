"user sever";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const deleteMentor = async (
  mentorId: string
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

    db.mentor.delete({
      where: {
        id: mentorId
      }
    })
    return { success: true }
  } catch (error) {
    console.error("[DELETE_MENTOR]", error)
    return { error: "Algo salió mal" }
  }
}
