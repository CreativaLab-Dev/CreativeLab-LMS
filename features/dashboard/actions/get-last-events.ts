import { db } from "@/lib/db";

export const getLastEvents = async (userId: string) => {
  try {

    const student = await db.student.findUnique({
      where: {
        userId,
      }
    })

    if (!student) {
      return []
    }

    const lastEvents = await db.event.findMany({
      where: {
        date: {
          gte: new Date()
        },
        isPublished: true,
      },
      orderBy: {
        date: 'asc'
      },
      take: 2
    })

    if (!lastEvents) {
      return []
    }
    return lastEvents
  } catch (error) {
    console.log("[GET_LAST_EVENTS_COURSES]", error)
    return []
  }
}
