import { getDetailsToPayment } from "@/features/payu/actions/get-detail-to-payment"
import { getGeoLocation } from "@/lib/get-geolocalization"
import { redirect } from "next/navigation"

interface PayUPageProps {
  searchParams?: Promise<{
    plan?: 'monthly' | 'annual'
  }>
}

// export const dynamic = 'force-dynamic'

const PayUPage = async () => {
  const geolocation = await getGeoLocation()
  const payuDetail = await getDetailsToPayment('monthly', geolocation)
  if (!payuDetail) return redirect('/')
  const isProduction = process.env.PAYU_ENVIRONMENT === 'production'

  return (
    <></>
    // <RedirectPayuEffect
    //   payuDetail={payuDetail}
    //   isProduction={isProduction}
    // />
  )
}

export default PayUPage