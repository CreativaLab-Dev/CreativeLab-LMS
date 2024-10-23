'use client'

import * as z from "zod"
import { chapterVideoSchema } from "../schemas";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { FileUpload } from "@/components/ui/file-upload";
import { updateVideoChapter } from "../actions/update-video-chapter";

interface ChapterVideoFormProps {
  initialData: {
    videoUrl: string;
  };
  courseId: string;
  chapterId: string;
}

const ChapterVideoForm = ({
  courseId,
  chapterId,
  initialData
}: ChapterVideoFormProps) => {
  const [, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof chapterVideoSchema>) => {
    startTransition(() => {
      updateVideoChapter(courseId, chapterId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Imagen actualizada");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el imagen');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">Video del curso</span>
        <Button
          onClick={toggleEdit}
          variant='ghost'
        >
          {isEditting && (
            <>Cancel</>
          )}
          {
            !isEditting && !initialData.videoUrl && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Agregar un video
              </>
            )
          }
          {!isEditting && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>
      {!isEditting && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-12 w-12 text-slate-400" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            Video uploaded!
          </div>
        )
      )}
      {isEditting && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className="test-xs text-muted-foreground mt-4">
            Sube tu video en formato mp4
          </div>
        </div>
      )}
      {!initialData.videoUrl && (
        <div className="text-xs text-muted-foreground mt-2">
          Este proceso puede tardar unos minutos
        </div>
      )}

    </div>
  );
}

export default ChapterVideoForm;