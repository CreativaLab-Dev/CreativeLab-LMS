import HeaderPage from "@/components/ui/header-page"
import { getCategories } from "@/features/categories/actions/get-categories"
import { getCourseOfTeacherById } from "@/features/courses/actions/teachers/get-course-of-teacher-by-id"
import CourseSetup from "@/features/courses/components/teachers/course-setup"
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
  const course = await getCourseOfTeacherById(courseId)
  if (!course) {
    return redirect('/teacher/courses')
  }

  const categories = await getCategories()
  return (
    <div className="space-y-3 py-4 lg:py-8 h-full">
      <HeaderPage
        title="Configuracion de curso"
        description="Aquí podrás editar un nuevo curso"
        bgColor="bg-sky-200"
        icon="course"
        iconColor="text-sky-500"
      />
      <div className="px-10 md:px-8">
        <CourseSetup
          course={course}
          categories={categories}
        />
      </div>
    </div>
  )
}