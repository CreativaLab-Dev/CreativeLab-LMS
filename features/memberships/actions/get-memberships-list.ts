'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { Membership } from "@prisma/client"
import { PageParamasProps } from "@/dtype"
import { getParams } from "@/utils/getParams"
import { PaginationResults } from "@/components/ui/pagination-list"

export type MembershipWithStudent = Membership & {
  user: {
    email: string | null
  }
}

export type GetMembershipsList = {
  memberships: MembershipWithStudent[],
  pagination: PaginationResults
}

export const getMembershipsAdmin = async (
  searchParams: PageParamasProps
): Promise<GetMembershipsList> => {
  const session = await auth()
  if (!session) {
    return {
      memberships: [],
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
    name,
    // mount
  } = getParams(searchParams)

  const teacher = await db.teacher.findFirst({
    where: {
      userId: session.user.id
    }
  })

  if (!teacher) {
    return {
      memberships: [],
      pagination: {
        page: 1,
        sizePage: 10,
        total: 0
      }
    }
  }

  const [memberships, total] = await db.$transaction([
    db.membership.findMany({
      where: {
        user: {
          email: {
            contains: name
          }
        }
      },
      select: {
        id: true,
        createdAt: true,
        expiresAt: true,
        status: true,
        type: true,
        userId: true,
        updatedAt: true,
        paymentOrderId: true,
        user: {
          select: {
            email: true,
          }
        },
      },
      orderBy: {
        [sortBy || 'updatedAt']: isDesc ? 'desc' : 'asc',
      },
      skip: (page - 1) * sizePage,
      take: sizePage,
    }),
    db.membership.count(),
  ])

  const response: GetMembershipsList = {
    memberships,
    pagination: {
      page,
      sizePage,
      total
    }
  }

  return response
}

