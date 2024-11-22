import ResourceNewForm from "@/features/resource/components/resource-new-form";
import { isAdminMiddleware } from "@/lib/is-admin-middleware";

const ResourceNewPage = async () => {
  await isAdminMiddleware()
  return (
    <ResourceNewForm />
  );
}

export default ResourceNewPage;