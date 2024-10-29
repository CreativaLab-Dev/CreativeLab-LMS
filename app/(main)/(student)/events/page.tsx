import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import HeaderPage from "@/components/ui/header-page";
import { getEventsPublished } from "@/features/events/actions/get-events-published";
import EventCard from "@/features/events/components/students/event-card";
import { getMembershipActive } from "@/features/settings/actions/get-membership-active";
import { redirect } from "next/navigation";

const EventPage = async () => {

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/')
  }

  const membershipActive = await getMembershipActive(session.user.id)
  const events = await getEventsPublished()
  return (
    <div className="p-6 space-y-4">
      <HeaderPage
        title="Eventos"
        description="Descubre los eventos que tenemos para ti."
        bgColor="bg-gradient-to-r from-blue-500 to-blue-400"
        icon="event"
        iconColor="text-white"
      />
      {events.length === 0 && (
        <div className="text-sm p-6 text-gray-500">
          <p>No hay eventos disponibles</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-3">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isPremium={!!membershipActive}
          />
        ))}
        {/* Mostrar un botton para ver mas */}
      </div>

    </div>
  );
}

export default EventPage;