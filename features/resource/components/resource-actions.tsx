'use client'

import { toast } from "sonner"
import { Trash } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { useConfetti } from "@/hooks/use-confetti"
import { deleleResource } from "../actions/delete-resource"
import { updatePublishResource } from "../actions/update-publish-resource"

interface ResourceActionsProps {
  disabled: boolean
  resourceId: string
  isPublished: boolean
}

const ResourceActions = ({
  resourceId,
  disabled,
  isPublished
}: ResourceActionsProps) => {
  const router = useRouter()
  const [Confetti, openConfetti] = useConfetti()
  const [isPending, startTransition] = useTransition()
  const [ConfirmRemoveEvent, confirmRemoveEvent] = useConfirm(
    'Eliminar recurso',
    '¿Estas seguro de eliminar este recurso?'
  )

  const onDeleteChapter = async () => {
    const ok = await confirmRemoveEvent()
    if (!ok) {
      return
    }

    startTransition(() => {
      deleleResource(resourceId)
        .then((response) => {
          if (response.success) {
            toast.success("Recurso eliminado correctamente")
            router.push("/teacher/events")
          }
          if (response.error) {
            toast.error("Error al eliminar el recurso")
          }
        })
    })
  }

  const onPublish = () => {
    startTransition(() => {
      updatePublishResource(resourceId, !isPublished)
        .then((response) => {
          if (response.success) {
            if (!isPublished) {
              openConfetti()
            }
            const messageToast = isPublished ? "Recurso ocultado" : "Recurso publicado"
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

export default ResourceActions;