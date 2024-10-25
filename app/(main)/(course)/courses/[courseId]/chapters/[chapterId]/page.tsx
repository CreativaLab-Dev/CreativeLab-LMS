import { auth } from "@/auth"
import { Banner } from "@/components/ui/banner";
import { getChapterFull } from "@/features/chapters/actions/get-chapter-full";
import { redirect } from "next/navigation";

const ChapterIdPage = async ({
  params
}: {
  params: {
    courseId: string
    chapterId: string
  }
}) => {

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/')
  }
  const { id: userId } = session.user

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress
  } = await getChapterFull({
    chapterId: params.chapterId,
    courseId: params.courseId,
    userId,
  })

  if (!chapter || !course) {
    return
  }

  const isLocked = !chapter.isFree;
  const completeOnEnd = !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant='success'
          label="Ya has completado este capítulo"
        />
      )}
      {isLocked && (
        <Banner
          variant='warning'
          label="Necesitas tener el acceso premium para ver este capitulo"
        />
      )}
    </div>
  );
}

export default ChapterIdPage;