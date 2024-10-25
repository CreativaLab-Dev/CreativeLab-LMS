'use client'

import { useState, useTransition } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ProfileSchema } from "@/features/profile/schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { updateProfile } from "../actions/update-profile"
import { useToast } from "@/hooks/use-toast"
import { UploadButton } from "@/utils/uploadthing"
import { PencilIcon, X } from "lucide-react"

interface ProfileFormProps {
  currentUser: User
}

export const ProfileForm = ({ currentUser }: ProfileFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEdittingImage, setIsEdittingImage] = useState(false);
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: currentUser?.name || "",
      aboutMe: currentUser?.aboutMe || "",
      age: '' + currentUser?.age || "",
      image: currentUser?.image || "",
    }
  })

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      updateProfile(values)
        .then((response) => {
          if (response?.success) {
            toast({
              description: "Perfil actualizado correctamente!!",
              variant: "success",
            })
            router.refresh()
          }
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
          <div className="bg-gray-900 rounded py-4 px-10 flex flex-col md:flex-row gap-y-4 gap-x-4 md:gap-x-8 justify-center items-center">

            {
              isEdittingImage
                ? <div className="relative">
                  <UploadButton
                    className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
                    endpoint="userAvatar"
                    content={{
                      button: "Cambiar",
                    }}
                    appearance={{
                      button: {
                        background: "#000",
                        padding: "2rem",
                        color: "#fff",
                        borderRadius: "100%",
                        height: "6rem",
                        width: "6rem",
                      },
                      container: {
                        display: "flex",
                        background: "transparent",
                      },
                    }}
                    onClientUploadComplete={(res) => {
                      if (res.length > 0) {
                        form.setValue('image', res[0].url)
                      }
                      setIsEdittingImage(false)
                      onSubmit(form.getValues())
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                  {/* Cancel editting */}
                  <Button
                    size='icon'
                    variant='destructive'
                    type='button'
                    onClick={() => setIsEdittingImage(false)}
                    className="absolute right-0 bottom-0 rounded-full">
                    <X size={12} />
                  </Button>
                </div>
                : <div className="relative">

                  <div className="relative aspect-[500/300] w-24 h-24 md:w-32 md:h-32">
                    <Image
                      src={form.getValues('image') || "https://github.com/shadcn.png"}
                      className="rounded-full object-fit"
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
            <div className="flex flex-col justify-start gap-y-2">
              <h1 className="text-xl md:text-2xl font-bold text-white truncate max-w-[350px]">
                {currentUser?.name}
              </h1>
              <p className="text-sm md:text-lg text-white truncate max-w-[390px]">
                {currentUser?.email}
              </p>
            </div>
          </div>
          <h1 className="text-lg md:text-xl font-bold">
            Informacion personal
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
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
                          placeholder="Jhon"
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
                name='age'
                render={({ field }) => (
                  <FormControl>
                    <FormItem>
                      <FormLabel>Edad</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="22"
                          type='number'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormControl>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='aboutMe'
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>Acerca de mi</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Detalla algo sobre ti"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormControl>
              )}
            />
          </div>
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