import Link from "next/link"
import { redirect } from "next/navigation"
import { Banner } from "@/components/ui/banner"
import { IconBadge } from "@/components/ui/icon-badge"
import { ArrowLeft, LayoutGrid, Link2, Link2Off, LinkIcon, PlusCircle } from "lucide-react"
import { getMentorById } from "@/features/mentors/actions/get-mentor-by-id"
import MentorActions from "@/features/mentors/components/mentor-actions"
import ResourceTitleForm from "@/features/mentors/components/mentor-name-form"
import MentorAboutMeForm from "@/features/mentors/components/mentor-about-me-form"
import MentorImageForm from "@/features/mentors/components/mentor-image-form"
import MentorRoleForm from "@/features/mentors/components/mentor-role-form"
import MentorSocialNetworksForm from "@/features/mentors/components/mentor-social-networks-form"
import MentorSpecialitiesForm from "@/features/mentors/components/mentor-specialities-form"
import MentorIndustriesForm from "@/features/mentors/components/mentor-industries-form"
import MentorIdiomsForm from "@/features/mentors/components/mentor-idioms-form"
import MentorEmailForm from "@/features/mentors/components/mentor-email-form"
import MentorExternalLinkForm from "@/features/mentors/components/mentor-external-link-form"

type MentorIdPageProps = {
  params: {
    mentorId: string
  }
}

export default async function MentorIdPage({
  params
}: MentorIdPageProps) {
  const mentorId = params.mentorId
  const mentor = await getMentorById(mentorId)
  if (!mentor) {
    return redirect('/teacher/mentors')
  }

  const requiredField = [
    mentor.name,
    mentor.aboutMe,
    mentor.email,
    mentor.imageUrl,
    mentor.linkedinUrl || mentor.twitterUrl,
    mentor.externaLink,
  ]

  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredField.every(Boolean)

  return (
    <>
      {!mentor.isPublished && (
        <Banner
          label="Este mentor no es visible para los estudiantes"
        />
      )}
      <div className="p-6">
        <Link
          href={`/teacher/mentors`}
          className="flex itesm-center text-sm hover:opacity-75 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Regresar al listado
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">
              Configuracion del mentor
            </h1>
            <span className="text-sm text-slate-700">
              Completa todos los campos {completionText}
            </span>
          </div>
          <MentorActions
            disabled={!isComplete}
            mentorId={mentorId}
            isPublished={mentor.isPublished}
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
            mentorId={mentor.id}
            initialData={{ name: mentor.name }}
          />
          <MentorAboutMeForm
            mentorId={mentor.id}
            initialData={{ aboutMe: mentor.aboutMe || '' }}
          />
          <MentorEmailForm
            mentorId={mentor.id}
            initialData={{ email: mentor.email || '' }}
          />
          <MentorRoleForm
            mentorId={mentor.id}
            initialData={{ role: mentor.role || '' }}
          />
          <MentorImageForm
            mentorId={mentor.id}
            initialData={{ image: mentor.imageUrl || '' }}
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={LinkIcon} />
            <h2 className="text-xl">
              Link de enlace externo
            </h2>
          </div>
          <MentorExternalLinkForm
            mentorId={mentor.id}
            initialData={{ externalLink: mentor.externaLink || '' }}
          />
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={Link2} />
            <h2 className="text-xl">
              Redes sociales
            </h2>
          </div>
          <MentorSocialNetworksForm
            mentorId={mentor.id}
            initialData={{
              linkedinUrl: mentor.linkedinUrl || '',
              twitterUrl: mentor.twitterUrl || ''
            }}
          />
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={PlusCircle} />
            <h2 className="text-xl">
              Adicional
            </h2>
          </div>
          <MentorSpecialitiesForm
            mentorId={mentor.id}
            initialData={{ specialities: mentor.specialty }}
          />
          <MentorIndustriesForm
            mentorId={mentor.id}
            initialData={{ industries: mentor.industry }}
          />
          <MentorIdiomsForm
            mentorId={mentor.id}
            initialData={{ idioms: mentor.idioms }}
          />
        </div>

      </div>
    </>
  )
}