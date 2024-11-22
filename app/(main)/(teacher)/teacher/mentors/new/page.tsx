import MentorNewForm from "@/features/mentors/components/mentor-new-form";
import { isAdminMiddleware } from "@/lib/is-admin-middleware";

const MentorNewPage = async () => {
  await isAdminMiddleware()
  return (
    <MentorNewForm />
  );
}

export default MentorNewPage;