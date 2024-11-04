'use server'

import * as z from "zod"
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { resourcePriceFormSchema } from "../schemas";

export const updatePriceResource = async (
  resourceId: string,
  values: z.infer<typeof resourcePriceFormSchema>
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

    const priceNumber = parseFloat(values.price)

    if (isNaN(priceNumber)) {
      return { error: "El precio debe ser un número" }
    }

    await db.resource.update({
      where: {
        id: resourceId
      },
      data: {
        price: priceNumber,
      }
    })

    return { success: true }
  } catch (error) {
    console.error("[UPDATE_TITLE_RESOURCE]", error)
    return { error: "Algo salió mal" }
  }
};