'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { EventOrganizerSchema } from "../schemas";
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
import { updateOrganizerEvent } from "../actions/update-organizer-event";

interface EventOrganizersFormProps {
  initialData: {
    organizer: string;
  };
  eventId: string;
}

const EventOrganizersForm = ({ eventId, initialData }: EventOrganizersFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof EventOrganizerSchema>>({
    resolver: zodResolver(EventOrganizerSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof EventOrganizerSchema>) => {
    startTransition(() => {
      updateOrganizerEvent(eventId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Organizador actualizado correctamente");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el organizador');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Organizador de evento
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
      {!isEditting && initialData.organizer && (
        <p className="text-sm mt-2">
          {initialData.organizer}
        </p>
      )}
      {!isEditting && !initialData.organizer && (
        <p className="text-xs mt-2 text-gray-500">
          Sin organizador
        </p>
      )}
      {
        isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="organizer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Ejemplo 'Sociedad de alumnos'"
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

export default EventOrganizersForm;