import { getDetailsToPayment } from "@/features/payu/actions/get-detail-to-payment"
import RedirectPayuEffect from "@/features/payu/components/redirect-payu-effect"
import { redirect } from "next/navigation"

interface PayUPageProps {
  searchParams?: Promise<{
    plan?: 'monthly' | 'annual'
  }>
}

// export const dynamic = 'force-dynamic'

const PayUPage = async (search: PayUPageProps) => {
  const searchParams = await search.searchParams
  const payuDetail = await getDetailsToPayment(searchParams?.plan || 'monthly')
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