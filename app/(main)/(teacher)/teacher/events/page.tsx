import { PageParamasProps } from "@/dtype";
import HeaderPage from "@/components/ui/header-page";
import { getEventsOfTeacher } from "@/features/events/actions/get-events-of-teacher";
import EventList from "@/features/events/components/events-list";


export default async function EventTeacherPage(
  searchParams: PageParamasProps
) {
  const { events, pagination } = await getEventsOfTeacher(searchParams)
  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Mis eventos"
        description="Aquí encontrarás todos los eventos que has creado"
        bgColor="bg-sky-200"
        icon="event"
        iconColor="text-sky-500"
      />
      <div className="px-10 md:px-8">
        <EventList
          events={events}
          pagination={pagination}
          url="/teacher/events"
        />
      </div>
    </div>
  );
}