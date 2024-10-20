import { auth } from "@/auth"
import { PaginationResults } from "@/components/ui/pagination-list"
import { PageParamasProps } from "@/dtype"
import { db } from "@/lib/db"
import { getParams } from "@/utils/getParams"
import { Course } from "@prisma/client"

export type GetCourseList = {
  courses: Course[],
  pagination: PaginationResults
}

export const getCourses = async (searchParams: PageParamasProps) => {
  const session = await auth()
  if (!session) {
    return {
      courses: [],
      pagination: {
        page: 1,
        sizePage: 10,
        total: 0
      }
    }
  }

  const {
    page,
    sizePage,
    sortBy,
    isDesc,
    search
  } = getParams(searchParams)

  const [courses, total] = await db.$transaction([
    db.course.findMany({
      where: {
        teacher: {
          userId: session.user.id,
        },
        name: {
          contains: search,
        },
      },
      orderBy: {
        [sortBy || 'createdAt']: isDesc ? 'desc' : 'asc',
      },
      skip: (page - 1) * sizePage,
      take: sizePage,
    }),
    db.course.count({
      where: {
        teacher: {
          userId: session.user.id,
        },
        name: {
          contains: search,
        },
      }
    }),
  ])

  const response: GetCourseList = {
    courses,
    pagination: {
      page,
      sizePage,
      total
    }
  }

  return response
}

