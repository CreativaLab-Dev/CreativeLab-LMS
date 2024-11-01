'use client'

import { Category, Course } from "@prisma/client"
import CourseCard from "./course-card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[]
  progress: number | null
}

interface CoursesListProps {
  items: CourseWithProgressWithCategory[]
  isDashboard?: boolean
}

const CoursesList = ({
  items,
  isDashboard = false
}: CoursesListProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push('/search')
  }

  return (
    <div>
      <div className={isDashboard ? 'grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2' : 'grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'}>
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.name}
            imageUrl={item.imagePath!}
            chapterLength={item.chapters.length}
            progress={item.progress}
            category={item.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="flex flex-col items-center gap-y-6">
          <p className="text-sm text-gray-500 text-center mt-4">
            No se encontraron cursos
          </p>
          <div className="mx-auto">
            <Button

              variant='default'
              onClick={onClick}
            >
              Ver todos los cursos
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursesList;