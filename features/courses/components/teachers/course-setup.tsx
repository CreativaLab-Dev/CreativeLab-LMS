'use client'

import { Course } from "@prisma/client";
import CourseFormTitle from "./course-form-title";
import CourseFormDescription from "./course-form-description";
import CourseFormImage from "./course-form-image";

interface CourseSetupProps {
  course: Course;
}

const CourseSetup = ({ course }: CourseSetupProps) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
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
      </div>
    </div>
  );
}

export default CourseSetup;