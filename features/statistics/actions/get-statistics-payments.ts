'use server'

import { db } from "@/lib/db";
import { startOfMonth, endOfMonth } from "date-fns";

export type ChartRevenueData = {
  month: string;
  totalMonthlyRevenue: number; // Total de ingresos mensuales
}

export type GetStatisticsRevenue = {
  totalYearlyRevenue: number; // Ingreso total anual
  chartRevenueData: ChartRevenueData[];
}

export const getStatisticsPayments = async (year: number): Promise<GetStatisticsRevenue> => {
  try {
    const currentYear = year || new Date().getFullYear();

    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Array de promesas para las consultas de ingresos mensuales
    const monthlyDataPromises = months.map((month, index) => {
      const startDate = startOfMonth(new Date(currentYear, index, 1));
      const endDate = endOfMonth(startDate);

      // Consulta para sumar los ingresos mensuales
      return db.paymentOrder.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }).then((result) => ({
        month,
        totalMonthlyRevenue: result._sum.amount || 0, // Total de ingresos para el mes
      }));
    });

    // Esperamos que todas las promesas se resuelvan
    const monthlyData = await Promise.all(monthlyDataPromises);

    const getRevenueStatistics: GetStatisticsRevenue = {
      chartRevenueData: monthlyData,
      totalYearlyRevenue: monthlyData.reduce((acc, curr) => acc + curr.totalMonthlyRevenue, 0), // Ingreso total del año
    };

    return getRevenueStatistics;
  } catch (error) {
    return {
      chartRevenueData: [],
      totalYearlyRevenue: 0,
    };
  }
};
