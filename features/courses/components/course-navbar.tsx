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
  isMembershipActive: boolean
}

const CourseNavbar = ({
  currentUser,
  course,
  progressCount,
  isMembershipActive
}: CourseNavbarProps) => {
  return (
    <div className="p-4 borde-b h-full flex items-center bg-gradient-to-l from-blue-800 to-blue-500 shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
        isMembershipActive={isMembershipActive}
      />
      <NavbarRoutes
        currentUser={currentUser}
        isPremium={isMembershipActive}
      />
    </div>
  );
}

export default CourseNavbar;