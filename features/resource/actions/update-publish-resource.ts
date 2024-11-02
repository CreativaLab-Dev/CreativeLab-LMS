'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const updatePublishResource = async (
  resourceId: string,
  isPublished: boolean
) => {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { error: "Usuario no autenticado" }
    }
    const existingResource = await db.resource.findUnique({
      where: {
        id: resourceId
      }
    })

    if (!existingResource) {
      return { error: "Recurso no encontrado" }
    }

    await db.resource.update({
      where: {
        id: resourceId
      },
      data: {
        isPublished,
      }
    })

    return { success: true }
  } catch (error) {
    console.error("[UPDATE_PUBLISH_RESOURCE]", error)
    return { error: "Algo salió mal" }
  }
};