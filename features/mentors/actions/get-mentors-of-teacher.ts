'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { Mentor } from "@prisma/client"
import { PageParamasProps } from "@/dtype"
import { getParams } from "@/utils/getParams"
import { PaginationResults } from "@/components/ui/pagination-list"

export type GetMentorsList = {
  mentors: Mentor[],
  pagination: PaginationResults
}

export const getMentorsOfTeacher = async (
  searchParams: PageParamasProps
) => {
  const session = await auth()
  if (!session) {
    return {
      mentors: [],
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
    name
  } = getParams(searchParams)

  const teacher = await db.teacher.findFirst({
    where: {
      userId: session.user.id
    }
  })

  if (!teacher) {
    return {
      mentors: [],
      pagination: {
        page: 1,
        sizePage: 10,
        total: 0
      }
    }
  }

  const [mentors, total] = await db.$transaction([
    db.mentor.findMany({
      where: {
        // teacherId: teacher.id,
        OR: [
          {
            name: {
              contains: name ?? '',
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
    db.mentor.count(),
  ])

  const response: GetMentorsList = {
    mentors,
    pagination: {
      page,
      sizePage,
      total
    }
  }

  return response
}

