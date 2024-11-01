import { auth } from "@/auth";
import HeaderPage from "@/components/ui/header-page";
import { getDashboardCourses } from "@/features/dashboard/actions/get-dashboard-courses";
import { getLastEvents } from "@/features/dashboard/actions/get-last-events";
import { getLastMentors } from "@/features/dashboard/actions/get-last-mentors";
import InfoCard from "@/features/dashboard/components/info-card";
import EventCard from "@/features/events/components/students/event-card";
import MentorCard from "@/features/mentors/components/students/mentor-card";
import CoursesList from "@/features/search/components/courses-list";
import { getMembershipActive } from "@/features/settings/actions/get-membership-active";

const DashboardPage = async () => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(session.user.id)

  const lastEvents = await getLastEvents(session.user.id)
  const lastMentors = await getLastMentors(session.user.id)
  const membershipActive = await getMembershipActive(session.user.id)

  return (
    <div className="p-6 space-y-4">
      <HeaderPage
        title="Dashboard"
        description="Descubre todo lo que hemos preparado para ti."
        bgColor="bg-gradient-to-r from-blue-500 to-blue-400"
        icon="dashboard"
        iconColor="text-white"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="text-sm text-blue-500 mb-4 font-bold text-center border-b border-blue-400">
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
        <div>
          <div className="text-sm text-blue-500 mb-4 font-bold text-center border-b border-blue-400">
            Proximos eventos
          </div>
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
        <div>
          <div className="text-sm text-blue-500 mb-4 font-bold text-center border-b border-blue-400">
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
        <div>
          <div className="text-sm text-blue-500 mb-4 font-bold text-center border-b border-blue-400">
            Recursos destacados
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
      </div>

    </div>
  );
}

export default DashboardPage;