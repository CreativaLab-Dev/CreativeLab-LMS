import { auth } from "@/auth";
import HeaderPage from "@/components/ui/header-page";
import { validationExistsStudent } from "@/features/auth/actions/validation-exists-student";
import { getDashboardCourses } from "@/features/dashboard/actions/get-dashboard-courses";
import { getLastEvents } from "@/features/dashboard/actions/get-last-events";
import { getLastMentors } from "@/features/dashboard/actions/get-last-mentors";
import { getLastResources } from "@/features/dashboard/actions/get-last-resources";
import InfoCard from "@/features/dashboard/components/info-card";
import EventCard from "@/features/events/components/students/event-card";
import MentorCard from "@/features/mentors/components/students/mentor-card";
import ResourceCard from "@/features/resource/components/resource-card";
import CoursesList from "@/features/search/components/courses-list";
import { getMembershipActive } from "@/features/settings/actions/get-membership-active";

const DashboardPage = async () => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null
  }

  validationExistsStudent(session.user.id)

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(session.user.id)

  const lastEvents = await getLastEvents(session.user.id)
  const lastMentors = await getLastMentors(session.user.id)
  const lastRecursos = await getLastResources(session.user.id)
  const membershipActive = await getMembershipActive(session.user.id)

  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Dashboard"
        description="Descubre todo lo que hemos preparado para ti."
        bgColor="bg-gradient-to-r from-blue-500 to-blue-400"
        icon="dashboard"
        iconColor="text-white"
      />
      <div className="px-2 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div className="p-3 border border-blue-400 rounded-lg">
            <div className="text-xs text-blue-500 text-center pb-1">
              Mis cursos
            </div>
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
            <CoursesList
              isDashboard
              items={[...completedCourses, ...coursesInProgress]}
            />
          </div>
          <div className="p-3 border border-blue-400 rounded-lg">
            <div className="text-xs text-blue-500 text-center pb-1">
              Proximos eventos
            </div>
            {lastEvents.length === 0 && (
              <div className="text-center text-gray-500 text-sm">
                No hay eventos proximos
              </div>
            )}
            <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2'>
              {lastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isPremium={!!membershipActive}
                />
              ))}
            </div>
          </div>
          <div className="p-3 border border-blue-400 rounded-lg">
            <div className="text-xs text-blue-500 text-center pb-1">
              Mentores destacados
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2'>
              {lastMentors.map((mentor) => (
                <MentorCard
                  mentor={mentor}
                  isPremium={!!membershipActive}
                  key={mentor.id}
                />
              ))}
            </div>
          </div>
          <div className="p-3 border border-blue-400 rounded-lg">
            <div className="text-xs text-blue-500 text-center pb-1">
              Recursos recientes
            </div>
            <div className='space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4'>
              {lastRecursos.map((resource) => (
                <ResourceCard
                  resource={resource}
                  key={resource.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;