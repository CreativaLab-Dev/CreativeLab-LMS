'use client'

import Image from "next/image"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Course } from "@prisma/client"
import { UploadDropzone } from "@/utils/uploadthing"
import { PencilIcon, X } from "lucide-react"
import { AddNewCourseOfTeacher } from "../actions/add-new-course-of-teacher"
import { NewCourseSchema } from "../schemas"
import { FormError } from "@/components/ui/form-error"
import { UpdateCourseOfTeacherById } from "../actions/update-course-of-teacher-by-id"

interface CourseFormAddProps {
  course?: Course
}

export const CourseForm = ({ course }: CourseFormAddProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEdittingImage, setIsEdittingImage] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter()

  const form = useForm<z.infer<typeof NewCourseSchema>>({
    resolver: zodResolver(NewCourseSchema),
    defaultValues: {
      name: course?.name || "",
      description: course?.description || "",
      imagePath: course?.imagePath || "",
      isFeatured: course?.isFeatured || false,
      isNew: course?.isNew || false,
    }
  })

  const onSubmit = (values: z.infer<typeof NewCourseSchema>) => {

    startTransition(() => {
      if (course?.id) {
        UpdateCourseOfTeacherById(course.id, values)
          .then((response) => {
            if (response?.error) {
              setError(response.error)
            }
            if (response?.success) {
              toast.success("Curso actualizado exitosamente")
              router.refresh()
            }
          })
      } else {
        AddNewCourseOfTeacher(values)
          .then((response) => {
            if (response?.error) {
              setError(response.error)
            }
            if (response?.success) {
              toast.success("Curso creado exitosamente")
              router.push(`/teacher/courses`)
            }
          })
      }

    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div className="rounded py-4 px-10 flex flex-col md:flex-row gap-y-4 gap-x-4 md:gap-x-8 justify-center items-center">

            {
              isEdittingImage || !form.getValues('imagePath')
                ? <div className="relative">
                  <UploadDropzone
                    className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
                    endpoint="imageUploader"
                    content={{
                      button: "Subir imagen",
                    }}
                    onClientUploadComplete={(res) => {
                      if (res.length > 0) {
                        form.setValue('imagePath', res[0].url)
                      }
                      setIsEdittingImage(false)
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                  {/* Cancel editting */}
                  {
                    form.getValues('imagePath') && <Button
                      size='icon'
                      variant='destructive'
                      type='button'
                      onClick={() => setIsEdittingImage(false)}
                      className="absolute right-0 bottom-0 rounded-full">
                      <X size={12} />
                    </Button>
                  }

                </div>
                : <div className="relative">

                  <div className="relative w-96 h-56">
                    <Image
                      src={form.getValues('imagePath') || "https://github.com/shadcn.png"}
                      className="rounded"
                      objectFit="cover"
                      alt="user"
                      fill
                    />
                  </div>
                  <Button
                    size='icon'
                    variant='ghost'
                    type='button'
                    onClick={() => setIsEdittingImage(true)}
                    className="absolute right-0 bottom-0 bg-gray-800 text-white rounded-full p-1"
                  >
                    <PencilIcon size={12} />
                  </Button>
                </div>
            }
          </div>
          <h1 className="text-lg md:text-xl font-bold">
            Información del curso
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>
                      Nombre <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Curso de programación"
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>Descripccion
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Detalla el curso que estas ofreciendos"
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name='isFeatured'
              render={({ field }) => (
                <FormControl>
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Principal</FormLabel>
                      <FormDescription>Mostrar en la sección de destacados</FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name='isNew'
              render={({ field }) => (
                <FormControl>
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Nuevo</FormLabel>
                      <FormDescription>Mostrar en la sección de nuevos</FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
          </div>
          <FormError message={error} />
        </div>
        <Button
          type='submit'
          className="w-full"
          disabled={isPending}
        >
          Guardar
        </Button>
      </form>
    </Form >
  )

}