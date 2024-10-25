
import { auth } from "@/auth";
import Navbar from "@/features/dashboard/components/navbar";
import Sidebar from "@/features/dashboard/components/sidebar";
import { getCurrentUser } from "@/lib/get-current-user";
import { Toaster } from "@/components/ui/sonner";
import { getMembershipActive } from "@/features/settings/actions/get-membership-active";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/auth/login')
  }
  const currentUser = await getCurrentUser(session.user.id);
  if (!currentUser) {
    return redirect('/auth/login');
  }

  const membershipActive = await getMembershipActive(session.user.id);

  return (
    <div className="h-full">
      <div className="h-[60px] md:pl-56 fixed inset-y-0 w-full z-10">
        <Navbar
          currentUser={currentUser}
          isPremium={!!membershipActive}
        />
      </div>
      <div className="hidden md:flex w-56 flex-col fixed inset-y-0">
        <Sidebar
          currentUser={currentUser}
          isPremium={!!membershipActive}
        />
      </div>
      <main className="md:pl-56 pt-16">
        {children}
      </main>
      <Toaster richColors />
    </div>
  );
}
