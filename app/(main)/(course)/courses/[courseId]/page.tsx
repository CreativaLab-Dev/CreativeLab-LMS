import { auth } from "@/auth"
import { db } from "@/lib/db"

import { redirect } from "next/navigation"

const CourseIdDetailPage = async ({
  params
}: {
  params: {
    courseId: string
  }
}) => {

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect("/auth/login")
  }

  const course = await db.course.findFirst({
    where: {
      id: params.courseId
    },
    include: {
      chapters: {
        select: {
          id: true
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  })

  if (!course) {
    return redirect("/")
  }

  return redirect(`/courses/${params.courseId}/chapters/${course.chapters[0].id}`)

}

export default CourseIdDetailPage;