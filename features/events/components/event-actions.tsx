'use client'

import { toast } from "sonner"
import { Trash } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { useConfetti } from "@/hooks/use-confetti"
import { deleteEvent } from "../actions/delete-event"
import { updatePublishEvent } from "../actions/update-publish-event"

interface ChapterActionsProps {
  disabled: boolean
  eventId: string
  isPublished: boolean
}

const EventActions = ({
  eventId,
  disabled,
  isPublished
}: ChapterActionsProps) => {
  const router = useRouter()
  const [Confetti, openConfetti] = useConfetti()
  const [isPending, startTransition] = useTransition()
  const [ConfirmRemoveEvent, confirmRemoveEvent] = useConfirm(
    'Eliminar evento',
    '¿Estas seguro de eliminar este evento?'
  )

  const onDeleteChapter = async () => {
    const ok = await confirmRemoveEvent()
    if (!ok) {
      return
    }

    startTransition(() => {
      deleteEvent(eventId)
        .then((response) => {
          if (response.success) {
            toast.success("Evento eliminado correctamente")
            router.push("/teacher/events")
          }
          if (response.error) {
            toast.error("Error al eliminar el evento")
          }
        })
    })
  }

  const onPublish = () => {
    startTransition(() => {
      updatePublishEvent(eventId, isPublished)
        .then((response) => {
          if (response.success) {
            if (!isPublished) {
              openConfetti()
            }
            toast.success("Evento publicado")
            router.refresh()
          }
          if (response.error) {
            toast.error("Error al publicar el evento")
          }
        })
    })
  }

  return (
    <>
      <div className="flex itesm-center gap-x-2">
        <Button
          onClick={onPublish}
          disabled={disabled || isPending}
          variant={isPublished ? 'destructive' : 'outline'}
          size='sm'
        >
          {isPublished ? 'Ocultar' : 'Publicar'}
        </Button>
        <Button
          size='sm'
          disabled={disabled || isPending}
          onClick={onDeleteChapter}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Confetti />
      <ConfirmRemoveEvent />
    </>

  );
}

export default EventActions;