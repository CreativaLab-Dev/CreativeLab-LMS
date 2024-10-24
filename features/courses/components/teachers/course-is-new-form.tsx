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
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { EditCourseIsNewSchema } from "../../schemas";
import { updateCourseIsNew } from "../../actions/teachers/update-course-is-new";

interface CourseIsNewFormProps {
  initialData: {
    isNew: boolean;
  };
  courseId: string;
}

const CourseIsNewForm = ({
  courseId,
  initialData
}: CourseIsNewFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof EditCourseIsNewSchema>>({
    resolver: zodResolver(EditCourseIsNewSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof EditCourseIsNewSchema>) => {
    startTransition(() => {
      updateCourseIsNew(courseId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Curso actualizado")
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el curso');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">Es nuevo</span>
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
            !initialData.isNew && "text-slate-500 italic"
          )}>
            {initialData.isNew
              ? <>Este capitulo es nuevo</>
              : <>Este capitulo no es nuevo</>
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
                name="isNew"
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
                        Mapea si es nuevo
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

export default CourseIsNewForm;