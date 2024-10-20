import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getCourseById = async (courseId: string) => {
  const session = await auth()
  if (!session) {
    return null
  }


  const course = await db.course.findFirst({
    where: {
      id: courseId
    }
  })

  return course
}