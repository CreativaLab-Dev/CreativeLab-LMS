'use client'

import MembershipChart from "./membership-chart";
import CardDashboard from "@/components/ui/card-dashboard";
import { Calendar, CalendarDays, User } from "lucide-react";
import { ChartMembershipData } from "../actions/get-statistics-memberships";

interface MembershipStatisticsProps {
  chartMembershipData: ChartMembershipData[];
  studentCount: number;
  monthlyMembershipCount: number;
  yearlyMembershipCount: number;
  currentYear: number;
}

const MembershipStatistics = ({
  chartMembershipData,
  monthlyMembershipCount,
  studentCount,
  yearlyMembershipCount,
  currentYear
}: MembershipStatisticsProps) => {
  return (
    <div className="w-full px-1 md:px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardDashboard
          label="Total de membresías por mes"
          total={monthlyMembershipCount}
          icon={Calendar}
        />
        <CardDashboard
          label="Total de membresías por año"
          total={yearlyMembershipCount}
          icon={CalendarDays}
        />
        <CardDashboard
          label="Total de estudiantes"
          total={studentCount}
          icon={User}
        />
      </div>
      <div className="w-full mt-4">
        <MembershipChart
          chartMembershipData={chartMembershipData}
          currentYear={currentYear}
        />
      </div>
    </div>
  );
}

export default MembershipStatistics;