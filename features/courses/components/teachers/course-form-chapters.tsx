'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
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
import { PlusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Course, Module } from "@prisma/client";
import { createChapter } from "../../actions/teachers/create-chapter";
import { Input } from "@/components/ui/input";
import ModulesList from "./course-form-modules";

interface CourseFormChapterProps {
  initialData: Course & { modules: Module[] };
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

  const onSubmit = async (data: z.infer<typeof EditCourseChapterSchema>) => {
    startTransition(() => {
      createChapter(courseId, data)
        .then((response) => {
          if (response.success) {
            setIsCreating(false);
            toast.success("Modulo creado correctamente");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el modulo');
          }
        })
    })
  };

  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">Modulos del curso</span>
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
          !initialData.modules.length && "text-slate-500 italic"
        )}>
          {!initialData.modules.length && "No hay modulos en este curso"}
          <ModulesList
            onEdit={() => { }}
            onReorder={() => { }}
            items={initialData.modules}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop para reordenar los modulos
        </p>
      )}
    </div>
  );
}

export default CourseFormChapter;