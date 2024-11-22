import { PageParamasProps } from "@/dtype";
import HeaderPage from "@/components/ui/header-page";
import { getResourceOfTeacher } from "@/features/resource/actions/get-resources-of-teacher";
import ResourceOfTeacherList from "@/features/resource/components/resource-of-teacher-list";
import { isAdminMiddleware } from "@/lib/is-admin-middleware";

export const dynamic = 'force-dynamic';

export default async function ResourceTeacherPage(
  searchParams: PageParamasProps
) {
  await isAdminMiddleware()
  const { resources, pagination } = await getResourceOfTeacher(searchParams)
  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Recursos"
        description="Aquí encontrarás todos los recursos que has creado"
        bgColor="bg-sky-200"
        icon="mentor"
        iconColor="text-sky-500"
      />
      <div className="px-10 md:px-8">
        <ResourceOfTeacherList
          resources={resources}
          pagination={pagination}
          url="/teacher/resources"
        />
      </div>
    </div>
  );
}