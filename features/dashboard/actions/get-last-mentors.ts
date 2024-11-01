import { db } from "@/lib/db";

export const getLastMentors = async (userId: string) => {
  try {

    const student = await db.student.findUnique({
      where: {
        userId,
      }
    })

    if (!student) {
      return []
    }

    const lastMentors = await db.mentor.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        createdAt: 'asc'
      },
      take: 2
    })

    if (!lastMentors) {
      return []
    }
    return lastMentors
  } catch (error) {
    console.log("[GET_LAST_MENTORS_COURSES]", error)
    return []
  }
}
