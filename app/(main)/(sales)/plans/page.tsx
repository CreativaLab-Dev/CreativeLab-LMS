import { auth } from "@/auth";
import CardCustomPlan from "@/features/plans/components/card-custon-plan";
import CardPlan from "@/features/plans/components/card-plan";
import { getCurrentUser } from "@/lib/get-current-user";

const featuresPlanFree = [
  "Hasta 3 proyectos",
  "Hasta 10 diseños",
  "Hasta 100 elementos",
  "Hasta 1000 visitas",
  "Soporte por email",
  "Soporte por chat",
  "Soporte por teléfono",
]

const featuresPlanPro = [
  "Proyectos ilimitados",
  "Diseños ilimitados",
  "Elementos ilimitados",
  "Visitas ilimitadas",
  "Soporte por chat",
  "Soporte por teléfono",
  "Soporte por video",
  "Soporte por email",
]

export default async function PlansPage() {
  const planFree = featuresPlanFree
  const planPro = featuresPlanPro
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null;
  }
  const currentUser = await getCurrentUser(session.user.id);
  if (!currentUser) {
    return null;
  }

  return (
    <div className="px-4 md:px-10 flex flex-col gap-y-4">
      <h1 className="py-4 md:py-12 text-2xl md:text-5xl font-bold text-center">
        Elije el plan más adecuado para ti
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-y-10 gap-x-4 px-4 md:px-16">
        <CardPlan
          title="Mensual"
          description="Comienza a diseñar con las funciones básicas de nuestra plataforma."
          price={10}
          bgColor="bg-sky-500"
          features={planFree}
        />
        <CardPlan
          title="Anual"
          titleColor="text-indigo-100"
          description="Desbloqueda funciones esenciales para diseñadores y equipos de diseño."
          price={100}
          bgColor="bg-sky-900"
          features={planPro}
          isPro
        />
      </div>
      <div className="py-5 md:py-10 px-6 md:px-10 flex items-center justify-center">
        <CardCustomPlan />
      </div>
    </div>
  );
}