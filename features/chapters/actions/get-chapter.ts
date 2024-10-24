import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getChapter = async (courseId: string, chapterId: string) => {
  const session = await auth()
  if (!session) return null
  const chapter = db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    }
  })
  return chapter
}