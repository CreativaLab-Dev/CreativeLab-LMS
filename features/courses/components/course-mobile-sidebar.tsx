import { Menu } from "lucide-react"
import { Chapter, Course, UserProgress } from "@prisma/client";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import CourseSidebar from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[];
  };
  progressCount: number | null;
  isMembershipActive: boolean;
}

const CourseMobileSidebar = ({
  course,
  progressCount,
  isMembershipActive
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu size={24} className="text-gray-100" />
      </SheetTrigger>
      <SheetContent side={'left'} className="p-0 bg-blue-500 w-72 border-r border-blue-500">
        <CourseSidebar
          isMembershipActive={false}
          course={course}
          progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CourseMobileSidebar;