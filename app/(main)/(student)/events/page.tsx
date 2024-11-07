import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import HeaderPage from "@/components/ui/header-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEventsNewPublished } from "@/features/events/actions/get-events-new-published";
import { getEventsPastPublished } from "@/features/events/actions/get-events-past-published";
import EventCard from "@/features/events/components/students/event-card";
import { getMembershipActive } from "@/features/settings/actions/get-membership-active";
import { redirect } from "next/navigation";

const EventPage = async () => {

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/')
  }

  const membershipActive = await getMembershipActive(session.user.id)
  const eventsNew = await getEventsNewPublished()
  const eventsPast = await getEventsPastPublished()
  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Eventos"
        description="Descubre los eventos que tenemos para ti."
        bgColor="bg-gradient-to-r from-blue-500 to-blue-400"
        icon="event"
        iconColor="text-white"
      />
      <div className="px-4 md:px-6">
        <Tabs defaultValue="new">
          <TabsList className="grid grid-cols-1 mb-10 sm:mb-2 sm:grid-cols-2 max-w-sm">
            <TabsTrigger value="new">Nuevos</TabsTrigger>
            <TabsTrigger value="pass">Pasados</TabsTrigger>
          </TabsList>
          <TabsContent value="new">
            {eventsNew.length === 0 && (
              <div className="text-sm p-6 text-gray-500">
                <p>No hay eventos disponibles</p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3">
              {eventsNew.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isPremium={!!membershipActive}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pass">
            {eventsPast.length === 0 && (
              <div className="text-sm p-6 text-gray-500">
                <p>No hay eventos disponibles</p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3">
              {eventsPast.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isPremium={!!membershipActive}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default EventPage;