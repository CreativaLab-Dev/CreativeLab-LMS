import { auth } from "@/auth";
import PayPalMonthlyButton from "@/features/sales/components/paypal-button-monthly";
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
    <div className="flex flex-col items-center justify-center h-screen px-3 sm:px-10">
      <p className="text-sm text-gray-600 mb-5 text-center">
        Selecciona una forma de pago para continuar con tu suscripción
      </p>
      <div>
        <PayPalMonthlyButton />
      </div>
    </div>
  );
}