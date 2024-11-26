'use server'

import { db } from "@/lib/db"
import { auth } from "@/auth"

export const deleteMembership = async (
  membershipId: string
) => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return {
      error: "Usuario no autenticado"
    }
  }

  const admi = await db.user.findUnique({
    where: {
      id: session.user.id,
      isAdmin: true
    }
  })

  if (!admi) {
    return {
      error: "Este usuario no es administrador"
    }
  }

  const membership = await db.membership.findUnique({
    where: {
      id: membershipId
    }
  })

  if (!membership) {
    return {
      error: "Membresía no encontrada"
    }
  }

  const paymentOrder = await db.paymentOrder.findUnique({
    where: {
      id: membership.paymentOrderId
    }
  })

  if (paymentOrder) {
    await db.paymentOrder.delete({
      where: {
        id: membership.paymentOrderId
      }
    })
  }

  return {
    success: true,
  }
}