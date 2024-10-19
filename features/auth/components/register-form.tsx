'use client'

import { useState, useTransition } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { CardWrapper } from "./card-wrapper"
import { RegisterSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/ui/form-error"
import { FormSuccess } from "@/components/ui/form-success"
import { login } from "../actions/login"
import { register } from "../actions/register"

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)
        })
    })
  }

  return (
    <CardWrapper
      headerLabel="Registro"
      backButtonHref="/auth/login"
      backButtonLabel="Ya tienes cuenta? Inicia Sesion"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Jhon Doe"
                        type='text'
                      />
                    </FormControl>
                  </FormItem>
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="jhon@example.com"
                        type='email'
                      />
                    </FormControl>
                  </FormItem>
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="**********"
                        type='password'
                      />
                    </FormControl>
                  </FormItem>
                </FormControl>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type='submit'
            className="w-full"
            disabled={isPending}
          >
            Iniciar Sesion
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )

}