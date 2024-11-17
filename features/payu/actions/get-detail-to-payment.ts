'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { calculateMD5Props, generateSignature } from "@/lib/generate-signature"

export const getDetailsToPayment = async (
  plan: 'monthly' | 'annual',
  // geolocation: {
  //   accountId: string,
  //   currency: string
  //   plans: {
  //     monthly: string,
  //     annual: string
  //   }
  // }
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
  const description = plan === 'monthly' ? 'Plan mensual' : 'Plan anual'
  const price = plan === 'monthly' ? '47282' : '472818'
  const currency = 'PEN'
  const accountId = '512321'

  const asignatureProps: calculateMD5Props = {
    apiKey: process.env.PAYU_SECRET_KEY || '',
    merchantId,
    reference: `CreativaLab-${paymentCount}`,
    price,
    currency: currency,
  }

  const newAsignature = generateSignature(asignatureProps)

  const requiredFields = {
    merchantId,
    referenceCode: asignatureProps.reference,
    accountId,
    description,
    currency: currency,
    amount: price,
    tax: '0',
    taxReturnBase: '0',
    signature: newAsignature,
    buyerEmail: user.email,
    responseUrl: 'http://www.test.com/response',
    confirmationUrl: 'http://www.test.com/confirmation',
  }
  return requiredFields
}