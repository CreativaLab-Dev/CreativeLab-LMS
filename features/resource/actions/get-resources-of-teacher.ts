'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { Resource } from "@prisma/client"
import { PageParamasProps } from "@/dtype"
import { getParams } from "@/utils/getParams"
import { PaginationResults } from "@/components/ui/pagination-list"

export type GetResourceList = {
  resources: Resource[],
  pagination: PaginationResults
}


export const getResourceOfTeacher = async (
  searchParams: PageParamasProps
): Promise<GetResourceList> => {
  try {
    const session = await auth()
    if (!session) {
      return {
        resources: [],
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
        resources: [],
        pagination: {
          page: 1,
          sizePage: 10,
          total: 0
        }
      }
    }

    const [resources, total] = await db.$transaction([
      db.resource.findMany({
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
      db.mentor.count(),
    ])

    const response: GetResourceList = {
      resources,
      pagination: {
        page,
        sizePage,
        total
      }
    }
    return response
  } catch (error) {
    console.log("[GET_RESOURCE_OF_TEACHER_ERROR]", error)
    return {
      resources: [],
      pagination: {
        page: 1,
        sizePage: 10,
        total: 0
      }
    }
  }


}

