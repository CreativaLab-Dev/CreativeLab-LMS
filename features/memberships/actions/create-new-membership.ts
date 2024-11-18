'use server'

import * as z from "zod"
import { db } from "@/lib/db"

import { NewMembershipFormSchema } from "@/features/memberships/schemas"

export const createNewMembership = async (
  values: z.infer<typeof NewMembershipFormSchema>
) => {
  const validation = NewMembershipFormSchema.safeParse(values)
  if (!validation.success) {
    return {
      error: "Error en los campos"
    }
  }

  const { userId, type, startDate, amount, endDate } = values

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
  let expiresAt = new Date(endDate)
  console.log('startDateFormatted', startDateFormatted)
  console.log('expiresAt', expiresAt)

  if (type === 'month') {
    expiresAt.setMonth(expiresAt.getMonth() + 1)
  }

  if (type === 'year') {
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)
  }

  const amountNumber = parseFloat(amount) ?? 0

  const membership = await db.membership.create({
    data: {
      type,
      expiresAt,
      status: 'active',
      createdAt: startDateFormatted.toISOString(),
      paymentOrders: {
        create: {
          amount: amountNumber,
          status: 'paid',
        },
      },
      user: {
        connect: {
          id: userId
        }
      }
    }
  })

  console.log('membership', membership)

  if (!membership) {
    return {
      error: "Error al crear la membresía"
    }
  }

  return {
    success: true,
    id: membership.id
  }
}