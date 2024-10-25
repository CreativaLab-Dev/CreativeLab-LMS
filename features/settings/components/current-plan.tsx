'use client'

import { cn } from "@/lib/utils";
import { Membership } from "@prisma/client";
import { format } from "date-fns";

interface CurrentPlanProps {
  plan?: string;
  membership: Membership | null;
}

const CurrentPlan = ({
  plan,
  membership
}: CurrentPlanProps) => {

  const formattedDate = membership?.expiresAt ? format(new Date(membership.expiresAt), 'dd/MM/yyyy') : null;

  return (
    <>
      <p className="text-gray-500">
        Tu plan actual es <strong className={cn(
          plan === 'Premium' ? 'text-sky-500' : 'text-gray-500'
        )}>
          {plan}
        </strong>
      </p>
      {formattedDate && (
        <p className="text-gray-500 text-xs">
          Tu plan vence el {formattedDate}
        </p>
      )}

    </>
  );
}

export default CurrentPlan;