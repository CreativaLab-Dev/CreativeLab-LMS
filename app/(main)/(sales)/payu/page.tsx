import { getDetailsToPayment } from "@/features/payu/actions/get-detail-to-payment"
import RedirectPayuEffect from "@/features/payu/components/redirect-payu-effect"
import { redirect } from "next/navigation"

interface PayUPageProps {
  searchParams: {
    plan: 'monthly' | 'annual'
  }
}

const PayUPage = async ({
  searchParams
}: PayUPageProps) => {
  const { plan } = searchParams
  const payuDetail = await getDetailsToPayment(plan)
  if (!payuDetail) return redirect('/')
  const isProduction = process.env.PAYU_ENVIRONMENT === 'production'

  return (
    <RedirectPayuEffect
      payuDetail={payuDetail}
      isProduction={isProduction}
    />
  )
}

export default PayUPage