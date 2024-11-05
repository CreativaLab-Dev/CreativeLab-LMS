import { auth } from "@/auth";
import HeaderPage from "@/components/ui/header-page";
import { getEventsNewPublished } from "@/features/events/actions/get-events-new-published";
import EventCard from "@/features/events/components/students/event-card";
import { getMentorsPublished } from "@/features/mentors/actions/students/get-mentors-published";
import MentorCard from "@/features/mentors/components/students/mentor-card";
import { getMembershipActive } from "@/features/settings/actions/get-membership-active";
import { redirect } from "next/navigation";

const MentorPage = async () => {

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/')
  }

  const membershipActive = await getMembershipActive(session.user.id)
  const mentors = await getMentorsPublished()
  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Mentorias"
        description="Descubre las mentorias disponibles"
        bgColor="bg-gradient-to-r from-blue-500 to-blue-400"
        icon="mentor"
        iconColor="text-white"
      />
      <div className="px-2 md:px-6">
        {mentors.length === 0 && (
          <div className="text-sm p-6 text-gray-500">
            <p>No hay mentores disponibles</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3">
          {mentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              isPremium={!!membershipActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MentorPage;