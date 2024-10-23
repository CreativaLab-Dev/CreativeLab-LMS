'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import Mux from "@mux/mux-node"

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

export const deleteCourse = async (
  courseId: string,
) => {
  const session = await auth()
  if (!session) return { error: 'No autorizado' }

  const course = await db.course.findFirst({
    where: {
      id: courseId
    },
    include: {
      chapters: {
        include: {
          muxData: true,
        }
      }
    }
  })
  if (!course) {
    return { error: "No existe este capitulo" }
  }

  for (const chapter of course.chapters) {
    if (chapter.muxData?.assetId) {
      await video.assets.delete(chapter.muxData.assetId)
    }
  }

  const deletedCourse = await db.course.delete({
    where: {
      id: courseId
    }
  })

  return { success: true }
}