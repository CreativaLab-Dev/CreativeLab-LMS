'use client'

import * as z from "zod"
import { chapterVideoSchema, chapterYoutubeSchema } from "../schemas";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { FileUpload } from "@/components/ui/file-upload";
import { updateVideoChapter } from "../actions/update-video-chapter";
import MuxPlayer from "@mux/mux-player-react"
import { Chapter, MuxData } from "@prisma/client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { updateYoutubeChapter } from "../actions/update-youtube-chapter";
import ChapterYoutubeVideoForm from "./chapter-youtube-form";

interface ChapterVideoFormProps {
  initialData: Chapter & {
    muxData: MuxData | null,
  }
  courseId: string;
  chapterId: string;
}

const ChapterVideoForm = ({
  courseId,
  chapterId,
  initialData
}: ChapterVideoFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const toggleEdit = () => setIsEditting((current) => !current);

  const form = useForm<z.infer<typeof chapterYoutubeSchema>>({
    resolver: zodResolver(chapterYoutubeSchema),
    defaultValues: {
      youtubeUrl: initialData.youtubeUrl || ''
    }
  });

  const tabDefault = initialData.youtubeUrl ? 'youtube' : 'own';

  const onSubmit = async (data: z.infer<typeof chapterVideoSchema>) => {
    startTransition(() => {
      updateVideoChapter(courseId, chapterId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Video actualizado");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el video');
          }
        })
    })
  };

  const onSubmitYoutube = async (data: z.infer<typeof chapterYoutubeSchema>) => {
    startTransition(() => {
      updateYoutubeChapter(courseId, chapterId, { youtubeUrl: data.youtubeUrl })
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Video actualizado");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el video');
          }
        })
    })
  }

  return (
    <div className="mt-6 border bg-blue-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Video del curso
          <span className="text-red-500">*</span>
        </span>
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
        !initialData.videoUrl && !initialData.youtubeUrl && (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-12 w-12 text-slate-400" />
          </div>
        )
      )}
      {!isEditting && initialData.videoUrl && (
        (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
            />
          </div>
        )
      )}
      {!isEditting && initialData.youtubeUrl && (
        (
          <div className="relative aspect-video mt-2">
            <ChapterYoutubeVideoForm videoUrl={initialData.youtubeUrl || ''} />
          </div>
        )
      )}
      {isEditting && (
        <div>
          <Tabs defaultValue={tabDefault}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="own">Propio</TabsTrigger>
              <TabsTrigger value="youtube">Youtube</TabsTrigger>
            </TabsList>
            <TabsContent value="own">
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
            </TabsContent>
            <TabsContent value="youtube">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitYoutube)}>
                  <FormField
                    control={form.control}
                    name="youtubeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder="Ejemplo 'https://www.youtube.com/watch?v=123456'"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-x-2">
                    <Button
                      type="submit"
                      disabled={isPending}
                    >
                      Guardar
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      )}
      {!initialData.videoUrl && (
        <div className="text-xs text-muted-foreground mt-2">
          Este proceso puede tardar unos minutos
        </div>
      )}
      {initialData.videoUrl && (
        <div className="text-xs text-muted-foreground mt-2">
          Refresca la pagina si no se ve el video
        </div>
      )}

    </div>
  );
}

export default ChapterVideoForm;