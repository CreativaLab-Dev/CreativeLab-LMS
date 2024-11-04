'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { resourceUrlFormSchema } from "../schemas";
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
import { updateExternalLinkResource } from "../actions/update-external-link-resource";

interface ResourceExternalLinkFormProps {
  initialData: {
    url: string;
  };
  resourceId: string;
}

const ResourceExternalLinkForm = ({
  resourceId,
  initialData
}: ResourceExternalLinkFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof resourceUrlFormSchema>>({
    resolver: zodResolver(resourceUrlFormSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: z.infer<typeof resourceUrlFormSchema>) => {
    startTransition(() => {
      updateExternalLinkResource(resourceId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Enlace externo actualizado correctamente");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el enlace externo');
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
          {isEditting && (
            <>Cancel</>
          )}
          {!isEditting && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>
      {!isEditting && initialData.url && (
        <a className="text-xs mt-2 text-blue-500 cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
          href={initialData.url}
        >
          {initialData.url}
        </a>
      )}
      {!isEditting && !initialData.url && (
        <p className="text-xs mt-2 text-gray-500">
          No se ha agregado un enlace externo
        </p>
      )}
      {
        isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="https://example.com"
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

export default ResourceExternalLinkForm;