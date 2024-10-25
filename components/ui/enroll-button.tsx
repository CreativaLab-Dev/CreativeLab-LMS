'use client'

import { Button } from "./button";

interface EnrollButtonProps {
  courseId: string
}

const EnrollButton = ({
  courseId
}: EnrollButtonProps) => {
  return (
    <Button
      className="w-full md:w-auto"
    >
      Obtener premium
    </Button>
  );
}

export default EnrollButton;