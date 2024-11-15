'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { calculateMD5Props, generateSignature } from "@/lib/generate-signature"

export const getDetailsToPayment = async (
  plan: 'monthly' | 'annual',
  geolocation: {
    accountId: string,
    currency: string
    plans: {
      monthly: string,
      annual: string
    }
  }
) => {
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

  const merchantId = '1016915'
  const price = geolocation.plans[plan] || '10'
  const description = plan === 'monthly' ? 'Plan mensual' : 'Plan anual'

  const asignatureProps: calculateMD5Props = {
    apiKey: process.env.PAYU_SECRET_KEY || '',
    merchantId,
    reference: `TestPayU${paymentCount}`,
    price,
    currency: geolocation.currency,
  }

  const newAsignature = generateSignature(asignatureProps)

  const requiredFields = {
    merchantId,
    referenceCode: asignatureProps.reference,
    accountId: geolocation.accountId,
    description,
    currency: geolocation.currency,
    amount: price,
    tax: '3193',
    taxReturnBase: '16806',
    signature: newAsignature,
    buyerEmail: user.email,
    responseUrl: 'http://www.test.com/response',
    confirmationUrl: 'http://www.test.com/confirmation',
  }
  return requiredFields
}