'use client'

import { UploadDropzone } from "@/utils/uploadthing"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { toast } from "sonner"

interface FileUploadProps {
  onChange: (url?: string) => void
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onChange, endpoint }) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res[0].url)
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`)
      }}
    />
  )
}