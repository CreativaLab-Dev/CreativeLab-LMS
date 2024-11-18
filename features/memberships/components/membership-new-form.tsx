'use client'

import { useEffect, useTransition } from "react"
import { es } from 'date-fns/locale';
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
import { NewMembershipFormSchema } from "../schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox"
import { createNewMembership } from "../actions/create-new-membership"

import {
  format
} from "date-fns"

interface MembershipNewFormProps {
  options: {
    label: string
    value: string
  }[]
}

const MembershipNewForm = ({
  options
}: MembershipNewFormProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof NewMembershipFormSchema>>({
    resolver: zodResolver(NewMembershipFormSchema),
    defaultValues: {
      userId: "",
      type: "",
      startDate: "",
      endDate: "",
      amount: '0',
    }
  })

  const onSubmit = (values: z.infer<typeof NewMembershipFormSchema>) => {
    if (isPending) return
    startTransition(() => {
      createNewMembership(values).then((result) => {
        if (result?.success && result?.id) {
          toast.success("Membresía creada")
          router.push(`/teacher/memberships/${result.id}/edit`)
        }
        if (result?.error) {
          toast.error(result.error)
        }
      })
    })
  }

  useEffect(() => {
    const type = form.getValues("type")
    const startDate = form.getValues("startDate")
    if (!startDate) return
    if (!type) return
    form.setValue("endDate", '')
    const date = new Date(startDate)
    const endDate = type === "monthly"
      ? format(new Date(date.setMonth(date.getMonth() + 1)), "yyyy-MM-dd")
      : format(new Date(date.setFullYear(date.getFullYear() + 1)), "yyyy-MM-dd")
    form.setValue("endDate", endDate)
  }, [form.watch("startDate"), form.watch("type")])

  return (
    <div className="max-w-5xl p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-bold ">
          Crear nueva membresía
        </h1>
        <p className="text-sm text-slate-600">
          Asegúrate de que el usuario tenga una membresía activa
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            <FormField
              control={form.control}
              name='userId'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>
                      Usuario
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        options={options}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      El usuario al que se le asignará la membresía
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>
                      Tipo
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        options={[
                          { label: "Mensual", value: "monthly" },
                          { label: "Anual", value: "yearly" },
                        ]}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      El tipo de membresía
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>
                      Fecha de inicio
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {form.getValues('startDate') &&
                        format(new Date(form.getValues('startDate')), "dd 'de' MMMM, yyyy", { locale: es })}
                      {!form.getValues('startDate') && 'La fecha en la que inicia la membresía'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>
                      Fecha de fin
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {form.getValues('endDate') &&
                        format(new Date(form.getValues('endDate')), "dd 'de' MMMM, yyyy", { locale: es })}
                      {!form.getValues('endDate') &&
                        'La fecha en la que termina la membresía'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>
                      Monto
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      La cantidad a cobrar por la membresía
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/memberships">
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

export default MembershipNewForm