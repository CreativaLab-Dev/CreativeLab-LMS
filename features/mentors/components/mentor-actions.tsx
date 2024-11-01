'use client'

import { toast } from "sonner"
import { Trash } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { useConfetti } from "@/hooks/use-confetti"
import { deleteMentor } from "../actions/delete-mentor"
import { updatePublishMentor } from "../actions/update-publish-mentor"

interface MentorActionsProps {
  disabled: boolean
  mentorId: string
  isPublished: boolean
}

const MentorActions = ({
  mentorId,
  disabled,
  isPublished
}: MentorActionsProps) => {
  const router = useRouter()
  const [Confetti, openConfetti] = useConfetti()
  const [isPending, startTransition] = useTransition()
  const [ConfirmRemoveEvent, confirmRemoveEvent] = useConfirm(
    'Eliminar mentor',
    '¿Estas seguro de eliminar este mentor?'
  )

  const onDeleteChapter = async () => {
    const ok = await confirmRemoveEvent()
    if (!ok) {
      return
    }

    startTransition(() => {
      deleteMentor(mentorId)
        .then((response) => {
          if (response.success) {
            toast.success("Mentor eliminado correctamente")
            router.push("/teacher/events")
          }
          if (response.error) {
            toast.error("Error al eliminar el mentor")
          }
        })
    })
  }

  const onPublish = () => {
    startTransition(() => {
      updatePublishMentor(mentorId, !isPublished)
        .then((response) => {
          if (response.success) {
            if (!isPublished) {
              openConfetti()
            }
            const messageToast = isPublished ? "Mentor ocultado" : "Mentor publicado"
            toast.success(messageToast)
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
          variant={isPublished ? 'destructive' : 'primary'}
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

export default MentorActions;