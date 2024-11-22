import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getMembershipById } from "@/features/memberships/actions/get-membership-by-id"
import MembershipEditForm from "@/features/memberships/components/membership-edit-form"
import { getUserById } from "@/features/memberships/actions/get-user-by-id"
import { isAdminMiddleware } from "@/lib/is-admin-middleware"

type MembershipIdPageProps = {
  params: {
    membershipId: string
  }
}

export default async function MembershipIdPage({
  params
}: MembershipIdPageProps) {

  await isAdminMiddleware()

  const membershipId = params.membershipId
  const membership = await getMembershipById(membershipId)
  if (!membership) {
    return redirect('/teacher/memberships')
  }

  const user = await getUserById(membership.userId)

  if (!user) {
    return redirect('/teacher/memberships')
  }

  return (
    <>
      <MembershipEditForm
        options={[
          {
            label: user.email || '',
            value: user.id,
          }
        ]}
        membership={membership}
      />
    </>
  )
}