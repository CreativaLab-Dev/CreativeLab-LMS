import { db } from "./db"

export const getCurrentUser = async (id: string) => {
  const currentUser = await db.user.findFirst({
    where: { id },
  })
  return currentUser
}