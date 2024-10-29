import { auth } from "@/auth";
import SalesPlans from "@/features/sales/components/sales-plans";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function PlansPage() {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null;
  }
  const currentUser = await getCurrentUser(session.user.id);
  if (!currentUser) {
    return null;
  }

  return (
    <SalesPlans />
  );
}