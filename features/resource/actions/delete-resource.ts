"user sever";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const deleleResource = async (
  mentorId: string
) => {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { error: "Usuario no autenticado" }
    }

    const existingResource = await db.mentor.findUnique({
      where: {
        id: mentorId
      }
    })

    if (!existingResource) {
      return { error: "Recurso no encontrado" }
    }

    db.resource.delete({
      where: {
        id: mentorId
      }
    })
    return { success: true }
  } catch (error) {
    console.error("[DELETE_RESOURCE]", error)
    return { error: "Algo salió mal" }
  }
}
