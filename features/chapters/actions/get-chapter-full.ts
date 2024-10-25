import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string
  chapterId: string
}

export const getChapterFull = async ({
  chapterId,
  courseId,
  userId
}: GetChapterProps) => {
  try {
    // Verify active membership
    // const membership = await db.membership.findFirst({
    //   where: {
    //     userId,
    //     expiresAt: {
    //       gt: new Date()
    //     }
    //   }
    // })

    // if (!membership) {
    //   return {
    //     chapter: null,
    //     course: null,
    //     muxData: null,
    //     attachments: [],
    //     nextChapter: null,
    //     userPreogress: null
    //   }
    // }

    const course = await db.course.findUnique({
      where: {
        id: courseId
      }
    })

    // Get chapter
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true
      }
    })

    if (!course || !chapter) {
      throw new Error("Chapter not found")
    }

    let muxData
    let attachments: Attachment[] = []
    let nextChapter: Chapter | null = null

    // If membershipt is valid
    attachments = await db.attachment.findMany({
      where: {
        courseId: course.id,
      },
      orderBy: {
        createdAt: "asc"
      }
    })

    if (chapter.isFree) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapter.id
        }
      })
    }

    nextChapter = await db.chapter.findFirst({
      where: {
        courseId: course.id,
        position: {
          gt: chapter.position
        }
      },
      orderBy: {
        position: "asc"
      }
    })


    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId
        }
      }
    })

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress
    }


  } catch (error) {
    console.log("[GET_CHAPTER]", error)
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userPreogress: null
    }
  }
}