'use client'

import Image from "next/image"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
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
import { AddNewCourse } from "../actions/add-new-course"
import { NewCourseSchema } from "../schemas"
import { FormError } from "@/components/ui/form-error"

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
      isFeatured: false,
      isNew: false,
    }
  })

  const onSubmit = (values: z.infer<typeof NewCourseSchema>) => {
    startTransition(() => {
      AddNewCourse(values)
        .then((response) => {
          if (response?.error) {
            setError(response.error)
          }
          // if (response?.success) {
          //   // TODO: TOAST
          //   // toast({
          //   //   description: "Perfil actualizado correctamente!!",
          //   //   variant: "success",
          //   // })
          router.push(`/courses`)
          // }
        })
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

                  <div className="relative w-96 h-72">
                    <Image
                      src={form.getValues('imagePath') || "https://github.com/shadcn.png"}
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
                  <FormItem>
                    <FormLabel>Principal</FormLabel>
                    <FormControl>
                      <Checkbox
                        className="ml-2"
                        onClick={() => {
                          field.onChange(!field.value)
                        }}
                        disabled={isPending} />
                    </FormControl>
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
                  <FormItem>
                    <FormLabel>Es nuevo</FormLabel>
                    <FormControl>
                      <Checkbox
                        className="ml-2"
                        onClick={() => {
                          field.onChange(!field.value)
                        }}
                        disabled={isPending} />
                    </FormControl>
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