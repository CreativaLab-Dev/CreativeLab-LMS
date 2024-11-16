import { PageParamasProps } from "@/dtype";
import HeaderPage from "@/components/ui/header-page";

import { getMembershipsAdmin } from "@/features/memberships/actions/get-memberships-list";
import MentorOfTeacherList from "@/features/mentors/components/mentors-of-teacher-list";
import MembershipsList from "@/features/memberships/components/memberships-list";


export default async function MembershipAdminPage(
  searchParams: PageParamasProps
) {
  const { memberships, pagination } = await getMembershipsAdmin(searchParams)
  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Membresías"
        description="Aquí encontrarás todas las membresías de tus estudiantes."
        bgColor="bg-sky-200"
        icon="memberships"
        iconColor="text-sky-500"
      />
      <div className="px-10 md:px-8">
        <MembershipsList
          memberships={memberships}
          pagination={pagination}
          url="/teacher/memberships"
        />
      </div>
    </div>
  );
}