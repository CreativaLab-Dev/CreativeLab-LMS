'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { EventLocationSchema } from "../schemas";
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
import { updateLocationEvent } from "../actions/update-location-event";
import EventGoogleMap from "./event-google-map";

interface EventLocationFormProps {
  initialData: {
    location: string;
  };
  eventId: string;
}

const EventLocationForm = ({ eventId, initialData }: EventLocationFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof EventLocationSchema>>({
    resolver: zodResolver(EventLocationSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof EventLocationSchema>) => {
    startTransition(() => {
      updateLocationEvent(eventId, data)
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
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Ubicacion de evento
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
      {!isEditting && (
        <>
          {initialData.location && <div className="mt-2">
            <EventGoogleMap url={initialData.location} />
          </div>}
          {!initialData.location && <p className="text-xs text-gray-500">
            No se ha configurado una ubicacion
          </p>}
        </>
      )}
      {isEditting && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="location"
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
      )}

    </div >
  );
}

export default EventLocationForm;