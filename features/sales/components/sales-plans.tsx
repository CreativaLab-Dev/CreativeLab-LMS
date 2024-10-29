import CardCustomPlan from "@/features/plans/components/card-custon-plan"
import CardPlan from "@/features/plans/components/card-plan"

const featuresPlanFree = [
  "Acceso a cursos seleccionados",
  "Acceso a eventos seleccionados",
  "Acceso a talleres seleccionados",
  "Acceso a recursos seleccionados",
]

const featuresPlanPro = [
  "Acceso a todos los cursos",
  "Acceso a todos los eventos",
  "Acceso a todos los talleres",
  "Acceso a todos los recursos",
]

const SalesPlans = () => {
  const planFree = featuresPlanFree
  const planPro = featuresPlanPro

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

export default SalesPlans; 