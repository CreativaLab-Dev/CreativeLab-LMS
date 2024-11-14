import { getDetailsToPayment } from "@/features/payu/actions/get-detail-to-payment"
import RedirectPayuEffect from "@/features/payu/components/redirect-payu-effect"

const PayUPage = async () => {
  const redirectPayments = await getDetailsToPayment()
  console.log(redirectPayments)
  return (
    <RedirectPayuEffect />
  )
}

export default PayUPage