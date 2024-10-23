'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { chapterTitleSchema } from "../schemas"
import * as z from "zod"

export const updateTitleChapter = async (
  courseId: string,
  chapterId: string,
  values: z.infer<typeof chapterTitleSchema>
) => {
  const session = await auth()
  if (!session) return { error: 'No autorizado' }

  const { title } = values

  await db.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      title,
    }
  })
  return { success: true }
}