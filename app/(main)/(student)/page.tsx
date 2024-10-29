import { auth } from "@/auth";
import HeaderPage from "@/components/ui/header-page";
import { getDashboardCourses } from "@/features/dashboard/actions/get-dashboard-courses";
import InfoCard from "@/features/dashboard/components/info-card";
import CoursesList from "@/features/search/components/courses-list";

const DashboardPage = async () => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(session.user.id)

  return (
    <div className="p-6 space-y-4">
      <HeaderPage
        title="Dashboard"
        description="Descubre todo lo que hemos preparado para ti."
        bgColor="bg-gradient-to-r from-blue-500 to-blue-400"
        icon="dashboard"
        iconColor="text-white"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon='clock'
          label="En progreso"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon='checkCircle'
          label="Completados"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList
        items={[...completedCourses, ...coursesInProgress]}
      />
    </div>
  );
}

export default DashboardPage;