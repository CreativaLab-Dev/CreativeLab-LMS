import { auth } from "@/auth";
import { updateVisitOfResource } from "@/features/resource/actions/update-visits-resource";
import ResourceDetails from "@/features/resource/components/resource-detail";
import { redirect } from "next/navigation";

interface ResourceIdPageProps {
  params: {
    resourceId: string;
  }
}

const ResourceIdPage = async ({
  params
}: ResourceIdPageProps) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return redirect("/");
  }
  const resourceId = params.resourceId;
  const updatedResource = await updateVisitOfResource(resourceId);

  if (!updatedResource) {
    return redirect("/");
  }

  return (
    <div className="p-2 md:p-10">
      <ResourceDetails
        resource={updatedResource}
      />
    </div>
  );
}

export default ResourceIdPage;