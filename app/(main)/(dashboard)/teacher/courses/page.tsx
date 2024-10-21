import HeaderPage from "@/components/ui/header-page";
import { PageParamasProps } from "@/dtype";
import { getCoursesOfTeacher } from "@/features/courses/actions/teachers/get-courses-of-teacher";
import CoursesList from "@/features/courses/components/courses-list";


export default async function CoursesPage(searchParams: PageParamasProps) {
  const { courses, pagination } = await getCoursesOfTeacher(searchParams)
  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Mis cursos"
        description="Aquí encontrarás todos los cursos que has implementado"
        bgColor="bg-sky-200"
        icon="course"
        iconColor="text-sky-500"
      />
      <div className="px-10 md:px-8">
        <CoursesList courses={courses} pagination={pagination} />
      </div>
    </div>
  );
}