import Link from "next/link"
import { redirect } from "next/navigation"
import { Banner } from "@/components/ui/banner"
import { IconBadge } from "@/components/ui/icon-badge"
import EventActions from "@/features/events/components/event-actions"
import EventDateForm from "@/features/events/components/event-date-form"
import EventDescriptionForm from "@/features/events/components/event-description-form"
import EventImageForm from "@/features/events/components/event-image-form"
import EventTitleForm from "@/features/events/components/event-title-form"
import EventTypeForm from "@/features/events/components/event-type-form"
import { ArrowLeft, CalendarArrowDown, LayoutGrid, Link2, ListCheckIcon } from "lucide-react"
import { getEventById } from "@/features/events/actions/get-event-by-id"
import EventTimeForm from "@/features/events/components/event-time-form"
import EventLinkForm from "@/features/events/components/event-link-form"
import EventLocationForm from "@/features/events/components/event-location-form"
import EventOrganizersForm from "@/features/events/components/event-organizers-form"
import EventExternalLinkForm from "@/features/events/components/event-external-link-form"

type EventIdPageProps = {
  params: {
    eventId: string
  }
}

export default async function EventIdPage({
  params
}: EventIdPageProps) {
  const eventId = params.eventId
  const event = await getEventById(eventId)
  if (!event) {
    return redirect('/teacher/events')
  }

  const requiredField = [
    event.title,
    event.description,
    event.imageUrl,
    event.type,
    event.date,
    event.externalLink
  ]

  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredField.every(Boolean)

  return (
    <>
      {!event.isPublished && (
        <Banner
          label="Este evento no es visible para los estudiantes"
        />
      )}
      <div className="p-6">
        <Link
          href={`/teacher/events`}
          className="flex itesm-center text-sm hover:opacity-75 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Regresar al listado
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">
              Configuracion del evento
            </h1>
            <span className="text-sm text-slate-700">
              Completa todos los campos {completionText}
            </span>
          </div>
          <EventActions
            disabled={!isComplete}
            eventId={eventId}
            isPublished={event.isPublished}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-12">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={LayoutGrid} />
            <h2 className="text-xl">
              Personaliza tu evento
            </h2>
          </div>
          <EventTitleForm
            eventId={event.id}
            initialData={{ title: event.title }}
          />
          <EventDescriptionForm
            eventId={event.id}
            initialData={{ description: event.description || '' }}
          />
          <EventImageForm
            eventId={event.id}
            initialData={{ image: event.imageUrl || '' }}
          />
          <EventOrganizersForm
            eventId={event.id}
            initialData={{ organizer: event.organizer || '' }}
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={Link2} />
            <h2 className="text-xl">
              Enlace externo
            </h2>
          </div>
          <EventExternalLinkForm
            eventId={event.id}
            initialData={{ externalLink: event.externalLink || '' }}
          />
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={CalendarArrowDown} />
            <h2 className="text-xl">
              Fecha de evento
            </h2>
          </div>
          <EventDateForm
            eventId={event.id}
            initialData={{ date: event.date }}
          />
          <EventTimeForm
            eventId={event.id}
            initialData={{ date: event.date }}
          />
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={ListCheckIcon} />
            <h2 className="text-xl">
              Tipo de evento
            </h2>
          </div>
          <EventTypeForm
            eventId={event.id}
            initialData={event}
            options={[
              { label: 'Presencial', value: 'PRESENTIAL' },
              { label: 'Virtual', value: 'VIRTUAL' },
              { label: 'Hibrido', value: 'VIRTUAL_AND_PRESENTIAL' }
            ]}
          />
          {event.type && (event.type === 'VIRTUAL' || event.type === 'VIRTUAL_AND_PRESENTIAL') && (
            <EventLinkForm
              eventId={event.id}
              initialData={{ link: event.link || '' }}
            />
          )}
          {event.type && (event.type === 'PRESENTIAL' || event.type === 'VIRTUAL_AND_PRESENTIAL') && (
            <EventLocationForm
              eventId={event.id}
              initialData={{ location: event.location || '' }}
            />
          )}

        </div>
      </div>
    </>
  )
}