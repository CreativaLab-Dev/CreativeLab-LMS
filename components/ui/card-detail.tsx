'use client'

import { Course } from "@prisma/client";

interface CardDetailProps {
  course: Course
}

const CardDetail = ({ course }: CardDetailProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={course.imagePath} alt="course" className="w-16 h-16 rounded-full" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">{course.name}</h2>
            <p className="text-sm font-semibold text-gray-500">{course.description}</p>
          </div>
        </div>
        <div className="flex items-center">
          {/* <span className="text-gray-500 text-sm">{course.students.length} estudiantes</span>
          <span className="text-gray-500 text-sm ml-4">{course.lessons.length} lecciones</span> */}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Descripción</h3>
        <p className="text-sm font-semibold text-gray-500 mt-2">{course.description}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Lecciones</h3>
        <div className="mt-2">
          {/* {course.lessons.map((lesson, index) => (
            <div key={index} className="flex items-center justify-between border-b border-gray-200 py-2">
              <div>
                <h4 className="text-sm font-semibold text-gray-800">{lesson.title}</h4>
                <p className="text-sm font-semibold text-gray-500">{lesson.description}</p>
              </div>
              <span className="text-sm font-semibold text-gray-500">{lesson.duration} minutos</span>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default CardDetail;