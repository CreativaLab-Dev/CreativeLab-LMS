'use client'

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { checkoutMembership } from "@/features/courses/actions/checkout-membership";
import { Crown } from "lucide-react";

const EnrollButton = () => {
  const [isPending, startTransition] = useTransition()
  const onClick = () => {
    startTransition(() => {
      checkoutMembership()
        .then((response) => {
          if (response.error) {
            toast.error(response.error)
          }
          if (response.success && response.url) {
            window.location.assign(response.url)
          }
        })
    })
  }
  return (
    <Button
      className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-xs"
      disabled={isPending}
      onClick={onClick}
    >
      Obtener premium
      <Crown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default EnrollButton;