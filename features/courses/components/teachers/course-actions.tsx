'use client'

import { toast } from "sonner"
import { Trash } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { deleteCourse } from "../../actions/teachers/delete-course"
import { updatePublishCourse } from "../../actions/teachers/update-publish-course"
import { useConfetti } from "@/hooks/use-confetti"

interface ChapterActionsProps {
  disabled: boolean
  courseId: string
  isPublished: boolean
}

const CourseActions = ({
  courseId,
  disabled,
  isPublished
}: ChapterActionsProps) => {
  const router = useRouter()
  const [Confetti, open] = useConfetti()
  const [isPending, startTransition] = useTransition()
  const [ConfirmRemoveCourse, confirmRemoveCourse] = useConfirm(
    'Eliminar curso',
    '¿Estas seguro de eliminar este curso?'
  )

  const onDeleteChapter = async () => {
    const ok = await confirmRemoveCourse()
    if (!ok) {
      return
    }

    startTransition(() => {
      deleteCourse(courseId)
        .then((response) => {
          if (response.success) {
            toast.success("Curso eliminado correctamente")
            router.push("/teacher/courses")
          }
          if (response.error) {
            toast.error("Error al eliminar el curso")
          }
        })
    })
  }

  const onPublish = () => {
    startTransition(() => {
      updatePublishCourse(courseId)
        .then((response) => {
          if (response.success) {
            if (!isPublished) {
              open()
            }
            toast.success("Curso publicado")
            router.refresh()
          }
          if (response.error) {
            toast.error("Error al eliminar el curso")
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
          variant='destructive'
          disabled={disabled || isPending}
          onClick={onDeleteChapter}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Confetti />
      <ConfirmRemoveCourse />
    </>

  );
}

export default CourseActions;