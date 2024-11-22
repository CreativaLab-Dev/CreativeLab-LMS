import { PageParamasProps } from "@/dtype";
import HeaderPage from "@/components/ui/header-page";
import CoursesList from "@/features/courses/components/teachers/courses-list";
import { getCoursesOfTeacher } from "@/features/courses/actions/teachers/get-courses-of-teacher";

export default async function CoursesTeacherPage(
  searchParams: PageParamasProps
) {
  const { courses, pagination } = await getCoursesOfTeacher(searchParams)
  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Mis cursos"
        description="Aquí encontrarás todos los cursos que has implementado"
        bgColor="bg-gradient-to-r from-blue-500 to-blue-400"
        icon="course"
        iconColor="text-white"
      />
      <div className="px-10 md:px-8">
        <CoursesList
          courses={courses}
          pagination={pagination}
          url="/teacher/courses"
        />
      </div>
    </div>
  );
}