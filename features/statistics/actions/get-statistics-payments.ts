'use server'

import { db } from "@/lib/db";
import { startOfMonth, endOfMonth } from "date-fns";

export type ChartRevenueData = {
  month: string;
  totalMonthlyRevenue: number; // Total de ingresos mensuales
}

export type GetStatisticsRevenue = {
  totalYearlyRevenue: number; // Ingreso total anual
  totalYearlyRevenueOfMontlyMemberships: number; // Ingreso total anual de membresías mensuales
  totalYearlyRevenueOfYearlyMemberships: number; // Ingreso total anual de membres
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

    // In this year
    const totalYearlyRevenueOfMontlyMemberships = await db.paymentOrder.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        membership: {
          type: "monthly",
          createdAt: {
            gte: new Date(currentYear, 0, 1),
            lte: new Date(currentYear, 11, 31),
          }
        },
      },
    }).then((result) => result._sum.amount || 0);

    const totalYearlyRevenueOfYearlyMemberships = await db.paymentOrder.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        membership: {
          type: "yearly",
          createdAt: {
            gte: new Date(currentYear, 0, 1),
            lte: new Date(currentYear, 11, 31),
          }
        }
      },
    }).then((result) => result._sum.amount || 0);

    const monthlyData = await Promise.all(monthlyDataPromises);

    const getRevenueStatistics: GetStatisticsRevenue = {
      chartRevenueData: monthlyData,
      totalYearlyRevenue: monthlyData.reduce((acc, curr) => acc + curr.totalMonthlyRevenue, 0),
      totalYearlyRevenueOfMontlyMemberships,
      totalYearlyRevenueOfYearlyMemberships,
    };

    return getRevenueStatistics;
  } catch (error) {
    console.log("[GET_STATISTICS_PAYMENTS_ERROR]", error);
    return {
      chartRevenueData: [],
      totalYearlyRevenue: 0,
      totalYearlyRevenueOfMontlyMemberships: 0,
      totalYearlyRevenueOfYearlyMemberships: 0,
    };
  }
};
