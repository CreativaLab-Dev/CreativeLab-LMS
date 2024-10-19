'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LightbulbIcon, LightbulbOff } from "lucide-react";

const CardCustomPlan = () => {
  return (
    <Card className="w-full md:w-[550px] bg-sky-100 border-sky-200">
      <CardContent className="pt-4">
        <div className="flex gap-x-4 item-center">
          <LightbulbIcon className="w-20 h-20 text-gray-800" />
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">Plan personalizado</h2>
            <p className="text-gray-500">
              ¿Necesitas algo más específico?
            </p>
            <Button
              className="w-full"
              color="sky"
              size="lg"
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardCustomPlan;