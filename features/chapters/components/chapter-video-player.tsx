'use client'

import { cn } from "@/lib/utils"
import MuxPlayer from "@mux/mux-player-react"
import { Loader2, Lock } from "lucide-react"
import { useState, useTransition } from "react"
import ChapterYoutubeVideo from "./chpater-youtube-player"
import { useRouter } from "next/navigation"
import { updateCourseMarkAsComplete } from "@/features/courses/actions/update-course-mark-as-complete"
import { toast } from "sonner"
import { useConfetti } from "@/hooks/use-confetti"

interface ChapterVideoPlayerProps {
  chapterId: string
  title: string
  courseId: string
  nextChapterId?: string
  playbackId?: string
  youtubeUrl: string | null
  isLocked: boolean
  completeOnEnd: boolean
}

const ChapterVideoPlayer = ({
  chapterId,
  completeOnEnd,
  courseId,
  isLocked,
  nextChapterId,
  playbackId,
  youtubeUrl,
  title
}: ChapterVideoPlayerProps) => {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false);
  const [isPending, startTransition] = useTransition()
  const [Confetti, openConfetti] = useConfetti()

  const onEnd = async () => {
    startTransition(() => {
      updateCourseMarkAsComplete(courseId, chapterId)
        .then((response) => {
          if (response.error) {
            toast("Error al marcar como completado")
          }

          if (!completeOnEnd && !nextChapterId) {
            openConfetti()
            router.push(`/courses/${courseId}`)
          }

          if (!completeOnEnd && nextChapterId) {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
          }
          toast("¡Capítulo completado!")
          router.refresh()
        })
    })
  }


  return (
    <>
      <div className="relative aspect-video">
        {!isReady && !isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
          </div>
        )}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
            <Lock className="h-8 w-8" />
            <p className="text-sm">
              Este capítulo está bloqueado.
            </p>
          </div>
        )}
        {!isLocked && playbackId && (
          <MuxPlayer
            title={title}
            className={cn(
              !isReady && "hidden"
            )}
            onCanPlay={() => setIsReady(true)}
            onEnded={onEnd}
            autoPlay
            playbackId={playbackId}
          />
        )}
        {!isLocked && youtubeUrl && (
          <ChapterYoutubeVideo
            onEnded={onEnd}
            canOnPlay={() => setIsReady(true)}
            videoUrl={youtubeUrl}
          />
        )}
      </div>
      <Confetti />
    </>
  );
}

export default ChapterVideoPlayer;