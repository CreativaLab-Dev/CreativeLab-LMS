import { getDetailsToPayment } from "@/features/payu/actions/get-detail-to-payment"
import RedirectPayuEffect from "@/features/payu/components/redirect-payu-effect"
import { redirect } from "next/navigation"

interface PayUPageProps {
  searchParams?: Promise<{
    plan?: 'monthly' | 'annual'
  }>
}

const PayUPage = async () => {
  // let searchParams = await props.searchParams
  // let plan = searchParams?.plan || 'monthly'
  const payuDetail = await getDetailsToPayment('monthly')
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