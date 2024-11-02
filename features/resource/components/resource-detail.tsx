import Preview from "@/components/ui/preview";
import { Resource } from "@prisma/client";
import { Eye } from "lucide-react";

interface ResourceDetailsProps {
  resource: Resource;
}

const ResourceDetails = ({
  resource
}: ResourceDetailsProps) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-5xl font-bold mb-6">{resource.title}</h1>
      <div className="flex items-center justify-around mb-5 px-6 border-t py-2 border-b">
        <div className="flex gap-2 items-center justify-center">
          <Eye size={24} className="text-gray-400" />
          <p className="text-gray-400 text-sm">
            {resource.visitedCount}
            <span className="ml-1">
              vistas
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray-400 text-sm">Nuevo</p>
        </div>
      </div>
      {resource.imageUrl && (
        <img
          src={resource.imageUrl}
          alt={resource.title}
          className="w-full h-auto rounded-lg mb-4 max-w-xl"
        />
      )}
      {resource.content && (
        <div className="prose max-w-none mb-6">
          <Preview value={resource.content} />
        </div>
      )}
      {resource.url && (
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Visit Resource
        </a>
      )}
    </div>
  );
};


export default ResourceDetails;