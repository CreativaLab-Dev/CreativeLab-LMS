'use client'

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { checkoutMembership } from "@/features/courses/actions/checkout-membership";

interface EnrollButtonProps {
  courseId: string
}

const EnrollButton = ({
  courseId
}: EnrollButtonProps) => {
  const [isPending, startTransition] = useTransition()
  const onClick = () => {
    startTransition(() => {
      checkoutMembership(courseId)
        .then((response) => {
          if (response.error) {
            toast.error(response.error)
          }
          if (response.success && response.url) {
            console.log(response.url)
            window.location.assign(response.url)
          }
        })
    })
  }
  return (
    <Button
      className="w-full md:w-auto"
      disabled={isPending}
      onClick={onClick}
    >
      Obtener premium
    </Button>
  );
}

export default EnrollButton;