import { auth } from "@/auth";
import HeaderPage from "@/components/ui/header-page";
import UpgradeButton from "@/components/ui/upgrade-button";
import { getMembershipActive } from "@/features/settings/actions/get-membership-active";
import CurrentPlan from "@/features/settings/components/current-plan";
import ManageSubcription from "@/features/settings/components/manage-subcription";

export default async function SettingPage() {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null
  }
  const userId = session.user.id

  const membershipActive = await getMembershipActive(userId)
  const planText = membershipActive ? 'Premium' : 'Gratuito'

  return (
    <div className="space-y-3 py-4 lg:py-8">
      <HeaderPage
        icon="settings"
        title="Configuración"
        description="Configura tu cuenta y plan de suscripción"
        bgColor="bg-sky-700/10"
        iconColor="text-sky-700"
      />
      <div className="px-4 lg:px-8 space-y-3">
        <CurrentPlan plan={planText} />
        {
          !membershipActive ?
            <UpgradeButton /> : <ManageSubcription />
        }
      </div>
    </div>
  );
}