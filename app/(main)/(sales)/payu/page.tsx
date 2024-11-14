import { redirectToPayments } from "@/features/payu/actions/redirec-to-payments"

const PayUPage = async () => {
  const redirectPayments = await redirectToPayments()
  return (
    <div>
      <h1>PayU</h1>
    </div>
  )
}

export default PayUPage