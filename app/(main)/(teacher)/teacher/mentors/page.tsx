import { PageParamasProps } from "@/dtype";
import HeaderPage from "@/components/ui/header-page";

import { getMentorsOfTeacher } from "@/features/mentors/actions/get-mentors-of-teacher";
import MentorOfTeacherList from "@/features/mentors/components/mentors-of-teacher-list";
import { isAdminMiddleware } from "@/lib/is-admin-middleware";


export default async function MentorsTeacherPage(
  searchParams: PageParamasProps
) {
  await isAdminMiddleware()
  const { mentors, pagination } = await getMentorsOfTeacher(searchParams)
  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Mentorías"
        description="Aquí encontrarás todas las mentorías que has creado"
        bgColor="bg-sky-200"
        icon="mentor"
        iconColor="text-sky-500"
      />
      <div className="px-10 md:px-8">
        <MentorOfTeacherList
          mentors={mentors}
          pagination={pagination}
          url="/teacher/mentors"
        />
      </div>
    </div>
  );
}