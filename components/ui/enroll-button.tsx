'use client'

import { useTransition } from "react";
import { Button } from "./button";
import { Crown } from "lucide-react";
import { useRouter } from "next/navigation";

const EnrollButton = () => {
  const router = useRouter()
  const onClick = () => {
    router.push('/plans')
  }
  return (
    <Button
      className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-xs"
      onClick={onClick}
    >
      Obtener premium
      <Crown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default EnrollButton;