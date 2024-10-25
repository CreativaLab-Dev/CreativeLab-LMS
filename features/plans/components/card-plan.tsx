'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { checkoutMembership } from "@/features/courses/actions/checkout-membership";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface CardPlanProps {
  title: string;
  description: string;
  price: number;
  bgColor: string;
  titleColor?: string;
  isPro?: boolean;
  features: string[];
}

const CardPlan = ({
  description,
  price,
  title,
  bgColor,
  titleColor,
  isPro,
  features
}: CardPlanProps) => {
  const [isPending, startTransition] = useTransition()
  const onClick = () => {
    startTransition(() => {
      checkoutMembership(price)
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
    <div className="flex flex-col gapy-4">
      <Card className={cn("w-[320px]", bgColor)}>
        <CardContent className="pt:10 md:pt-16">
          <p className={cn("text-xl md:text-3xl font-bold text-center py-4 md:py-6 text-gray-100", titleColor)}>
            {title}
          </p>
          <p className="px-2 md:px-4 py-4 md:py-6 text-center text-gray-100">
            {description}
          </p>
          <p className="text-3xl font-bold text-center py-4 md:py-8 text-gray-100">
            {
              price === 0 ? 'Gratis' : price}
            {
              price !== 0 && <span className=" px-1 text-lg font-normal">
                USD/mes
              </span>
            }
          </p>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isPending}
            onClick={onClick}
            className="rounded-xl w-full font-bold"
            variant={isPro ? 'premium' : 'outline'}
          >
            Elegir
          </Button>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-4 px-4 md:px-8 mt-4 md:mt-10">
        {
          features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-800">
              <Check size={24} />
              <p className="text-sm md:text-base">
                {feature}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default CardPlan;