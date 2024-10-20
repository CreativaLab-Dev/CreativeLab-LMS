import { db } from "@/lib/db"

export const getCourses = async () => {
  const courses = await db.course.findMany()
  return courses
}

