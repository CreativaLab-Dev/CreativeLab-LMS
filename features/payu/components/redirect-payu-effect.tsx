'use client'

import { getGeoLocation } from "@/lib/get-geolocalization"
import { useEffect, useRef, useState } from "react"

interface RedirectPayuEffectProps {
  payuDetail: {
    merchantId: string,
    referenceCode: string,
    accountId: string,
    description: string,
    currency: string,
    amount: string,
    tax: string,
    taxReturnBase: string,
    signature: string | null,
    buyerEmail: string,
    responseUrl: string,
    confirmationUrl: string,
  }
  isProduction: boolean
}

const RedirectPayuEffect = ({ payuDetail, isProduction }: RedirectPayuEffectProps) => {
  const [country, setCountry] = useState<{
    accountId: string
    name: string
    currency: string
  }>({
    accountId: '',
    name: '',
    currency: ''
  });
  const refForm = useRef<any>(null)
  const {
    merchantId,
    referenceCode,
    accountId,
    description,
    currency,
    amount,
    tax,
    taxReturnBase,
    signature,
    buyerEmail,
    responseUrl,
    confirmationUrl,
  } = payuDetail

  useEffect(() => {
    getGeoLocation()
      .then((data) => {
        setCountry({
          accountId: data.accountId,
          name: data.name,
          currency: data.currency
        })

        if (!refForm.current) return
        refForm.current.submit()
      })
  }, [])

  const ckeckoutUrl = isProduction
    ? 'https://checkout.payulatam.com/ppp-web-gateway-payu/'
    : 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/'

  const isTest = isProduction ? '0' : '1'

  return (
    <form
      ref={refForm}
      method="post"
      action={ckeckoutUrl}
    >
      <input name="merchantId" type="hidden" value={merchantId} />
      <input name="accountId" type="hidden" value={country.accountId} />
      <input name="description" type="hidden" value={description} />
      <input name="referenceCode" type="hidden" value={referenceCode} />
      <input name="amount" type="hidden" value={amount} />
      <input name="tax" type="hidden" value={tax} />
      <input name="taxReturnBase" type="hidden" value={taxReturnBase} />
      <input name="currency" type="hidden" value={country.currency} />
      <input name="signature" type="hidden" value={`${signature}`} />
      <input name="test" type="hidden" value={isTest} />
      <input name="buyerEmail" type="hidden" value={buyerEmail} />
      <input name="responseUrl" type="hidden" value={responseUrl} />
      <input name="confirmationUrl" type="hidden" value={confirmationUrl} />
      <input name="Submit" type="submit" value="Enviar" />
    </form>
  )
}

export default RedirectPayuEffect;