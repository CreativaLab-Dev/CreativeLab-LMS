import { MD5 } from 'crypto-js';

export interface calculateMD5Props {
  apiKey: string
  merchantId: string
  reference: string
  price: string
  currency: string
}

export const generateSignature = (data: calculateMD5Props) => {
  try {
    const { apiKey, merchantId, reference, price, currency } = data
    const string = `${apiKey}~${merchantId}~${reference}~${price}~${currency}`
    return MD5(string).toString()
  } catch (error) {
    return null
  }
}