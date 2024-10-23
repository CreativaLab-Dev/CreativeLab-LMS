'use client'

import { File, LayoutDashboard, ListChecks } from "lucide-react";
import { Attachment, Category, Course } from "@prisma/client";
import { IconBadge } from "@/components/ui/icon-badge";
import CourseFormTitle from "./course-form-title";
import CourseFormDescription from "./course-form-description";
import CourseFormImage from "./course-form-image";
import CourseFormCategory from "./course-form-category";
import CourseFormAttachment from "./coruse-form-attachment";

interface CourseSetupProps {
  course: Course & { attachments: Attachment[] };
  categories: Category[];
}

const CourseSetup = ({ course, categories }: CourseSetupProps) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge
            icon={LayoutDashboard} />
          <h2 className="text-xl">
            Personaliza tu curso
          </h2>
        </div>
        <CourseFormTitle
          courseId={course.id}
          initialData={{ title: course.name }}
        />
        <CourseFormDescription
          courseId={course.id}
          initialData={{ description: course.description || '' }}
        />
        <CourseFormImage
          courseId={course.id}
          initialData={{ image: course.imagePath || '' }}
        />
        <CourseFormCategory
          courseId={course.id}
          initialData={course}
          options={categories.map((category) => ({
            label: category.name,
            value: category.id
          }))}
        />
      </div>
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge
            icon={ListChecks} />
          <h2 className="text-xl">
            Capitulos del curso
          </h2>
        </div>
        <div className="flex items-center gap-x-2">
          <IconBadge
            icon={File} />
          <h2 className="text-xl">
            Recursos y anexos
          </h2>
        </div>
        <CourseFormAttachment
          courseId={course.id}
          initialData={course}
        />
      </div>
    </div>
  );
}

export default CourseSetup;