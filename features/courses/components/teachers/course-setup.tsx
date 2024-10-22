'use client'

import { Category, Course } from "@prisma/client";
import CourseFormTitle from "./course-form-title";
import CourseFormDescription from "./course-form-description";
import CourseFormImage from "./course-form-image";
import CourseFormCategory from "./course-form-category";

interface CourseSetupProps {
  course: Course;
  categories: Category[];
}

const CourseSetup = ({ course, categories }: CourseSetupProps) => {

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
        <CourseFormCategory
          courseId={course.id}
          initialData={course}
          options={categories.map((category) => ({
            label: category.name,
            value: category.id
          }))}
        />
      </div>
    </div>
  );
}

export default CourseSetup;