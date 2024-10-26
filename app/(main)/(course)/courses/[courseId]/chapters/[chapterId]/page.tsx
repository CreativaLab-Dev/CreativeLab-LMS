import { auth } from "@/auth"
import { Banner } from "@/components/ui/banner";
import EnrollButton from "@/components/ui/enroll-button";
import Preview from "@/components/ui/preview";
import { Separator } from "@/components/ui/separator";
import { getChapterFull } from "@/features/chapters/actions/get-chapter-full";
import ChapterVideoPlayer from "@/features/chapters/components/chapter-video-player";
import CourseProgressButton from "@/features/courses/components/course-progress-button";
import { db } from "@/lib/db";
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
    return redirect('/')
  }

  const membershipActive = await db.membership.findFirst({
    where: {
      userId,
      status: 'active',
      expiresAt: {
        gt: new Date()
      }
    }
  })

  const isLocked = !chapter.isFree && !membershipActive
  const completeOnEnd = !userProgress?.isCompleted && !!membershipActive

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
      <div className="flex flex-col mx-w-4xl mx-auto pb-20">
        <div className="p-4">
          <ChapterVideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId}
            youtubeUrl={chapter.youtubeUrl}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-center md:justify-between">
          <h2 className="text-2xl font-semibold mb-2">
            {chapter.title}
          </h2>
          {!!membershipActive ? (
            <div>
              <CourseProgressButton
                chapterId={chapter.id}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            </div>
          ) : (
            <EnrollButton />
          )}
        </div>
        <Separator />
        <div>
          <Preview
            value={chapter.description!}
          />
        </div>
        {membershipActive && !!attachments.length && (
          <>
            <Separator />
            <div className="p-4">
              {attachments.map((attachment) => (
                <a
                  href={attachment.url}
                  key={attachment.id}
                  target="_blank"
                  className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                >
                  <p className="line-clamp-1">
                    {attachment.name}
                  </p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChapterIdPage;