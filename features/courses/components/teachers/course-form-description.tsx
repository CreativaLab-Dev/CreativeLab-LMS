'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { EditCourseDescriptionSchema } from "../../schemas";
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
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateCourseDescription } from "../../actions/teachers/update-course-description";
import { Textarea } from "@/components/ui/textarea";

interface CourseFormDescriptionProps {
  initialData: {
    description: string;
  };
  courseId: string;
}

const CourseFormDescription = ({ courseId, initialData }: CourseFormDescriptionProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof EditCourseDescriptionSchema>>({
    resolver: zodResolver(EditCourseDescriptionSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof EditCourseDescriptionSchema>) => {
    startTransition(() => {
      updateCourseDescription(courseId, data)
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
        Titulo de curso
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
          <p className="text-sm mt-2">
            {
              initialData.description || <span className="text-muted-foreground">Sin descripción</span>
            }
          </p>
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
                      <Textarea
                        disabled={isPending}
                        placeholder="Descripción del curso"
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

export default CourseFormDescription;