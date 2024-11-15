'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { calculateMD5Props, generateSignature } from "@/lib/generate-signature"

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

  const asignatureProps: calculateMD5Props = {
    apiKey: process.env.PAYU_SECRET_KEY || '',
    merchantId: '1016915',
    reference: `TestPayU`,
    price: '20000',
    currency: 'COP'
  }

  const newAsignature = generateSignature(asignatureProps)

  const requiredFields = {
    merchantId: '1016915',
    referenceCode: `TestPayU`,
    accountId: '512326',
    description: 'Test PAYU',
    currency: 'COP',
    amount: '20000',
    tax: '3193',
    taxReturnBase: '16806',
    signature: newAsignature,
    buyerEmail: user.email,
    responseUrl: 'http://www.test.com/response',
    confirmationUrl: 'http://www.test.com/confirmation',
  }
  return requiredFields
}