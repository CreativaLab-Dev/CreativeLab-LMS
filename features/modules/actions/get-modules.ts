import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getModules = async (courseId: string, moduleId: string) => {
  const session = await auth()
  if (!session) return []
  const modules = db.module.findUnique({
    where: {
      id: moduleId,
      courseId,

    }
  })
}