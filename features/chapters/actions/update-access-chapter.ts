'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { chapterAccessSchema } from "../schemas"
import * as z from "zod"

export const updateAccessChapter = async (
  courseId: string,
  chapterId: string,
  values: z.infer<typeof chapterAccessSchema>
) => {
  const session = await auth()
  if (!session) return { error: 'No autorizado' }

  const { isFree } = values

  await db.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      isFree,
    }
  })
  return { success: true }
}