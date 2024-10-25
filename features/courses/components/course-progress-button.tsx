'use client'

import { Button } from "@/components/ui/button"
import { useConfetti } from "@/hooks/use-confetti"
import { CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"
import { updateCourseMarkAsComplete } from "../actions/update-course-mark-as-complete"

interface CourseProgressButtonProps {
  chapterId: string
  courseId: string
  nextChapterId?: string
  isCompleted?: boolean
}

const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId
}: CourseProgressButtonProps) => {
  const router = useRouter()
  const [Confetti, openConfetti] = useConfetti()
  const [isPending, startTransition] = useTransition()

  const Icon = isCompleted ? XCircle : CheckCircle

  const onClick = async () => {
    startTransition(() => {
      updateCourseMarkAsComplete(courseId, chapterId)
        .then((response) => {
          if (response.error) {
            toast("Error al marcar como completado")
          }

          if (!isCompleted && !nextChapterId) {
            openConfetti()
            router.push(`/courses/${courseId}`)
          }

          if (!isCompleted && nextChapterId) {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
          }
          toast("¡Capítulo completado!")
          router.refresh()
        })
    })

  }

  return (
    <>
      <Button
        type='button'
        variant={isCompleted ? "outline" : "success"}
        onClick={onClick}
        disabled={isPending}
      >
        {isCompleted ? 'No completado' : 'Marcar como completado'}
        <Icon className="h-4 w-4 ml-2" />
      </Button>
      <Confetti />
    </>
  );
}

export default CourseProgressButton;