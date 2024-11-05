'use client'

import CardDashboard from "@/components/ui/card-dashboard";
import { User, UserPlus, UserPlus2 } from "lucide-react";
import { ChartStudentData } from "../actions/get-statistics-students";
import StudentChart from "./students-chart";

interface StudentsStatisticsProps {
  chartStudentData: ChartStudentData[];
  totalActiveStudents: number;
  totalNewStudents: number;
  totalStudents: number;
  currentYear: number;
}

const StudentsStatistics = ({
  chartStudentData,
  totalActiveStudents,
  totalNewStudents,
  totalStudents,
  currentYear
}: StudentsStatisticsProps) => {
  return (
    <div className="w-full px-1 md:px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardDashboard
          label="Nuevos estudiantes en el mes"
          total={totalNewStudents}
          icon={UserPlus}
        />
        <CardDashboard
          label="Estudiantes con membresía activa"
          total={totalActiveStudents}
          icon={UserPlus2}
        />
        <CardDashboard
          label="Total de estudiantes"
          total={totalStudents}
          icon={User}
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