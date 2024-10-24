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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Editor from "@/components/ui/editor";
import { chapterAccessSchema } from "../schemas";
import Preview from "@/components/ui/preview";
import { updateAccessChapter } from "../actions/update-access-chapter";
import { Checkbox } from "@/components/ui/checkbox";

interface ChapterAccessFormProps {
  initialData: {
    isFree: boolean;
  };
  courseId: string;
  chapterId: string;
}

const ChapterAccessForm = ({
  courseId,
  chapterId,
  initialData
}: ChapterAccessFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof chapterAccessSchema>>({
    resolver: zodResolver(chapterAccessSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof chapterAccessSchema>) => {
    startTransition(() => {
      updateAccessChapter(courseId, chapterId, data)
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
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Acceso al capitulo
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
          <div className={cn(
            "text-sm mt-2",
            !initialData.isFree && "text-slate-500 italic"
          )}>
            {initialData.isFree
              ? <>Este capitulo es gratis para la preview</>
              : <>Este capitulo no es gratis</>
            }
          </div>
        )
      }
      {
        isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormDescription>
                        Mapea el capitulo como gratis
                      </FormDescription>
                    </div>
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

export default ChapterAccessForm;