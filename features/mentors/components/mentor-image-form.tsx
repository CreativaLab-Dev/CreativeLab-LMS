'use client'

import * as z from "zod"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { FileUpload } from "@/components/ui/file-upload";
import { updateImageMentor } from "../actions/update-image-mentor";
import { MentorImageFormSchema } from "../schemas";

interface MentorImageFormProps {
  initialData: {
    image: string;
  };
  mentorId: string;
}

const MentorImageForm = ({
  mentorId,
  initialData
}: MentorImageFormProps) => {
  const [, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);

  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof MentorImageFormSchema>) => {
    startTransition(() => {
      updateImageMentor(mentorId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Imagen actualizada");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el imagen');
          }
        })
    })
  };

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Imagen de mentor
          <span className="text-red-500">*</span>
        </span>
        <Button
          onClick={toggleEdit}
          variant='ghost'
        >
          {isEditting && (
            <>Cancel</>
          )}
          {
            !isEditting && !initialData.image && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Agregar imagen
              </>
            )
          }
          {!isEditting && initialData.image && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>
      {!isEditting && (
        !initialData.image ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-12 w-12 text-slate-400" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Imagen del mentor"
              fill
              className="object-cover rounded-md"
              src={initialData.image}
            />
          </div>
        )
      )}
      {isEditting && (
        <div>
          <FileUpload
            endpoint="mentorImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url })
              }
            }}
          />
          <div className="test-xs text-muted-foreground mt-4">
            Se recomienda una imagen de 16:9
          </div>
        </div>
      )}

    </div>
  );
}

export default MentorImageForm;