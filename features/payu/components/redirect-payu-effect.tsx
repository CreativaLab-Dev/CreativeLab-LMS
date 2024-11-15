'use client'

import { Lock } from "lucide-react"
import { useEffect } from "react"

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

const RedirectPayuEffect = ({
  payuDetail,
  isProduction
}: RedirectPayuEffectProps) => {

  useEffect(() => {
    onCreateFormAndSubmit()
  }, [])

  const ckeckoutUrl = isProduction
    ? 'https://checkout.payulatam.com/ppp-web-gateway-payu/'
    : 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/'

  const isTest = isProduction ? '1' : '0'

  const onCreateFormAndSubmit = () => {
    const form = document.createElement('form')
    form.method = 'post'
    form.action = ckeckoutUrl
    form.style.display = 'none'

    //Aplicar for
    const keys = Object.keys(payuDetail)
    keys.forEach((key) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = payuDetail[key as keyof typeof payuDetail] || ''
      form.appendChild(input)
    })

    const inputTest = document.createElement('input')
    inputTest.type = 'hidden'
    inputTest.name = 'test'
    inputTest.value = isTest
    form.appendChild(inputTest)
    document.body.appendChild(form)
    form.submit()
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-pulse bg-primary text-white rounded-full h-20 w-20 flex items-center justify-center opacity-90 shadow-lg">
          <span className="text-lg font-bold">
            <Lock className="w-6 h-6" />
          </span>
        </div>
        <p className="mt-4 text-gray-700 text-lg font-medium">Validando datos...</p>
      </div>
    </div>
  )
}

export default RedirectPayuEffect;