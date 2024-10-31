"use server"
import * as z from "zod"
import { MentorAboutMeFormSchema } from "../schemas";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const updateAboutMeMentor = async (
  mentorId: string,
  values: z.infer<typeof MentorAboutMeFormSchema>
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

    db.mentor.update({
      where: {
        id: mentorId
      },
      data: {
        aboutMe: values.aboutMe
      }
    })
    return { success: true }

  } catch (error) {
    console.log("[UPDATE_NAME_MENTOR]", error)
    return { error: "Algo salió mal" }
  }
}