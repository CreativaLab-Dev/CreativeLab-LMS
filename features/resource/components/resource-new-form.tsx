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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NewResourceFormSchema } from "../schemas"
import { createNewResource } from "../actions/create-new-resource"

const ResourceNewForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof NewResourceFormSchema>>({
    resolver: zodResolver(NewResourceFormSchema),
    defaultValues: {
      title: ""
    }
  })

  const onSubmit = (values: z.infer<typeof NewResourceFormSchema>) => {
    if (isPending) return
    startTransition(() => {
      createNewResource(values).then((result) => {
        if (result?.success && result?.id) {
          toast.success("Recurso creado exitosamente")
          router.push(`/teacher/resources/${result.id}/edit`)
        } else {
          toast.error("Ocurrió un error al crear el recurso")
        }
      })
    })
  }

  return (
    <div className="max-w-5xl p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-bold ">
          Titulo del recurso
        </h1>
        <p className="text-sm text-slate-600">
          Asegúrate de que el titulo sea descriptivo y fácil de recordar.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>
                      Titulo
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Ejemplo: Tips de liderazgo"
                        type='text'
                      />
                    </FormControl>
                    <FormDescription>
                      Qué titulo le darás a tu recurso?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/resource">
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

export default ResourceNewForm