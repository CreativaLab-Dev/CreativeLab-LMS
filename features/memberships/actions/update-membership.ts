'use server'

import * as z from "zod"
import { db } from "@/lib/db"

import { EditMembershipFormSchema } from "@/features/memberships/schemas"

export const updateMembership = async (
  membershipId: string,
  values: z.infer<typeof EditMembershipFormSchema>
) => {
  const validation = EditMembershipFormSchema.safeParse(values)
  if (!validation.success) {
    return {
      error: "Error en los campos"
    }
  }

  const { userId, type, startDate, endDate } = values

  const student = await db.student.findUnique({
    where: {
      userId,
    }
  })

  if (!student) {
    return {
      error: "Este usuario no es un estudiante"
    }
  }

  //Add a one day in the start date to avoid the same day
  let startDateFormatted = new Date(startDate)
  startDateFormatted.setDate(startDateFormatted.getDate() + 1)
  let expiresAt = new Date(endDate)
  expiresAt.setDate(expiresAt.getDate() + 1)

  const membership = await db.membership.update({
    where: {
      id: membershipId,
    },
    data: {
      type,
      expiresAt,
      createdAt: startDateFormatted
    }
  })

  if (!membership) {
    return {
      error: "Error al actualizar la membresía"
    }
  }

  return {
    success: true,
  }
}