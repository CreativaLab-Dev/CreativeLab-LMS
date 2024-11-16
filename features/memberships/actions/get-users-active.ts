"use server"

import { db } from "@/lib/db"

export const getUsersWithoutMembership = async () => {
  try {
    const users = await db.user.findMany({
      where: {
        isAdmin: false,
        teacherId: null,
        OR: [
          { memberships: { none: {} } },
          {
            memberships: {
              some: {
                expiresAt: { lte: new Date() }
              }
            }
          }
        ]
      }
    })

    return users
  } catch (error) {
    console.error("[GET_USERS_ACTIVE]:", error)
    return []
  }
}