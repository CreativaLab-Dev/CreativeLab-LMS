'use client'

import { IconBadge } from "@/components/ui/icon-badge"
import { CheckCircle, Clock } from "lucide-react"

const IconMap = {
  'clock': Clock,
  'checkCircle': CheckCircle
}

interface InfoCardProps {
  icon: 'clock' | 'checkCircle'
  label: string
  numberOfItems: number
  variant?: "default" | "success"
}
const InfoCard = ({
  icon,
  label,
  numberOfItems,
  variant
}: InfoCardProps) => {
  const Icon = IconMap[icon]
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge
        variant={variant}
        icon={Icon}
      />
      <div>
        <p className="font-medium">
          {label}
        </p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "curso" : "cursos"}
        </p>
      </div>
    </div>
  );
}

export default InfoCard;