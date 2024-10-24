import { auth } from "@/auth";
import CourseNavbar from "@/features/courses/components/course-navbar";
import CourseSidebar from "@/features/courses/components/course-sidebar";
import { getProgress } from "@/features/search/components/get-progress";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode,
  params: { courseId: string }
}) => {

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/')
  }

  const { courseId } = params
  const { id: userId } = session.user

  const currentUser = await db.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!currentUser) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId
    },
    include: {
      chapters: {
        where: {
          isPublished: true
        },
        include: {
          userProgress: {
            where: {
              userId
            }
          }
        },
        orderBy: {
          position: 'asc'
        }
      }
    },
  })

  if (!course) {
    return redirect('/')
  }

  const progressCount = await getProgress(userId, courseId)

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          currentUser={currentUser}
          course={course}
          progressCount={progressCount}
        />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      </div>
      <main className="md:pl-80 h-full pt-20">
        {children}
      </main>
    </div>
  );
}

export default CourseLayout;