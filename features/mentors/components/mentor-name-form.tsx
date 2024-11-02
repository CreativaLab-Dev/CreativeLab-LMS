'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { MentorNameFormSchema } from "../schemas";
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
import { updateNameMentor } from "../actions/update-name-mentor";

interface ResourceTitleFormProps {
  initialData: {
    name: string;
  };
  mentorId: string;
}

const MentorNameForm = ({
  mentorId,
  initialData
}: ResourceTitleFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof MentorNameFormSchema>>({
    resolver: zodResolver(MentorNameFormSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof MentorNameFormSchema>) => {
    startTransition(() => {
      updateNameMentor(mentorId, data)
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
    <div className="mt-6 border bg-blue-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Titulo del recurso
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
      {!isEditting && (
        <p className="text-sm mt-2">
          {initialData.name}
        </p>
      )}
      {isEditting && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Ejemplo 'Recurso 1'"
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

export default MentorNameForm;