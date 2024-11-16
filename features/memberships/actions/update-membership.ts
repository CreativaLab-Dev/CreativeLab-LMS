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

  const { userId, type, startDate } = values

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

  const startDateFormatted = new Date(startDate)
  let expiresAt = new Date(startDateFormatted)

  if (type === 'month') {
    expiresAt.setMonth(expiresAt.getMonth() + 1)
  }

  if (type === 'year') {
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)
  }


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