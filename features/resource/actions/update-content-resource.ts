'use server'

import * as z from "zod"
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { resourceContentFormSchema } from "../schemas";

export const updateContentResource = async (
  resourceId: string,
  values: z.infer<typeof resourceContentFormSchema>
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
        content: values.content,
      }
    })

    return { success: true }
  } catch (error) {
    console.error("[UPDATE_CONTENT_RESOURCE]", error)
    return { error: "Algo salió mal" }
  }
};