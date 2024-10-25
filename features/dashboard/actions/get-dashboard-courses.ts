import { getProgress } from "@/features/search/components/get-progress";
import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
}

type DashBoardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
}

export const getDashboardCourses = async (userId: string): Promise<DashBoardCourses> => {
  try {

    const student = await db.student.findUnique({
      where: {
        userId,
      }
    })

    if (!student) {
      return {
        completedCourses: [],
        coursesInProgress: []
      }
    }

    const studentCurses = await db.studentCourse.findMany({
      where: {
        studentId: student.id
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true
              }
            }
          }
        }
      }
    })

    const courses = studentCurses.map(({ course }) => course) as CourseWithProgressWithCategory[]

    for (let course of courses) {
      const progress = await getProgress(userId, course.id)
      course.progress = progress;
    }

    const completedCourses = courses.filter(course => course.progress === 100)
    const coursesInProgress = courses.filter(course => (course.progress ?? 0) < 100)

    return {
      completedCourses,
      coursesInProgress
    }
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error)
    return {
      completedCourses: [],
      coursesInProgress: []
    }
  }

}
