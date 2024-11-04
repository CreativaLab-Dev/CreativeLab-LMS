'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { resourceLevelFormSchema } from "../schemas";
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
import { Resource } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import { updateLevelResource } from "../actions/update-level-resource";

interface ResourceLevelFormProps {
  initialData: Resource
  resourceId: string;
  options: { label: string, value: string }[]
}

const ResourceLevelForm = ({
  resourceId,
  initialData,
  options
}: ResourceLevelFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof resourceLevelFormSchema>>({
    resolver: zodResolver(resourceLevelFormSchema),
    defaultValues: {
      level: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof resourceLevelFormSchema>) => {
    startTransition(() => {
      updateLevelResource(resourceId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Nivel de recurso actualizado");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el nivel del recurso');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  const selectedOption = options.find((option) => option.value === initialData.nivel);

  return (
    <div className="mt-6 border bg-blue-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Nivel de recurso
          <span className="text-red-500">*</span>
        </span>
        <Button
          onClick={toggleEdit}
          variant='ghost'
        >
          {
            isEditting && (
              <>Cancelar</>
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
            !initialData?.nivel && "text-slate-500 italic"
          )}>
            {selectedOption?.label || <span className="text-muted-foreground">Sin nivel</span>}
          </p>
        )
      }
      {
        isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        options={options}
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

export default ResourceLevelForm;