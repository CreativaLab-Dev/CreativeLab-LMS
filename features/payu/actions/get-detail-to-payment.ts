'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const getDetailsToPayment = async () => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id
    }
  })

  if (!user) {
    return null
  }

  const paymentCount = await db.paymentOrder.count() || 0

  const requiredFields = {
    merchantId: '1025855',
    referenceCode: `${paymentCount + 1}`,
    accountId: '',
    description: 'Test PAYU',
    currency: 'COP',
    amount: '10000',
    tax: '0',
    taxReturnBase: '0',
    signature: '',
    buyerEmail: user.email,
    telephone: '',
  }
  return requiredFields
}