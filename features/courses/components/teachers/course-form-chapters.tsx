'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { EditCourseChapterSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { createChapter } from "../../actions/teachers/create-chapter";
import { Input } from "@/components/ui/input";
import ChaptersList from "./course-form-modules";
import { updateChapters } from "../../actions/teachers/update-modules";

interface CourseFormChapterProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const CourseFormChapter = ({ courseId, initialData }: CourseFormChapterProps) => {
  const [isPending, startTransition] = useTransition()

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();
  const form = useForm<z.infer<typeof EditCourseChapterSchema>>({
    resolver: zodResolver(EditCourseChapterSchema),
    defaultValues: {
      title: ''
    }
  });

  const onReorder = async (updateData: { id: string, position: number }[]) => {
    setIsUpdating(true);
    startTransition(() => {
      setIsUpdating(true);
      updateChapters(courseId, updateData)
        .then((response) => {
          if (response.success) {
            setIsUpdating(false);
            toast.success("Capitulos reordenados correctamente");
          } else {
            toast.error(response?.error ?? 'Error al actualizar los capitulos');
          }
        })
        .finally(() => {
          setIsUpdating(false);
        })
    })
  };

  const onSubmit = async (data: z.infer<typeof EditCourseChapterSchema>) => {
    startTransition(() => {
      createChapter(courseId, data)
        .then((response) => {
          if (response.success) {
            setIsCreating(false);
            toast.success("Capitulo creado correctamente");
            router.refresh();
            form.reset();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el capitulo');
          }
        })
    })
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`)
  }

  return (
    <div className="relative mt-6 border bg-sky-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">Capitulo del curso</span>
        <Button
          onClick={toggleCreating}
          variant='ghost'
        >
          {
            isCreating && (
              <>Cancel</>
            )
          }
          {
            !isCreating && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Agregar
              </>
            )
          }
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="e.g Introducción al curso"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
            >
              Guardar
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.chapters.length && "text-slate-500 italic"
        )}>
          {!initialData.chapters.length && "No hay capitulos en este curso"}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop para reordenar los capitulos
        </p>
      )}
    </div>
  );
}

export default CourseFormChapter;