'use client'

import { LucideIcon } from "lucide-react";

interface CardDashboardProps {
  label: string;
  total: number;
  icon: LucideIcon;
}

const CardDashboard = ({
  label,
  total,
  icon: Icon
}: CardDashboardProps) => {
  return (
    <div className="group flex items-center p-4 border border-gray-300 rounded-md bg-white hover:border-blue-400 transition-colors">
      <div className="flex-shrink-0 p-2 rounded-full bg-blue-100">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div className="ml-3">
        <span className="block text-xs text-gray-500 group-hover:text-blue-500">
          {label}
        </span>
        <span className="block text-xl font-semibold text-gray-800">
          {total}
        </span>
      </div>
    </div>
  );
}

export default CardDashboard;
