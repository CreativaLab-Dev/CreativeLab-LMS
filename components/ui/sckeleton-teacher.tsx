import { Skeleton } from "@/components/ui/skeleton";

export const ResourceTeacherPageSkeleton = () => {
  return (
    <div className="space-y-3 py-4 lg:py-8">
      {/* Skeleton para el encabezado */}
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className="p-2 w-fit rounded-md bg-sky-200">
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      {/* Skeleton para la lista de recursos */}
      <div className="px-10 md:px-8 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-md">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ResourceTeacherPageSkeleton;