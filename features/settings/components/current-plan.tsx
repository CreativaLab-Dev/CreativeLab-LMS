'use client'

import { cn } from "@/lib/utils";

interface CurrentPlanProps {
  plan?: string;
}

const CurrentPlan = ({ plan }: CurrentPlanProps) => {
  return (
    <p className="text-gray-500">
      Tu plan actual es <strong className={cn(
        plan === 'Premium' ? 'text-sky-500' : 'text-gray-500'
      )}>
        {plan}
      </strong>
    </p>
  );
}

export default CurrentPlan;