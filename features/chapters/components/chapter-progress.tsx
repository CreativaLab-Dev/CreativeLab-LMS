'use client'

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  value: number;
  variant?: "success" | "default";
  size?: "default" | "sm"
  isMain?: boolean
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700"
}

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
}

const CourseProgress = ({
  value,
  size,
  variant,
  isMain = false
}: CourseProgressProps) => {
  return (
    <div>
      <Progress
        variant={variant}
        className="h-2"
        value={value}
      />
      <p className={cn(
        "font-medium mt-2",
        colorByVariant[variant || 'default'],
        sizeByVariant[size || 'default'],
        !isMain ? "text-sky-700" : "text-sky-100"
      )}>
        {Math.round(value)}% Completado
      </p>
    </div>
  );
}

export default CourseProgress;