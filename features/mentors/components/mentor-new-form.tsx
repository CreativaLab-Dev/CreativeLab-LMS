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
import { NewMentorFormSchema } from "../schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createMentor } from "../actions/create-mentor"

const MentorNewForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof NewMentorFormSchema>>({
    resolver: zodResolver(NewMentorFormSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof NewMentorFormSchema>) => {
    if (isPending) return
    startTransition(() => {
      createMentor(values).then((result) => {
        if (result?.success && result?.id) {
          toast.success("Mentor creado exitosamente")
          router.push(`/teacher/mentors/${result.id}/edit`)
        }
      })
    })
  }

  return (
    <div className="max-w-5xl p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-bold ">
          Nombre del mentor
        </h1>
        <p className="text-sm text-slate-600">
          Asegúrate de que el nombre sea único y fácil de recordar
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
                      Nombre completo<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Ejemplo: Carlos Pérez Quispe"
                        type='text'
                      />
                    </FormControl>
                    <FormDescription>
                      Qué nombre le darás a tu evento?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/mentors">
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

export default MentorNewForm