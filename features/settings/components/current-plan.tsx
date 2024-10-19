'use client'

const roleText = {
  USER_BASIC: 'Gratis',
  USER_PREMIUM: 'Premium',
  ADMIN: 'Administrador',
}

interface CurrentPlanProps {
  plan?: string;
}

const CurrentPlan = ({ plan }: CurrentPlanProps) => {
  const planName = roleText[plan as keyof typeof roleText];
  return (
    <p className="text-gray-500">
      Tu plan actual es <strong>
        {planName}
      </strong>
    </p>
  );
}

export default CurrentPlan;