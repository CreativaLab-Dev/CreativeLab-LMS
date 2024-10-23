import { IconBadge } from "@/components/ui/icon-badge"
import { getChapters } from "@/features/chapters/actions/get-chapters"
import ChapterTitleForm from "@/features/chapters/components/chapter-title-form"
import { ArrowLeft, LayoutDashboard } from "lucide-react"
import Link from "next/link"

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
    chapter.videoUrl
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(field => field).length;

  const completionText = `(${completedFields}/${totalFields})`
  return (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChapterIdPage;