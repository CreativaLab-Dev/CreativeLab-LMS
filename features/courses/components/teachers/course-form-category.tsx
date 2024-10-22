'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { EditCourseCategorySchema } from "../../schemas";
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
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { updateCourseCategory } from "../../actions/teachers/update-course-category";
import { Course } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

interface CourseFormCategoryProps {
  initialData: Course
  courseId: string;
  options: { label: string, value: string }[]
}

const CourseFormCategory = ({
  courseId,
  initialData,
  options
}: CourseFormCategoryProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof EditCourseCategorySchema>>({
    resolver: zodResolver(EditCourseCategorySchema),
    defaultValues: {
      categoryId: initialData.categoryId || ''
    }
  });

  const onSubmit = async (data: z.infer<typeof EditCourseCategorySchema>) => {
    startTransition(() => {
      updateCourseCategory(courseId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Categoria actualizada");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el categoria');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  const selectedOption = options.find((option) => option.value === initialData.categoryId);

  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">Categoria de curso</span>
        <Button
          onClick={toggleEdit}
          variant='ghost'
        >
          {
            isEditting && (
              <>Cancelar</>
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
          <p className={cn("text-sm mt-2",
            !initialData?.categoryId && "text-slate-500 italic"
          )}>
            {selectedOption?.label || <span className="text-muted-foreground">Sin categoria</span>}
          </p>
        )
      }
      {
        isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        options={options}
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

export default CourseFormCategory;