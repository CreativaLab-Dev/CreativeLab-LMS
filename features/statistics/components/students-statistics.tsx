'use client'

import CardDashboard from "@/components/ui/card-dashboard";
import { DollarSign, User, UserPlus, UserPlus2 } from "lucide-react";
import PaymentChart from "./payments-chart";
import { ChartStudentData } from "../actions/get-statistics-students";
import StudentChart from "./students-chart";

interface StudentsStatisticsProps {
  chartStudentData: ChartStudentData[];
  totalActiveStudents: number;
  totalNewStudents: number;
  currentYear: number;
}

const StudentsStatistics = ({
  chartStudentData,
  totalActiveStudents,
  totalNewStudents,
  currentYear
}: StudentsStatisticsProps) => {
  return (
    <div className="w-full px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardDashboard
          label="Nuevos estudiantes"
          total={totalNewStudents}
          icon={UserPlus}
        />
        <CardDashboard
          label="Estudiantes con membresía activa"
          total={totalActiveStudents}
          icon={UserPlus2}
        />
      </div>
      <div className="w-full mt-4">
        <StudentChart
          chartStudentData={chartStudentData}
          currentYear={currentYear}
        />
      </div>
    </div>
  );
}

export default StudentsStatistics;