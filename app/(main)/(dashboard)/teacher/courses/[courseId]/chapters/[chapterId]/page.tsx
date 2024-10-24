import Link from "next/link"
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react"
import { IconBadge } from "@/components/ui/icon-badge"
import { getChapters } from "@/features/chapters/actions/get-chapters"
import ChapterAccessForm from "@/features/chapters/components/chapter-access-form"
import ChapterDescriptionForm from "@/features/chapters/components/chapter-description-form"
import ChapterTitleForm from "@/features/chapters/components/chapter-title-form"
import ChapterVideoForm from "@/features/chapters/components/chapter-video-form"
import { Banner } from "@/components/ui/banner"
import ChapterActions from "@/features/chapters/components/chapter-actions"

interface ChapterIdPageProps {
  params: {
    courseId: string,
    chapterId: string
  }
}

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
  const { courseId, chapterId } = params

  const chapter = await getChapters(courseId, chapterId)
  if (!chapter) return null

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl || chapter.youtubeUrl
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(field => field).length;

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant='warning'
          label="Este capitulo aun no ha sido publicado"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${courseId}/edit`}
              className="flex itesm-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Regresar al curso
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-bold">
                  Creación del capitulo
                </h1>
                <span className="text-sm text-slate-700">
                  Complete todos los campos {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Personaliza tu capitulo
                </h2>
              </div>
              <ChapterTitleForm
                courseId={courseId}
                chapterId={chapterId}
                initialData={{
                  title: chapter.title
                }}
              />
              <ChapterDescriptionForm
                courseId={courseId}
                chapterId={chapterId}
                initialData={{
                  description: chapter.description ?? ''
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">
                  Configuración de acceso
                </h2>
              </div>
              <ChapterAccessForm
                courseId={courseId}
                chapterId={chapterId}
                initialData={{
                  isFree: chapter.isFree
                }}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">
                  Configuración de video
                </h2>
              </div>
              <ChapterVideoForm
                courseId={courseId}
                chapterId={chapterId}
                initialData={chapter}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChapterIdPage;