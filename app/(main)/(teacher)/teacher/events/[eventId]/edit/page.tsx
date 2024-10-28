import { Banner } from "@/components/ui/banner"
import { IconBadge } from "@/components/ui/icon-badge"
import CourseFormAttachment from "@/features/courses/components/teachers/course-form-attachment"
import CourseFormCategory from "@/features/courses/components/teachers/course-form-category"
import CourseFormChapter from "@/features/courses/components/teachers/course-form-chapters"
import CourseFormImage from "@/features/courses/components/teachers/course-form-image"
import CourseIsFeaturedForm from "@/features/courses/components/teachers/course-is-featured-form"
import CourseIsNewForm from "@/features/courses/components/teachers/course-is-new-form"
import { getEventById } from "@/features/events/actions/get-event-by-id"
import EventActions from "@/features/events/components/event-actions"
import EventDateForm from "@/features/events/components/event-date-form"
import EventDescriptionForm from "@/features/events/components/event-description-form"
import EventImageForm from "@/features/events/components/event-image-form"
import EventTitleForm from "@/features/events/components/event-title-form"
import { ArrowLeft, CalendarArrowDown, File, LayoutGrid, ListChecks, Type } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

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
    event.date
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
            courseId={event.id}
            initialData={{ title: event.title }}
          />
          <EventDescriptionForm
            courseId={event.id}
            initialData={{ description: event.description || '' }}
          />
          <EventImageForm
            courseId={event.id}
            initialData={{ image: event.imageUrl || '' }}
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={CalendarArrowDown} />
            <h2 className="text-xl">
              Fecha de evento
            </h2>
          </div>
          <EventDateForm
            courseId={event.id}
            initialData={{ date: event.date }}
          />
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={Type} />
            <h2 className="text-xl">
              Tipo de evento
            </h2>
          </div>
          {/* <CourseFormCategory
            courseId={event.id}
            initialData={event}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id
            }))}
          />
          <CourseFormAttachment
            courseId={event.id}
            initialData={event}
          /> */}
        </div>
      </div>
    </>
  )
}