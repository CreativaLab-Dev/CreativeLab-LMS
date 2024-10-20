import HeaderPage from "@/components/ui/header-page";
import { CourseFormAdd } from "@/features/courses/components/course-form-add";

const CourseNewPage = () => {
  return (
    <div className="space-y-3 py-4 lg:py-8 h-full">
      <HeaderPage
        title="Agregar curso"
        description="Aquí podrás agregar un nuevo curso"
        bgColor="bg-sky-200"
        icon="course"
        iconColor="text-sky-500"
      />
      <div className="px-10 md:px-8">
        <CourseFormAdd />
      </div>
    </div>
  );
}

export default CourseNewPage;