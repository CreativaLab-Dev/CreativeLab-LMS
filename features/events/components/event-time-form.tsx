'use client'

import * as z from "zod"
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { useForm } from "react-hook-form";
import { EventTimeSchema } from "../schemas";
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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { updateTimeEvent } from "../actions/update-time-event";

interface EventTimeFormProps {
  initialData: {
    date: Date | null;
  };
  eventId: string;
}

const EventTimeForm = ({ eventId, initialData }: EventTimeFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof EventTimeSchema>>({
    resolver: zodResolver(EventTimeSchema),
    defaultValues: {
      time: initialData?.date ? format(new Date(initialData.date), "HH:mm") : "",
    }
  });

  const onSubmit = async (data: z.infer<typeof EventTimeSchema>) => {
    startTransition(() => {
      updateTimeEvent(eventId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Hora actualizado correctamente");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar la hora');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Hora del evento
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
      {
        !isEditting && (
          <>
            {initialData && (
              <p className="text-sm mt-2">
                {initialData.date &&
                  format(new Date(initialData.date), "hh:mm a", { locale: es })}
              </p>
            )}
            {!initialData.date && <p className="text-xs text-gray-500">
              Sin fecha
            </p>}
          </>

        )
      }
      {
        isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="time"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Fecha"
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

export default EventTimeForm;