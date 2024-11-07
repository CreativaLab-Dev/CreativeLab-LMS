import { auth } from "@/auth";
import NavbarPlans from "@/features/plans/components/navbar-plans";
import { getMembershipActive } from "@/features/settings/actions/get-membership-active";
import { getCurrentUser } from "@/lib/get-current-user";


export default async function SalesLayout({
  children
}: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null;
  }
  const currentUser = await getCurrentUser(session.user.id);
  if (!currentUser) {
    return null;
  }

  const membershipActive = await getMembershipActive(currentUser.id);
  return (
    <div className="bg-sky-100">
      <div className="h-[80px] fixed inset-y-0 w-full">
        <NavbarPlans
          isSales
          currentUser={currentUser}
          isPremium={!!membershipActive}
        />
      </div>
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}