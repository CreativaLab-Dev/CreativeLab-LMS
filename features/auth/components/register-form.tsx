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
import { register } from "../actions/register"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { EyeClosedIcon, EyeIcon } from "lucide-react"

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "student"
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
          if (data?.success) {
            toast.success("Usuario registrado")
          }
        })
    })
  }

  const onTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <CardWrapper
      headerLabel="Crear cuenta"
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
                    <FormLabel>Nombre
                      <span className="text-red-500">*</span>
                    </FormLabel>
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
            {/* <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>Rol
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Escoger rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Estudiante</SelectItem>
                          <SelectItem value="teacher">Docente</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                </FormControl>
              )}
            /> */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>Email
                      <span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel>Contraseña
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={!showPassword ? "********" : "Contraseña"}
                          type={showPassword ? "text" : "password"}
                        />
                        {/* Add button with eye to watch */}
                        <div
                          className="absolute right-0 top-0 mt-2 mr-3 hover:opacity-90 cursor-pointer"
                          onClick={onTogglePasswordVisibility}
                        >
                          <EyeIcon size={18} />
                        </div>
                      </div>
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
            Registrarse
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )

}