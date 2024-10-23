'use server'

import * as z from "zod"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { chapterVideoSchema } from "../schemas"
import Mux from '@mux/mux-node';

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

export const updateVideoChapter = async (
  courseId: string,
  chapterId: string,
  values: z.infer<typeof chapterVideoSchema>
) => {
  const session = await auth()
  if (!session) return { error: 'No autorizado' }

  const { videoUrl } = values

  await db.$transaction(async (tx) => {
    await tx.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        videoUrl,
      }
    })

    const existingMuxData = await tx.muxData.findFirst({
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

    const asset = await video.assets.create({
      input: [
        {
          url: videoUrl,
          type: "video"
        }
      ],
      playback_policy: ["public"],
      test: false
    });

    const playbackId = asset?.playback_ids?.[0].id ?? null

    if (!playbackId) {
      return { error: 'Error al crear el video' }
    }

    await tx.muxData.create({
      data: {
        chapterId,
        assetId: asset.id,
        playbackId,
      }
    })
  })

  return { success: true }
}