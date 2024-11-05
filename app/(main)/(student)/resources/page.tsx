import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HeaderPage from "@/components/ui/header-page";
import ResourceCard from "@/features/resource/components/resource-card";
import { getResourcesPublished } from "@/features/resource/actions/get-resources-published";

const ResourcesPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return redirect("/");
  }
  const resources = await getResourcesPublished(session.user.id);

  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Recursos"
        description="Descubre los recursos disponibles"
        bgColor="bg-gradient-to-r from-blue-500 to-blue-400"
        icon="resource"
        iconColor="text-white"
      />
      <div className="px-2 md:px-6">
        {resources.length === 0 && (
          <div className="text-sm p-6 text-gray-500">
            <p>No hay recursos disponibles</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <ResourceCard
              resource={resource}
              key={resource.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
