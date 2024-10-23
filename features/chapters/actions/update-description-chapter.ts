'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { chapterDescriptionSchema } from "../schemas"
import * as z from "zod"

export const updateDescriptionChapter = async (
  courseId: string,
  chapterId: string,
  values: z.infer<typeof chapterDescriptionSchema>
) => {
  const session = await auth()
  if (!session) return { error: 'No autorizado' }

  const { description } = values

  await db.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      description,
    }
  })
  return { success: true }
}