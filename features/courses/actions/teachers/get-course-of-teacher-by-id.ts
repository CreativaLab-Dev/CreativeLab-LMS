import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getCourseOfTeacherById = async (courseId: string) => {
  const session = await auth()
  if (!session) {
    return null
  }

  const course = await db.course.findFirst({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc'
        }
      },
      attachments: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  return course
}