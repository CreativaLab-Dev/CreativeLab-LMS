'use server'

import * as z from "zod"
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { resourceCategoryFormSchema } from "../schemas";

export const updateCategoryResource = async (
  resourceId: string,
  values: z.infer<typeof resourceCategoryFormSchema>
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
        category: values.category
      }
    })

    return { success: true }
  } catch (error) {
    console.error("[UPDATE_CATEGORY_RESOURCE]", error)
    return { error: "Algo salió mal" }
  }
};