import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseSidebarItem from "./course-sidebar-item";
import CourseProgress from "@/features/chapters/components/chapter-progress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number | null
  isMembershipActive: boolean
}

const CourseSidebar = ({
  course,
  progressCount,
  isMembershipActive
}: CourseSidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm bg-gradient-to-b from-blue-800 to-blue-500">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold text-blue-100">
          {course.name}
        </h1>
        {isMembershipActive && (
          <div className="mt-10">
            <CourseProgress
              value={progressCount || 0}
              variant={progressCount && progressCount === 100 ? 'success' : 'default'}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map(chapter => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !isMembershipActive}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseSidebar;