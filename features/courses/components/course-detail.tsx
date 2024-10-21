'use client'

import { Badge } from "@/components/ui/badge";
import { Course } from "@prisma/client";
import Image from "next/image";

interface CourseDetailProps {
  course: Course
}

const CourseDetail = ({ course }: CourseDetailProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col justify-between pr-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{course.name}</h2>
            <p className="text-sm font-semibold text-gray-500">{course.description}</p>
          </div>
          <div className="flex mt-3 md:mt-0">
            <Badge variant={course?.isFeatured ? 'default' : 'destructive'}>
              Destacado: {course?.isFeatured ? 'SI' : 'NO'}
            </Badge>
            <Badge variant={course?.isNew ? 'default' : 'destructive'}>
              Nuevo: {course?.isFeatured ? 'SI' : 'NO'}
            </Badge>
          </div>
        </div>
        <div className="relative min-w-24 min-h-14 w-full h-52 md:h-64">
          <Image
            alt="detail-image"
            src={course?.imagePath}
            objectFit="cover"
            className="rounded"
            fill />
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;