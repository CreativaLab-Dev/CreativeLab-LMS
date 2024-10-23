'use client'

import * as z from "zod"
import { EditCourseAttachmentSchema } from "../../schemas";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { FileUpload } from "@/components/ui/file-upload";
import { Attachment, Course } from "@prisma/client";
import { updateCourseAttachment } from "../../actions/teachers/update-course-attachment";
import { deleteCourseAttachment } from "../../actions/teachers/delete-course-attachment";

interface CourseFormAttachmentProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const CourseFormAttachment = ({ courseId, initialData }: CourseFormAttachmentProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEditting, setIsEditting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof EditCourseAttachmentSchema>) => {
    startTransition(() => {
      updateCourseAttachment(courseId, data)
        .then((response) => {
          if (response.success) {
            setIsEditting(false);
            toast.success("Adjunto actualizado");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al actualizar el adjunto');
          }
        })
    })
  };

  const onDelete = async (id: string) => {
    setDeletingId(id);
    startTransition(() => {
      deleteCourseAttachment(courseId, id)
        .then((response) => {
          if (response.success) {
            toast.success("Adjunto eliminado");
            router.refresh();
          } else {
            toast.error(response?.error ?? 'Error al eliminar el adjunto');
          }
        })
    })
  }

  const toggleEdit = () => setIsEditting((current) => !current);
  return (
    <div className="mt-6 border bg-sky-100 rounded-md p-4">
      <div className="font-medium  flex items-center justify-between">
        <span className="text-xs">
          Adjuntos de curso
        </span>
        <Button
          onClick={toggleEdit}
          variant='ghost'
        >
          {isEditting && (
            <>Cancel</>
          )}
          {
            !isEditting && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Agregar archivo
              </>
            )
          }
        </Button>
      </div>
      {!isEditting && (
        initialData.attachments.length === 0 && (
          <>
            <p className="text-sm mt-2 text-slate-500 italic">
              No hay archivos adjuntos
            </p>
          </>
        )
      )}
      {!isEditting && initialData.attachments.length > 0 && (
        <div className="space-y-2">
          {initialData.attachments.map((attachment) => (
            <div
              className="flex items-center p-3 w-full bg-sky-600 border-sky-200 border text-sky-200 rounded-md"
              key={attachment.id}
            >
              <File className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-xs line-clamp-1">
                {attachment.name}
              </p>
              {deletingId === attachment.id && (
                <div>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {deletingId !== attachment.id && (
                <button
                  className="ml-auto hover:opacity-75 transition"
                  onClick={() => onDelete(attachment.id)}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {isEditting && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url })
              }
            }}
          />
          <div className="test-xs text-muted-foreground mt-4">
            Agrega un archivo adjunto a tu curso
          </div>
        </div>
      )}

    </div>
  );
}

export default CourseFormAttachment;