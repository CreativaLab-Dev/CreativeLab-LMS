'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { resourcePriceFormSchema } from "../schemas";
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
import { DollarSign, Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updatePriceResource } from "../actions/update-price-resource";

interface ResourcePriceFormProps {
  initialData: {
    price: number | null;
  };
  resourceId: string;
}

const ResourcePriceForm = ({
  resourceId,
  initialData
}: ResourcePriceFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof resourcePriceFormSchema>>({
    resolver: zodResolver(resourcePriceFormSchema),
    defaultValues: {
      price: `${initialData.price ?? ''}`,
    }
  });

  const onSubmit = async (data: z.infer<typeof resourcePriceFormSchema>) => {
    startTransition(() => {
      updatePriceResource(resourceId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Precio actualizado correctamente");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el precio');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-blue-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Precio del recurso
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
      {!isEditting && initialData.price && (
        <div className="flex items-center gap-2">
          {/* <DollarSign className="h-4 w-4" /> */}
          <p className="text-sm">
            {initialData.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </div>
      )}
      {!isEditting && !initialData.price && initialData.price !== 0 && (
        <p className="text-xs mt-2 text-gray-500">
          No hay precio asignado
        </p>
      )}
      {
        isEditting && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Ejemplo '20'"
                        type='number'
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

export default ResourcePriceForm;