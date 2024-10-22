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
    search
  } = getParams(searchParams)

  console.log(searchParams)

  const [courses, total] = await db.$transaction([
    db.course.findMany({
      where: {
        AND: [
          {
            teacher: {
              userId: session.user.id
            }
          },
          {
            name: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive'
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
        AND: [
          {
            teacher: {
              userId: session.user.id
            }
          },
          {
            name: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            }
          }
        ]
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

