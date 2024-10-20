import CardDetail from "@/components/ui/card-detail"
import HeaderPage from "@/components/ui/header-page"
import { getCourseOfTeacherById } from "@/features/courses/actions/get-course-of-teacher-by-id"
import { redirect } from "next/navigation"

type CourseIdPageProps = {
  params: {
    courseId: string
  }
}

export default async function CourseDetailPage({ params }: CourseIdPageProps) {
  const courseId = params.courseId
  const course = await getCourseOfTeacherById(courseId)
  if (!course) {
    return redirect('/teacher/courses')
  }
  return (
    <div className="space-y-3 py-4 lg:py-8 h-full">
      <HeaderPage
        title="Detalle de curso"
        description="Aquí podrás ver los detalles de un curso"
        bgColor="bg-sky-200"
        icon="course"
        iconColor="text-sky-500"
      />
      <div className="px-10 md:px-8">
        <CardDetail course={course} />
      </div>
    </div>
  )
}