import { auth } from "@/auth";
import { getUsersWithoutMembership } from "@/features/memberships/actions/get-users-active";
import MembershipNewForm from "@/features/memberships/components/membership-new-form";
import { redirect } from "next/navigation";

const NewMembershipPage = async () => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/')
  }
  const users = await getUsersWithoutMembership();
  return (
    <MembershipNewForm
      options={users.map((user) => ({
        label: user.name || '',
        value: user.id
      }))}
    />
  );
}

export default NewMembershipPage;