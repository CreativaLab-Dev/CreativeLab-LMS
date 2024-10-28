'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { EventDateSchema } from "../schemas";
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
import { updateTitleEvent } from "../actions/update-title-event";
import { format } from "date-fns";
import { updateDateEvent } from "../actions/update-date-event";

interface EventDateFormProps {
  initialData: {
    date: Date | null;
  };
  courseId: string;
}

const EventDateForm = ({ courseId, initialData }: EventDateFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof EventDateSchema>>({
    resolver: zodResolver(EventDateSchema),
    defaultValues: {
      date: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof EventDateSchema>) => {
    startTransition(() => {
      updateDateEvent(courseId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Titulo actualizado correctamente");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el titulo');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Fecha del evento
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
            {initialData && <p className="text-sm mt-2">
              {initialData.date && format(initialData.date, 'dd/MM/yyyy')}
            </p>}
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
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Ejemplo 'Evento de Matematicas'"
                        type="date"
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

export default EventDateForm;