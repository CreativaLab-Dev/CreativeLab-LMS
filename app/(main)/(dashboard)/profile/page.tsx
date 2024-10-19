import { auth } from "@/auth";
import HeaderPage from "@/components/ui/header-page"
import { ProfileForm } from "@/features/profile/components/profile-form";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function ProfilePage() {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null
  }
  const currentUser = await getCurrentUser(session.user.id)
  if (!currentUser) {
    return null
  }
  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        title="Mi perfil"
        description="Configura tu perfil de usuario"
        bgColor="bg-sky-200"
        icon="user"
        iconColor="text-sky-500"
      />
      <div className="px-10 md:px-8">
        <ProfileForm currentUser={currentUser} />
      </div>
    </div>
  );
}