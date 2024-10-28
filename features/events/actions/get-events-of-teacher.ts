'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { Event } from "@prisma/client"
import { PageParamasProps } from "@/dtype"
import { getParams } from "@/utils/getParams"
import { PaginationResults } from "@/components/ui/pagination-list"

export type GetEventsList = {
  events: Event[],
  pagination: PaginationResults
}

export const getEventsOfTeacher = async (searchParams: PageParamasProps) => {
  const session = await auth()
  if (!session) {
    return {
      events: [],
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
      events: [],
      pagination: {
        page: 1,
        sizePage: 10,
        total: 0
      }
    }
  }

  const [events, total] = await db.$transaction([
    db.event.findMany({
      where: {
        // teacherId: teacher.id,
        OR: [
          {
            title: {
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
    db.event.count(),
  ])

  const response: GetEventsList = {
    events,
    pagination: {
      page,
      sizePage,
      total
    }
  }

  return response
}

