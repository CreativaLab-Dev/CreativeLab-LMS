'use client'

import { toast } from "sonner"
import { Trash } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { deleteChapter } from "../actions/delete-chapter"
import { updatePublishChapter } from "../actions/update-publish-chapter"
import { useConfetti } from "@/hooks/use-confetti"

interface ChapterActionsProps {
  disabled: boolean
  courseId: string
  chapterId: string
  isPublished: boolean
}

const ChapterActions = ({
  chapterId,
  courseId,
  disabled,
  isPublished
}: ChapterActionsProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [ConfirmRemoveChapter, confirmRemoveChapter] = useConfirm(
    'Eliminar capitulo',
    '¿Estas seguro de eliminar este capitulo?'
  )

  const onDeleteChapter = async () => {
    const ok = await confirmRemoveChapter()
    if (!ok) {
      return
    }

    startTransition(() => {
      deleteChapter(courseId, chapterId)
        .then((response) => {
          if (response.success) {
            toast.success("Capitulo eliminado")
            router.push("/teacher/courses")
          }
          if (response.error) {
            toast.error("Error al eliminar el capitulo")
          }
        })
    })
  }

  const onPublish = () => {
    startTransition(() => {
      updatePublishChapter(courseId, chapterId)
        .then((response) => {
          if (response.success) {
            toast.success("Capitulo publicado")
            router.refresh()
          }
          if (response.error) {
            toast.error("Error al eliminar el capitulo")
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
      <ConfirmRemoveChapter />
    </>

  );
}

export default ChapterActions;