import { NavbarRoutes } from "@/components/ui/navbar-routes";
import { Chapter, Course, User, UserProgress } from "@prisma/client";
import CourseMobileSidebar from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[];
  };
  progressCount: number | null;
  currentUser: User
}

const CourseNavbar = ({
  currentUser,
  course,
  progressCount,
}: CourseNavbarProps) => {
  return (
    <div className="p-4 borde-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes
        currentUser={currentUser}
      />
    </div>
  );
}

export default CourseNavbar;