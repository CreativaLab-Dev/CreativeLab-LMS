'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { Course } from "@prisma/client"
import { PageParamasProps } from "@/dtype"
import { getParams } from "@/utils/getParams"
import { PaginationResults } from "@/components/ui/pagination-list"

export type GetCourseList = {
  courses: Course[],
  pagination: PaginationResults
}

export const getCoursesOfTeacher = async (searchParams: PageParamasProps) => {
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
    page = 1,
    sizePage = 10,
    sortBy,
    isDesc,
    title
  } = getParams(searchParams)

  const teacher = await db.teacher.findFirst({
    where: {
      userId: session.user.id
    }
  })

  if (!teacher) {
    return {
      courses: [],
      pagination: {
        page: 1,
        sizePage: 10,
        total: 0
      }
    }
  }

  const [courses, total] = await db.$transaction([
    db.course.findMany({
      where: {
        teacherId: teacher.id,
        OR: [
          {
            name: {
              contains: title ?? '',
            }
          }
        ]
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
          userId: session.user.id
        }

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

