'use server'

import * as z from "zod"
import Mux from '@mux/mux-node';
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { chapterYoutubeSchema } from "../schemas"

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});


export const updateYoutubeChapter = async (
  courseId: string,
  chapterId: string,
  values: z.infer<typeof chapterYoutubeSchema>
) => {
  try {
    const session = await auth()
    if (!session) return { error: 'No autorizado' }

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
    };

    const { youtubeUrl } = values

    await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        youtubeUrl,
        videoUrl: null
      }
    })

    return { success: true }
  } catch (error) {
    console.log("[UPDATe_YOUTUBE_CHAPTER_ERROR]", error)
    return { error: "Algo salió mal" }
  }
}