'use client'

import { Resource } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const levelMap = {
  'intermediate': 'Intermedio',
  'advanced': 'Avanzado',
  'beginner': 'Principiante',
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({
  resource
}: ResourceCardProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/resources/${resource.id}`);
  }
  const levelText = levelMap[resource.nivel as keyof typeof levelMap] ?? 'Principiante';
  return (
    <div
      className="group w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-md cursor-pointer overflow-hidden hover:border-blue-500 transition"
      onClick={onClick}
      key={resource.id}
    >
      {/* Image Section */}
      <div className="p-3">
        {resource.imageUrl && (
          <div className="relative w-full h-60">
            <Image
              src={resource.imageUrl}
              alt={resource.title}
              layout="fill"
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-500 transition">
          {resource.title}
        </h2>

        {/* Category */}
        {resource.category && (
          <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-1 inline-block">
            {resource.category}
          </span>
        )}

        {/* Footer with Price */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-700 font-medium">
            {resource.price ? `${resource.price} €` : 'Gratis'}
          </span>
          <span className="text-xs text-gray-500">{levelText}</span>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;