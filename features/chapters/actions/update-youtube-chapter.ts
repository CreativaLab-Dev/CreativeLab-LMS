'use server'

import * as z from "zod"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { chapterYoutubeSchema } from "../schemas"

export const updateYoutubeChapter = async (
  courseId: string,
  chapterId: string,
  values: z.infer<typeof chapterYoutubeSchema>
) => {
  const session = await auth()
  if (!session) return { error: 'No autorizado' }

  const { youtubeUrl } = values

  await db.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      youtubeUrl,
    }
  })

  return { success: true }
}