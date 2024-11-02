import { auth } from "@/auth";
import HeaderPage from "@/components/ui/header-page";
import Preview from "@/components/ui/preview";
import { getResourcesPublished } from "@/features/resource/actions/get-resources-published";
import { redirect } from "next/navigation";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const ResourcesPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return redirect("/");
  }
  const resources = await getResourcesPublished(session.user.id);
  const contentWithoutHtml = (content: string) => content.replace(/<[^>]*>?/gm, "").slice(0, 100);

  return (
    <div className="p-6 space-y-4">
      <HeaderPage
        title="Recursos"
        description="Descubre los recursos disponibles"
        bgColor="bg-gradient-to-r from-blue-500 to-blue-400"
        icon="resource"
        iconColor="text-white"
      />
      <div className="p-6">
        {resources.length === 0 && (
          <div className="text-sm p-6 text-gray-500">
            <p>No hay recursos disponibles</p>
          </div>
        )}
        <div className="space-y-6">
          {resources.map((resource) => (
            <div
              className="p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row items-start gap-4 cursor-pointer"
              key={resource.id}
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
                  <span>{formatDistanceToNow(new Date(resource.updatedAt))} ago</span>
                  <span>•</span>
                  <span>{resource.visitedCount} visitas</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
