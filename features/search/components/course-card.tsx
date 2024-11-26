'use client'

import { IconBadge } from "@/components/ui/icon-badge";
import CourseProgress from "@/features/chapters/components/chapter-progress";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLength: number;
  progress: number | null;
  category: string;
}

const CourseCard = ({
  category,
  chapterLength,
  id,
  imageUrl,
  progress,
  title
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overlof-whidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-auto">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
          {/* Label de premium */}
          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-700 text-xs px-2 py-1 rounded-md font-bold">
            PRO
          </div>
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge
                size='sm'
                icon={BookOpen}
              />
              <span>
                {chapterLength} {chapterLength === 1 ? 'capítulo' : 'capítulos'}

              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? 'success' : 'default'}
              size='sm'
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              Gratuito
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;