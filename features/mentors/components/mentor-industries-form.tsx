'use client'

import * as z from "zod"
import { useForm } from "react-hook-form";
import { MentorIndustryFormSchema } from "../schemas";
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
import { PlusCircle, X } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { updateIndustryMentor } from "../actions/update-industry-mentor";

interface MentorIndustriesFormProps {
  initialData: {
    industries: string[];
  };
  mentorId: string;
}

const MentorIndustriesForm = ({
  mentorId,
  initialData
}: MentorIndustriesFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const [
    ConfirmDialog,
    confirm
  ] = useConfirm('Eliminar industria', '¿Estás seguro de eliminar esta industria?')

  const router = useRouter();
  const form = useForm<z.infer<typeof MentorIndustryFormSchema>>({
    resolver: zodResolver(MentorIndustryFormSchema),
    defaultValues: {
      industry: ''
    }
  });

  const onDelete = async (industries: string) => {
    const ok = await confirm()
    if (!ok) {
      return
    }
    startTransition(() => {
      updateIndustryMentor(mentorId, initialData.industries.filter((s) => s !== industries))
        .then((response) => {
          if (response.success) {
            toast.success("Industria eliminada correctamente");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al eliminar la industria');
          }
        })
    })
  }

  const onSubmit = async (data: z.infer<typeof MentorIndustryFormSchema>) => {
    const industry = data.industry;

    startTransition(() => {
      updateIndustryMentor(mentorId, [...initialData.industries, industry])
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Industria actualizado");
            router.refresh();
            form.reset();
          } else {
            toast.error(response?.error ?? 'Error al actualizar industria');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <>
      <div className="mt-6 border bg-sky-100 rounded-md p-4">
        <div className="font-medium  flex items-center justify-between">
          <span className="text-xs">
            Industrias del mentor
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
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Agregar
                </>
              )
            }
          </Button>
        </div>
        {!isEditting && (
          <div className="flex flex-col gap-2">
            {initialData.industries.length !== 0 && initialData.industries.map((industry) => (
              <div className="flex w-full px-3 justify-between items-center border rounded-md py-1 bg-sky-600">
                <div className="text-sky-100 text-sm">{industry}</div>
                <div>
                  <X
                    onClick={() => onDelete(industry)}
                    className="h-4 w-4 text-red-600 cursor-pointer hover:text-red-500 transition"
                  />
                </div>
              </div>
            ))}
            {initialData.industries.length === 0 && (
              <p className="text-xs text-center text-gray-500 mt-1">
                No se ha asignado ninguna industria
              </p>
            )}
          </div>
        )}
        {
          isEditting && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Ejemplo 'Tecnología'"
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
      <ConfirmDialog />
    </>
  );
}

export default MentorIndustriesForm;