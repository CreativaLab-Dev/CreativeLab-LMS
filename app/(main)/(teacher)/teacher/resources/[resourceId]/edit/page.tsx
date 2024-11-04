import Link from "next/link"
import { redirect } from "next/navigation"
import { Banner } from "@/components/ui/banner"
import { IconBadge } from "@/components/ui/icon-badge"
import { ArrowLeft, CheckIcon, DollarSign, LayoutGrid, Link2Icon } from "lucide-react"
import { getResourceById } from "@/features/resource/actions/get-resource-by-id"
import ResourceTitleForm from "@/features/resource/components/resource-title-form"
import ResourceDescriptionForm from "@/features/resource/components/resource-content-form"
import ResourceImageForm from "@/features/resource/components/resource-image-form"
import ResourceActions from "@/features/resource/components/resource-actions"
import ResourcePriceForm from "@/features/resource/components/resource-price-form"
import ResourceLevelForm from "@/features/resource/components/resource-level-form"
import ResourceExternalLinkForm from "@/features/resource/components/resource-external-link-form"
import ResourceCategoryForm from "@/features/resource/components/resource-category-form"

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
    resource.description,
    resource.imageUrl,
    resource.url,
    resource.price !== null,
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
          <ResourceDescriptionForm
            resourceId={resource.id}
            initialData={{ description: resource.description || '' }}
          />
          <ResourceLevelForm
            resourceId={resource.id}
            initialData={resource}
            options={[
              { value: 'beginner', label: 'Principiante' },
              { value: 'intermediate', label: 'Intermedio' },
              { value: 'advanced', label: 'Avanzado' },
            ]}
          />
          <ResourceImageForm
            resourceId={resource.id}
            initialData={{ imageUrl: resource.imageUrl || '' }}
          />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={DollarSign} />
            <h2 className="text-xl">
              Precio
            </h2>
          </div>
          <ResourcePriceForm
            resourceId={resource.id}
            initialData={{ price: resource.price }}
          />
          <div className="flex items-center gap-x-2 mt-4">
            <IconBadge
              icon={Link2Icon} />
            <h2 className="text-xl">
              Enlace externo
            </h2>
          </div>
          <ResourceExternalLinkForm
            resourceId={resource.id}
            initialData={{ url: resource.url || '' }}
          />
          <div className="flex items-center gap-x-2 mt-4">
            <IconBadge
              icon={CheckIcon} />
            <h2 className="text-xl">
              Categoria
            </h2>
          </div>
          <ResourceCategoryForm
            resourceId={resource.id}
            initialData={{ category: resource.category || '' }}
          />
        </div>
      </div>
    </>
  )
}