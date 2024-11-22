import { getUsersWithoutMembership } from "@/features/memberships/actions/get-users-active";
import MembershipNewForm from "@/features/memberships/components/membership-new-form";
import { isAdminMiddleware } from "@/lib/is-admin-middleware";

const NewMembershipPage = async () => {
  await isAdminMiddleware()
  const users = await getUsersWithoutMembership();
  return (
    <MembershipNewForm
      options={users.map((user) => ({
        label: user.email || '',
        value: user.id
      }))}
    />
  );
}

export default NewMembershipPage;