'use client'

import { useTransition } from "react"
import * as z from "zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormLabel,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { NewCourseSchema } from "../../schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createNewCourse } from "../../actions/teachers/create-new-course"

const CourseFormNew = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof NewCourseSchema>>({
    resolver: zodResolver(NewCourseSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof NewCourseSchema>) => {
    if (isPending) return
    startTransition(() => {
      createNewCourse(values).then((result) => {
        if (result?.success && result?.id) {
          toast.success("Curso creado exitosamente")
          router.push(`/teacher/courses/${result.id}/edit`)
        }
      })
    })
  }

  return (
    <div className="max-w-5xl p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-bold ">
          Nombre de tu curso
        </h1>
        <p className="text-sm text-slate-600">
          Como te gustaría que se llame tu curso? No te preocupes, podrás cambiarlo después.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>
                      Nombre del curso<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Ejemplo: 'Curso de Matemáticas'"
                        type='text'
                      />
                    </FormControl>
                    <FormDescription>
                      ¿Qué quieres enseñar en este curso?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/courses">
                <Button
                  type='button'
                  variant='ghost'
                  disabled={isPending}
                >
                  Cancelar
                </Button>
              </Link>
              <Button
                type='submit'
                variant='primary'
                disabled={isPending}
              >
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CourseFormNew