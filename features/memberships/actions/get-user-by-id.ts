"use server"

import { db } from "@/lib/db"

export const getUserById = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId
      }
    })
    return user
  } catch (error) {
    console.error("[GET_USERS_BY_ID]:", error)
    return null
  }
}