import CardCustomPlan from "@/features/plans/components/card-custon-plan"
import CardPlan from "@/features/plans/components/card-plan"

interface SalesPlansProps {
  isModal?: boolean
}

const SalesPlans = ({
  isModal = false
}: SalesPlansProps) => {

  return (
    <div className="px-4 md:px-10 flex flex-col gap-y-4">
      {isModal && (
        <h1 className="font-semibold text-2xl md:text-5xl text-center py-8">
          Pasa a ser premium!!
        </h1>
      )}
      {!isModal && (
        <h1 className="py-4 md:py-12 text-2xl md:text-5xl font-bold text-center">
          Únete a Creativa Academy pro
        </h1>
      )}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-y-10 gap-x-4 px-4 md:px-16">
        <CardPlan
          title="Pro"
          description="Una membresía mensual que te brinda todo lo que necesitas para seguir creando proyectos sin código para tu portafolio en el mundo digital."
          price={19}
          bgColor="bg-gradient-to-l from-blue-800 to-blue-500 shadow-sm"
          features={[
            "Descuentos exclusivos: Hasta 30% en cursos.",
            "Recursos premium: Plantillas de Notion gratuitas.",
            "Mentorías personalizadas: Puedes agendar hasta 2 mentorías sin costo.",
            "Comunidad privada: Para seguir creando proyectos con no code."


          ]}
          plan="monthly"
          url="https://www.patreon.com/checkout/CreativaAcademy"
        />
        {/* <CardPlan
          title="Anual"
          titleColor="text-indigo-100"
          description="Desbloqueda funciones esenciales para diseñadores y equipos de diseño."
          price={100}
          bgColor="bg-sky-900"
          features={[]}
          plan="annual"
          isPro
        /> */}
      </div>
      {!isModal && (
        <div className="py-5 md:py-10 px-6 md:px-10 flex items-center justify-center">
          <CardCustomPlan />
        </div>
      )}

    </div>
  );
}

export default SalesPlans; 