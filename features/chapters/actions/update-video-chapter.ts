'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { chapterVideoSchema } from "../schemas"
import * as z from "zod"

export const updateVideoChapter = async (
  courseId: string,
  chapterId: string,
  values: z.infer<typeof chapterVideoSchema>
) => {
  const session = await auth()
  if (!session) return { error: 'No autorizado' }

  const { videoUrl } = values

  await db.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      videoUrl,
    }
  })
  return { success: true }
}