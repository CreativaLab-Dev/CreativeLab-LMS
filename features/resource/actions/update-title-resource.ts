'use server'

import * as z from "zod"
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { resourceTitleFormSchema } from "../schemas";

export const updateTitleResource = async (
  resourceId: string,
  values: z.infer<typeof resourceTitleFormSchema>
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
        title: values.title,
      }
    })

    return { success: true }
  } catch (error) {
    console.error("[UPDATE_TITLE_RESOURCE]", error)
    return { error: "Algo salió mal" }
  }
};