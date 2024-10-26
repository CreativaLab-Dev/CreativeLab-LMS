'use client'

import { UploadDropzone } from "@/utils/uploadthing"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { toast } from "sonner"

interface FileUploadProps {
  onChange: (url?: string, name?: string) => void
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  endpoint,
}) => {
  return (
    <UploadDropzone
      content={{
        button: 'Subir archivo',
        label: 'Arrastra y suelta un archivo o haz click para seleccionar uno'
      }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res[0].url, res[0].name)
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`)
      }}
    />
  )
}