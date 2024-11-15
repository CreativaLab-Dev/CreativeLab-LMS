"use server"

export const getGeoLocation = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL! || ''
  const url = new URL(`${baseUrl}/api/geo`);
  // @ts-ignore
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}