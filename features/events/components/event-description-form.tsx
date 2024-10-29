'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { EventDescriptionSchema } from "../schemas";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { updateDescriptionEvent } from "../actions/update-description-event";

interface EventDescriptionFormProps {
  initialData: {
    description: string;
  };
  eventId: string;
}

const EventDescriptionForm = ({
  eventId,
  initialData
}: EventDescriptionFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof EventDescriptionSchema>>({
    resolver: zodResolver(EventDescriptionSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof EventDescriptionSchema>) => {
    startTransition(() => {
      updateDescriptionEvent(eventId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Descripción actualizada");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar la descripción');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Descripción de evento
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
          <p className={cn("text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}>
            {
              initialData.description || <span className="text-muted-foreground">Sin descripción</span>
            }
          </p>
        )
      }
      {
        isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Descripción del evento"
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

export default EventDescriptionForm;