import { db } from "@/lib/db";

export const getLastResources = async (userId: string) => {
  try {

    const student = await db.student.findUnique({
      where: {
        userId,
      }
    })

    if (!student) {
      return []
    }

    const lastResources = await db.resource.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        createdAt: 'asc'
      },
      take: 2
    })

    if (!lastResources) {
      return []
    }
    return lastResources
  } catch (error) {
    console.log("[GET_LAST_RESOURCES_COURSES]", error)
    return []
  }
}
