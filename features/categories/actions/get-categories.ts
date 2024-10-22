'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getCategories = async () => {
  const session = await auth()
  if (!session) {
    return []
  }

  return db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}