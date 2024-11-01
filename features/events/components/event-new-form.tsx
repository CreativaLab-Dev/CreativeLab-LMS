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
import { NewEventSchema } from "../schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createEvent } from "../actions/create-event"

const EventNewForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof NewEventSchema>>({
    resolver: zodResolver(NewEventSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof NewEventSchema>) => {
    if (isPending) return
    startTransition(() => {
      createEvent(values).then((result) => {
        if (result?.success && result?.id) {
          toast.success("Evento creado exitosamente")
          router.push(`/teacher/events/${result.id}/edit`)
        }
      })
    })
  }

  return (
    <div className="max-w-5xl p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-bold ">
          Nombre de tu evento
        </h1>
        <p className="text-sm text-slate-600">
          Como te gustaría que se llame tu evento?. Este nombre será visible para tus estudiantes.
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
                      Nombre del evento<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Ejemplo: Evento de Matemáticas"
                        type='text'
                      />
                    </FormControl>
                    <FormDescription>
                      Qué nombre le darás al mentor?
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

export default EventNewForm