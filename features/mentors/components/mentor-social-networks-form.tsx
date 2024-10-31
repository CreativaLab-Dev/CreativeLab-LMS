'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { MentorSocialNetworksFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { updateSocialNetworksMentor } from "../actions/update-social-networks-mentor";

interface MentorSocialNetworksFormProps {
  initialData: {
    linkedinUrl: string;
    twitterUrl: string;
  };
  mentorId: string;
}

const MentorSocialNetworksForm = ({
  mentorId,
  initialData
}: MentorSocialNetworksFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof MentorSocialNetworksFormSchema>>({
    resolver: zodResolver(MentorSocialNetworksFormSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof MentorSocialNetworksFormSchema>) => {
    startTransition(() => {
      updateSocialNetworksMentor(mentorId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Redes sociales actualizados correctamente");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar las redes sociales');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Redes sociales
          <span className="text-red-500">*</span>
        </span>

        <Button
          onClick={toggleEdit}
          variant='ghost'
        >
          {
            isEditting && (
              <>Cancel</>
            )
          }
          {
            !isEditting && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </>
            )
          }
        </Button>
      </div>
      {!isEditting && initialData.linkedinUrl && (
        <a
          href={initialData.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-xs">
          {initialData.linkedinUrl}
        </a>
      )}
      {!isEditting && !initialData.linkedinUrl && !initialData.twitterUrl && (
        <p className="text-xs text-gray-500">
          No se ha configurado ninguna red social
        </p>
      )}
      {!isEditting && initialData.twitterUrl && (
        <a
          href={initialData.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-xs">
          {initialData.twitterUrl}
        </a>
      )}
      {
        isEditting && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem
                    className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3"
                  >
                    <div className="flex itesm-center justify-center">
                      <FormDescription>
                        <LinkedInLogoIcon className="h-4 w-4 mr-2" />
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="https://linkedin.com/in/alber-einstein"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitterUrl"
                render={({ field }) => (
                  <FormItem
                    className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3"
                  >
                    <div className="flex itesm-center justify-center">
                      <FormDescription>
                        <TwitterLogoIcon className="h-4 w-4" />
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="https://twitter.com/alber-einstein"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button
                  type="submit"
                  disabled={isPending}
                >
                  Guardar
                </Button>
              </div>
            </form>
          </Form>
        )
      }
    </div>
  );
}

export default MentorSocialNetworksForm;