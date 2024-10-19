'use client'

import { Sparkles } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const UpgradeButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/plans');
  }
  return (
    <Button
      variant={'premium'}
      onClick={handleClick}
    >
      Mejorar Plan
      <Sparkles className="w-4 h-4 fill-white text-white ml-2" />
    </Button>
  );
}

export default UpgradeButton;