import Link from "next/link"
import { redirect } from "next/navigation"
import { Banner } from "@/components/ui/banner"
import { IconBadge } from "@/components/ui/icon-badge"
import { ArrowLeft, LayoutGrid, Link2, LinkIcon, PlusCircle } from "lucide-react"
import { getMentorById } from "@/features/mentors/actions/get-mentor-by-id"
import MentorActions from "@/features/mentors/components/mentor-actions"
import MentorNameForm from "@/features/mentors/components/mentor-name-form"
import MentorAboutMeForm from "@/features/mentors/components/mentor-about-me-form"
import MentorImageForm from "@/features/mentors/components/mentor-image-form"
import MentorRoleForm from "@/features/mentors/components/mentor-role-form"
import MentorSocialNetworksForm from "@/features/mentors/components/mentor-social-networks-form"
import MentorSpecialitiesForm from "@/features/mentors/components/mentor-specialities-form"
import MentorIndustriesForm from "@/features/mentors/components/mentor-industries-form"
import MentorIdiomsForm from "@/features/mentors/components/mentor-idioms-form"
import MentorEmailForm from "@/features/mentors/components/mentor-email-form"
import MentorExternalLinkForm from "@/features/mentors/components/mentor-external-link-form"
import { getUsersWithoutMembership } from "@/features/memberships/actions/get-users-active"
import { auth } from "@/auth"
import { getMembershipById } from "@/features/memberships/actions/get-membership-by-id"
import MembershipEditForm from "@/features/memberships/components/membership-edit-form"
import { getUserById } from "@/features/memberships/actions/get-user-by-id"

type MembershipIdPageProps = {
  params: {
    membershipId: string
  }
}

export default async function MembershipIdPage({
  params
}: MembershipIdPageProps) {

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/')
  }

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
            label: user.name || '',
            value: user.id,
          }
        ]}
        membership={membership}
      />
    </>
  )
}