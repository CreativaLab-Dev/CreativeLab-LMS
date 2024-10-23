'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import Mux from "@mux/mux-node"

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

export const deleteChapter = async (
  courseId: string,
  chapterId: string,
) => {
  const session = await auth()
  if (!session) return { error: 'No autorizado' }

  const chapter = await db.chapter.findFirst({
    where: {
      id: chapterId
    }
  })
  if (!chapter) {
    return { error: "No existe este capitulo" }
  }

  if (chapter.videoUrl) {
    const existingMuxData = await db.muxData.findFirst({
      where: {
        chapterId,

      }
    })

    if (existingMuxData) {
      await video.assets.delete(existingMuxData.assetId)
      await db.muxData.delete({
        where: {
          chapterId,
        }
      })
    }
  }

  await db.chapter.delete({
    where: {
      id: chapterId,
      courseId,
    }
  })

  const publishedChaptersInCourse = await db.chapter.findMany({
    where: {
      id: courseId,
    }
  })

  if (!publishedChaptersInCourse.length) {
    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: false
      }
    })
  }

  return { success: true }
}