import { Skeleton } from "@/components/ui/skeleton";

export const StudentPageSkeleton = () => {
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
      <div className="px-2 md:px-6 space-y-4">
        {/* Skeleton para categorías */}
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center rounded-2xl">
              <Skeleton className="h-8 w-24 mt-1" />
            </div>
          ))}
        </div>

        {/* Skeleton para la lista de recursos */}
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-56 w-full border rounded-lg " />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentPageSkeleton;
