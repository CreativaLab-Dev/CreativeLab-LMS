import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export const redirectToPayments = async () => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/payu?error=auth')
  }

  const user = db.user.findUnique({
    where: {
      id: session.user.id
    }
  })

  if (!user) {
    return redirect('/payu?error=user')
  }

  const paymentCount = await db.paymentOrder.count() || 0

  const requiredFields = {
    merchantId: '1025855',
    referenceCode: `${paymentCount + 1}`,
  }

  console.log('Redirecting to payments...')
  return

}