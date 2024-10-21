'use server'

import { auth } from "@/auth"
import { Content } from "@prisma/client"
import { PaginationResults } from "@/components/ui/pagination-list"
import { PageParamasProps } from "@/dtype"
import { db } from "@/lib/db"
import { getParams } from "@/utils/getParams"

export type GetCourseContentList = {
  contents: Content[],
  pagination: PaginationResults
}

export const getContentsOfCourse = async (courseId: string, searchParams: PageParamasProps) => {

  const session = await auth()
  if (!session) {
    return {
      contents: [],
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

  const [contents, total] = await db.$transaction([
    db.content.findMany({
      where: {
        AND: [
          {
            courseId: {
              equals: courseId
            }
          },
          {
            title: {
              contains: search,
            },
          },
          {
            body: {
              contains: search,
            },
          },
        ]
      },
      orderBy: {
        [sortBy || 'createdAt']: isDesc ? 'desc' : 'asc',
      },
      skip: (page - 1) * sizePage,
      take: sizePage,
    }),
    db.content.count({
      where: {
        AND: [
          {
            courseId: {
              equals: courseId
            }
          },
          {
            body: {
              contains: search,
            },
          },
          {
            title: {
              contains: search,
            },
          },
        ]
      }
    }),
  ])

  const response: GetCourseContentList = {
    contents,
    pagination: {
      page,
      sizePage,
      total
    }
  }

  return response
}