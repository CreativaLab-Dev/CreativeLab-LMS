'use server'

import { db } from "@/lib/db";
import { startOfMonth, endOfMonth } from "date-fns";

export type ChartStudentData = {
  month: string;
  totalNewStudents: number; // Total de nuevos estudiantes en el mes
  totalActiveStudents: number; // Total de estudiantes con membresía activa en el mes
}

export type GetStatisticsStudents = {
  totalActiveStudents: number; // Total de estudiantes activos
  totalNewStudents: number; // Total de estudiantes nuevos
  chartStudentData: ChartStudentData[];
}

export const getStatisticsStudents = async (year: number): Promise<GetStatisticsStudents> => {
  try {
    const currentYear = year || new Date().getFullYear();

    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Array de promesas para las consultas de estudiantes nuevos y activos mensuales
    const monthlyDataPromises = months.map((month, index) => {
      const startDate = startOfMonth(new Date(currentYear, index, 1));
      const endDate = endOfMonth(startDate);

      // Consulta para contar nuevos estudiantes en el mes
      const newStudentsCount = db.user.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      // Consulta para contar estudiantes con membresía activa en el mes
      const activeStudentsCount = db.user.count({
        where: {
          memberships: {
            some: {
              expiresAt: {
                gte: new Date(), // La membresía debe ser válida hasta la fecha actual
              },
            },
          },
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      // Promesa para combinar ambas consultas
      return Promise.all([newStudentsCount, activeStudentsCount]).then(([totalNewStudents, totalActiveStudents]) => ({
        month,
        totalNewStudents,
        totalActiveStudents,
      }));
    });

    // Esperamos que todas las promesas se resuelvan
    const monthlyData = await Promise.all(monthlyDataPromises);

    // Obtener el total de estudiantes activos
    const totalActiveStudents = await db.user.count({
      where: {
        memberships: {
          some: {
            expiresAt: {
              gte: new Date(), // Deben tener al menos una membresía activa
            },
          },
        },
      },
    });

    // Obtener el total de nuevos estudiantes
    const totalNewStudents = await db.user.count({
      where: {
        createdAt: {
          gte: startOfMonth(new Date(currentYear, 0)), // Desde enero del año actual
          lte: endOfMonth(new Date(currentYear, 11)), // Hasta diciembre del año actual
        },
      },
    });

    const getStudentStatistics: GetStatisticsStudents = {
      chartStudentData: monthlyData,
      totalActiveStudents, // Total de estudiantes con membresía activa
      totalNewStudents, // Total de estudiantes nuevos en el año
    };

    return getStudentStatistics;
  } catch (error) {
    return {
      chartStudentData: [],
      totalActiveStudents: 0,
      totalNewStudents: 0,
    };
  }
};
