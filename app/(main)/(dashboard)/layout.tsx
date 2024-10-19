
import { auth } from "@/auth";
import Navbar from "@/features/dashboard/components/navbar";
import Sidebar from "@/features/dashboard/components/sidebar";
import { getCurrentUser } from "@/lib/get-current-user";
import { Toaster } from "@/components/ui/toaster";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null
  }
  const currentUser = await getCurrentUser(session.user.id);
  if (!currentUser) {
    return null;
  }

  return (
    <div className="bg-sky-100 h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full">
        <Navbar currentUser={currentUser} />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-20">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
