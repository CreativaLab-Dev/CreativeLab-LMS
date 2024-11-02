'use client'

import { Resource } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const contentWithoutHtml = (content: string) => content
    .replace(/<[^>]*>?/gm, "")
    .slice(0, 100) + ' ...';
  return (
    <div
      className="p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row items-start gap-4 cursor-pointer"
      key={resource.id}
      onClick={onClick}
    >
      {resource.imageUrl && (
        <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative">
          <Image
            src={resource.imageUrl}
            alt={resource.title}
            layout="fill"
            className="rounded-md object-cover"
          />
        </div>
      )}
      <div className="flex-1 space-y-2">
        <h2 className="text-xl font-semibold text-white">{resource.title}</h2>
        <p className="text-gray-400 text-sm">
          {contentWithoutHtml(resource.content ?? '')}
        </p>
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <span>Nuevo</span>
          <span>•</span>
          <span>{resource.visitedCount} visitas</span>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;