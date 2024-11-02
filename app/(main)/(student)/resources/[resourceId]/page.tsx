import { auth } from "@/auth";
import { getResourceById } from "@/features/resource/actions/get-resource-by-id";
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
  const resource = await getResourceById(resourceId)
  if (!resource) {
    return redirect("/resources")
  }
  return (
    <ResourceDetails
      resource={resource}
    />
  );
}

export default ResourceIdPage;