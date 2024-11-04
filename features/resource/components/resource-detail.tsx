import { Button } from "@/components/ui/button";
import Preview from "@/components/ui/preview";
import { Resource } from "@prisma/client";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";

const levelMap = {
  'intermediate': 'Intermedio',
  'advanced': 'Avanzado',
  'beginner': 'Principiante',
}

interface ResourceDetailsProps {
  resource: Resource;
}

const ResourceDetails = ({ resource }: ResourceDetailsProps) => {
  const levelText = levelMap[resource.nivel as keyof typeof levelMap] ?? 'Principiante';
  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md">
      <Link
        href={`/resources`}
        className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Regresar al listado
      </Link>
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
        {resource.title}
      </h1>
      <div className="flex items-center justify-between mb-8 p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex gap-2 items-center text-gray-500">
          <Eye size={24} />
          <p className="text-sm">
            {resource.visitedCount} <span className="ml-1">vistas</span>
          </p>
        </div>
        <div className="flex items-center text-sm font-semibold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
          {levelText}
        </div>
      </div>
      {resource.imageUrl && (
        <img
          src={resource.imageUrl}
          alt={resource.title}
          className="w-full h-auto rounded-lg mb-6 shadow-sm"
        />
      )}
      {resource.description && (
        <div className="prose prose-img:rounded-xl prose-a:text-blue-600 text-gray-700 mb-6">
          <Preview value={resource.description} />
        </div>
      )}
      {resource.url && (
        <Button className="w-full bg-gray-800 text-white py-3 text-lg font-semibold rounded-lg hover:bg-gray-700">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="styled-none"
          >
            Duplicar plantilla
          </a>
        </Button>
      )}
      <p className="text-lg font-bold text-gray-800 text-right mt-4">
        {resource.price === 0 ? "Gratis" : `$${resource.price}`}
      </p>
    </div>
  );
};

export default ResourceDetails;
