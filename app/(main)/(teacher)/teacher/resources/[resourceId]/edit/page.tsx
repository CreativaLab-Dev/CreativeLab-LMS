import Link from "next/link"
import { redirect } from "next/navigation"
import { Banner } from "@/components/ui/banner"
import { IconBadge } from "@/components/ui/icon-badge"
import { ArrowLeft, LayoutGrid } from "lucide-react"
import MentorActions from "@/features/mentors/components/mentor-actions"
import MentorImageForm from "@/features/mentors/components/mentor-image-form"
import { getResourceById } from "@/features/resource/actions/get-resource-by-id"
import ResourceTitleForm from "@/features/resource/components/resource-title-form"
import ResourceContentForm from "@/features/resource/components/resource-content-form"
import ResourceImageForm from "@/features/resource/components/resource-image-form"
import ResourceActions from "@/features/resource/components/resource-actions"

type ResourceIdPageProps = {
  params: {
    resourceId: string
  }
}

export default async function ResourceIdPage({
  params
}: ResourceIdPageProps) {
  const resourceId = params.resourceId
  const resource = await getResourceById(resourceId)
  if (!resource) {
    return redirect('/teacher/mentors')
  }

  const requiredField = [
    resource.title,
    resource.content,
    resource.imageUrl,
  ]

  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredField.every(Boolean)

  return (
    <>
      {!resource.isPublished && (
        <Banner
          label="Este recurso no es visible para los estudiantes"
        />
      )}
      <div className="p-6">
        <Link
          href={`/teacher/resources`}
          className="flex itesm-center text-sm hover:opacity-75 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Regresar al listado
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">
              Configuracion de recurso
            </h1>
            <span className="text-sm text-slate-700">
              Completa todos los campos {completionText}
            </span>
          </div>
          <ResourceActions
            disabled={!isComplete}
            resourceId={resourceId}
            isPublished={resource.isPublished}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-12">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={LayoutGrid} />
            <h2 className="text-xl">
              Personaliza tu mentoría
            </h2>
          </div>
          <ResourceTitleForm
            resourceId={resource.id}
            initialData={{ title: resource.title }}
          />
          <ResourceImageForm
            resourceId={resource.id}
            initialData={{ imageUrl: resource.imageUrl || '' }}
          />
        </div>
        <div>
          <ResourceContentForm
            resourceId={resource.id}
            initialData={{ content: resource.content || '' }}
          />
        </div>
      </div>
    </>
  )
}