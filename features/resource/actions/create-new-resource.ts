import * as z from "zod";
import { NewResourceFormSchema } from "../schemas";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const createNewResource = async (
  values: z.infer<typeof NewResourceFormSchema>,
) => {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { error: "Usuario no autenticado" }
    }

    const newResource = await db.resource.create({
      data: {
        title: values.title,
      }
    })

    if (!newResource) {
      return { error: "Error al crear el recurso" }
    }

    return { success: true, id: newResource.id }
  } catch (error) {
    console.log("[CREATE_NEW_RESOURCE_ERROR]", error)
    return {
      error: "Error al crear el recurso"
    }
  }
}