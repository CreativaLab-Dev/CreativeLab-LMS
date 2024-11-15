import { getDetailsToPayment } from "@/features/payu/actions/get-detail-to-payment"
import RedirectPayuEffect from "@/features/payu/components/redirect-payu-effect"
import { redirect } from "next/navigation"

const PayUPage = async () => {
  const payuDetail = await getDetailsToPayment()
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