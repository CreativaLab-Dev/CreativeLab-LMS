import { Category, Course } from "@prisma/client"

import { getProgress } from "./get-progress";
import { db } from "@/lib/db"

type CourseWithProgressWithCategory = Course & {
  category: Category | null
  chapters: { id: string }[]
  progress: number | null
}

type GetCourses = {
  userId: string;
  title?: string
  categoryId?: string
}

const getCourses = async ({
  userId,
  categoryId,
  title
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        name: {
          contains: title,
        },
        categoryId
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true
          },
          select: {
            id: true
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course) => {
        const progress = await getProgress(userId, course.id)
        return {
          ...course,
          progress
        }
      })
    )

    return coursesWithProgress

  } catch (error) {
    console.error("[GET_COURSES]", error);
    return []

  }
}

export default getCourses;