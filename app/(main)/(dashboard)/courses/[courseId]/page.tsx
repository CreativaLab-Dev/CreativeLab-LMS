import HeaderPage from "@/components/ui/header-page"
import { getCourseById } from "@/features/courses/actions/get-course-by-id"
import { CourseForm } from "@/features/courses/components/course-form"
import { redirect } from "next/navigation"

type CourseIdPageProps = {
  params: {
    courseId: string
  }
}

export default async function CourseIdPage({
  params
}: CourseIdPageProps) {
  const courseId = params.courseId
  const course = await getCourseById(courseId)
  if (!course) {
    return redirect('/courses')
  }
  return (
    <div className="space-y-3 py-4 lg:py-8 h-full">
      <HeaderPage
        title="Editar curso"
        description="Aquí podrás editar un nuevo curso"
        bgColor="bg-sky-200"
        icon="course"
        iconColor="text-sky-500"
      />
      <div className="px-10 md:px-8">
        <CourseForm course={course} />
      </div>
    </div>
  )
}