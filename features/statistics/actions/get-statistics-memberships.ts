'use server'

import { db } from "@/lib/db";
import { startOfMonth, endOfMonth } from "date-fns";

export type ChartMembershipData = {
  month: string;
  membershipMonthlyCount: number;
  membershipYearlyCount: number;
}

export type GetStatisticsMembership = {
  studentCount: number;
  monthlyMembershipCount: number;
  yearlyMembershipCount: number;
  chartMembershipData: ChartMembershipData[];
}

export const getStatisticsMembership = async (year: number): Promise<GetStatisticsMembership> => {
  try {
    const currentYear = year || new Date().getFullYear();

    // Array con los nombres de los meses en español
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Creamos un array de promesas para las consultas mensuales
    const monthlyDataPromises = months.map((month, index) => {
      const startDate = startOfMonth(new Date(currentYear, index, 1));
      const endDate = endOfMonth(startDate);

      // Promesa para obtener el conteo de membresías mensuales y anuales
      return Promise.all([
        db.membership.count({
          where: {
            type: "monthly",
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        }),
        db.membership.count({
          where: {
            type: "yearly",
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        })
      ]).then(([membershipMonthlyCount, membershipYearlyCount]) => ({
        month,
        membershipMonthlyCount,
        membershipYearlyCount,
      }));
    });

    // Esperamos a que todas las promesas se resuelvan en paralelo
    const monthlyData = await Promise.all(monthlyDataPromises);

    // Obtener el conteo total de estudiantes
    const studentCount = await db.student.count();

    const getMembershipStatistics: GetStatisticsMembership = {
      chartMembershipData: monthlyData,
      monthlyMembershipCount: monthlyData.reduce((acc, curr) => acc + curr.membershipMonthlyCount, 0),
      yearlyMembershipCount: monthlyData.reduce((acc, curr) => acc + curr.membershipYearlyCount, 0),
      studentCount,
    }

    return getMembershipStatistics;
  } catch (error) {
    return {
      chartMembershipData: [],
      monthlyMembershipCount: 0,
      yearlyMembershipCount: 0,
      studentCount: 0,
    };
  }
};
