'use client'

import CardDashboard from "@/components/ui/card-dashboard";
import { DollarSign } from "lucide-react";
import PaymentChart from "./payments-chart";
import { ChartRevenueData } from "../actions/get-statistics-payments";

interface MembershipStatisticsProps {
  chartRevenueData: ChartRevenueData[];
  totalYearlyRevenue: number;
  totalYearlyRevenueOfMontlyMemberships: number;
  totalYearlyRevenueOfYearlyMemberships: number;
  currentYear: number;
}

const PaymentStatistics = ({
  chartRevenueData,
  totalYearlyRevenue,
  totalYearlyRevenueOfMontlyMemberships,
  totalYearlyRevenueOfYearlyMemberships,
  currentYear
}: MembershipStatisticsProps) => {
  return (
    <div className="w-full px-1 md:px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardDashboard
          label="Total de pagos del año"
          total={totalYearlyRevenue}
          icon={DollarSign}
        />
        <CardDashboard
          label="Ingresos de membresías mensuales"
          total={totalYearlyRevenueOfMontlyMemberships}
          icon={DollarSign}
        />
        <CardDashboard
          label="Ingresos de membresías anuales"
          total={totalYearlyRevenueOfYearlyMemberships}
          icon={DollarSign}
        />
      </div>
      <div className="w-full mt-4">
        <PaymentChart
          chartRevenueData={chartRevenueData}
          currentYear={currentYear}
        />
      </div>
    </div>
  );
}

export default PaymentStatistics;