'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { EventExternalLinkSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateExternalLinkEvent } from "../actions/update-external-link-event";

interface EventExternalLinkFormProps {
  initialData: {
    externalLink: string;
  };
  eventId: string;
}

const EventExternalLinkForm = ({ eventId, initialData }: EventExternalLinkFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof EventExternalLinkSchema>>({
    resolver: zodResolver(EventExternalLinkSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof EventExternalLinkSchema>) => {
    startTransition(() => {
      updateExternalLinkEvent(eventId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Link externo actualizado correctamente");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el link externo');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-blue-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Enlace externo
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
      {!isEditting && !initialData.externalLink && (
        <p className="text-xs text-gray-500 mt-2">
          No se ha agregado un link externo
        </p>
      )}
      {!isEditting && initialData.externalLink && (
        <a
          className="text-xs mt-2 text-blue-500"
          href={initialData.externalLink}
          target="_blank"
          rel="noreferrer"
        >
          {initialData.externalLink}
        </a>
      )}
      {isEditting && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="externalLink"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Ejemplo 'https://www.example.com'"
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
      )}

    </div>
  );
}

export default EventExternalLinkForm;