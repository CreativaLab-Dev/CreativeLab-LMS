import Preview from "@/components/ui/preview";
import { Resource } from "@prisma/client";

interface ResourceDetailsProps {
  resource: Resource;
}

const ResourceDetails = ({
  resource
}: ResourceDetailsProps) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl md:text-5xl font-bold mb-4">{resource.title}</h1>
      {resource.imageUrl && (
        <img
          src={resource.imageUrl}
          alt={resource.title}
          className="w-full h-auto rounded-lg mb-4 max-w-xl"
        />
      )}
      <p className="text-gray-500 mb-2">
        {`Published: ${resource.isPublished ? 'Yes' : 'No'}`}
      </p>
      <p className="text-gray-500 mb-2">{`Visited: ${resource.visitedCount} times`}</p>
      <p className="text-gray-500 mb-2">{`Last updated: ${new Date(resource.updatedAt).toLocaleDateString()}`}</p>
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