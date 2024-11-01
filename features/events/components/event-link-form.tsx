'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { EventLinkSchema } from "../schemas";
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
import { updateLinkEvent } from "../actions/update-link-event";

interface EventLinkFormProps {
  initialData: {
    link: string;
  };
  eventId: string;
}

const EventLinkForm = ({ eventId, initialData }: EventLinkFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof EventLinkSchema>>({
    resolver: zodResolver(EventLinkSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof EventLinkSchema>) => {
    startTransition(() => {
      updateLinkEvent(eventId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Link actualizado correctamente");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el link');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-blue-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Link de evento
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
      {
        !isEditting && (
          <>
            {initialData.link && <a
              className="text-sm mt-2 block underline text-blue-500"
              href={initialData.link}
              target="_blank"
              rel="noreferrer"
            >
              {initialData.link}
            </a>}
            {!initialData.link && <p className="text-xs text-gray-500">Sin link</p>}
          </>

        )
      }
      {
        isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Ejemplo 'https://meet.google.com/abc-123'"
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

    </div >
  );
}

export default EventLinkForm;