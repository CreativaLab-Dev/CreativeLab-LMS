import { Banner } from "@/components/ui/banner"
import { IconBadge } from "@/components/ui/icon-badge"
import { getCategories } from "@/features/categories/actions/get-categories"
import { getCourseOfTeacherById } from "@/features/courses/actions/teachers/get-course-of-teacher-by-id"
import CourseActions from "@/features/courses/components/teachers/course-actions"
import CourseFormAttachment from "@/features/courses/components/teachers/course-form-attachment"
import CourseFormCategory from "@/features/courses/components/teachers/course-form-category"
import CourseFormChapter from "@/features/courses/components/teachers/course-form-chapters"
import CourseFormDescription from "@/features/courses/components/teachers/course-form-description"
import CourseFormImage from "@/features/courses/components/teachers/course-form-image"
import CourseFormTitle from "@/features/courses/components/teachers/course-form-title"
import { ArrowLeft, File, LayoutDashboard, ListChecks } from "lucide-react"
import Link from "next/link"
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

  const requiredField = [
    course.name,
    course.description,
    course.imagePath,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished),
  ]

  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredField.every(Boolean)

  return (
    <>
      {!course.isPublished && (
        <Banner
          label="Este curso no es visible para los estudiantes"
        />
      )}
      <div className="p-6">
        <Link
          href={`/teacher/courses`}
          className="flex itesm-center text-sm hover:opacity-75 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Regresar al listado
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">
              Configuracion de curso
            </h1>
            <span className="text-sm text-slate-700">
              Completa todos los campos {completionText}
            </span>
          </div>
          <CourseActions
            disabled={!isComplete}
            courseId={courseId}
            isPublished={course.isPublished}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={LayoutDashboard} />
            <h2 className="text-xl">
              Personaliza tu curso
            </h2>
          </div>
          <CourseFormTitle
            courseId={course.id}
            initialData={{ title: course.name }}
          />
          <CourseFormDescription
            courseId={course.id}
            initialData={{ description: course.description || '' }}
          />
          <CourseFormImage
            courseId={course.id}
            initialData={{ image: course.imagePath || '' }}
          />
          <CourseFormCategory
            courseId={course.id}
            initialData={course}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id
            }))}
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={ListChecks} />
            <h2 className="text-xl">
              Capitulos del curso
            </h2>
          </div>
          <CourseFormChapter
            courseId={course.id}
            initialData={course}
          />
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={File} />
            <h2 className="text-xl">
              Recursos y anexos
            </h2>
          </div>
          <CourseFormAttachment
            courseId={course.id}
            initialData={course}
          />
        </div>
      </div>
    </>
  )
}