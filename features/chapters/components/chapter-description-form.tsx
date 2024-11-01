'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Editor from "@/components/ui/editor";
import { chapterDescriptionSchema } from "../schemas";
import { updateDescriptionChapter } from "../actions/update-description-chapter";
import Preview from "@/components/ui/preview";

interface ChapterDescriptionFormProps {
  initialData: {
    description: string;
  };
  courseId: string;
  chapterId: string;
}

const ChapterDescriptionForm = ({
  courseId,
  chapterId,
  initialData
}: ChapterDescriptionFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof chapterDescriptionSchema>>({
    resolver: zodResolver(chapterDescriptionSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof chapterDescriptionSchema>) => {
    startTransition(() => {
      updateDescriptionChapter(courseId, chapterId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Descripción actualizada");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el titulo');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-blue-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Descripción del capitulo
          <span className="text-red-500">*</span>
        </span>
        <Button
          onClick={toggleEdit}
          variant='ghost'
        >
          {
            isEditting && (
              <>Cancel</>
            )
          }
          {
            !isEditting && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </>
            )
          }
        </Button>
      </div>
      {
        !isEditting && (
          <div className={cn("text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}>
            {!initialData.description && <span className="text-muted-foreground">Sin descripción</span>}
            {initialData.description && <Preview value={initialData.description} />}
          </div>
        )
      }
      {
        isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor
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
        )
      }

    </div>
  );
}

export default ChapterDescriptionForm;