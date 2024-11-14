'use client'

import { useEffect, useRef } from "react"

const RedirectPayuEffect = () => {
  const refForm = useRef<any>(null)

  useEffect(() => {
    if (!refForm.current) return
    refForm.current.submit()
  }, [])

  return (
    <form
      ref={refForm}
      method="post"
      action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
    >
      <input name="merchantId" type="hidden" value="508029" />
      <input name="accountId" type="hidden" value="512321" />
      <input name="description" type="hidden" value="Test PAYU" />
      <input name="referenceCode" type="hidden" value="Testss" />
      <input name="amount" type="hidden" value="20000" />
      <input name="tax" type="hidden" value="3193" />
      <input name="taxReturnBase" type="hidden" value="16806" />
      <input name="currency" type="hidden" value="COP" />
      <input name="signature" type="hidden" value="7b9b3a35fc00f99dacdd7d83f1974d82" />
      <input name="test" type="hidden" value="0" />
      <input name="buyerEmail" type="hidden" value="test@test.com" />
      <input name="responseUrl" type="hidden" value="http://www.test.com/response" />
      <input name="confirmationUrl" type="hidden" value="http://www.test.com/confirmation" />
      <input name="Submit" type="submit" value="Enviar" />
    </form>
  )
}

export default RedirectPayuEffect;