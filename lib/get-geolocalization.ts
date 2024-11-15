export const getGeoLocation = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL! || ''
  const url = `${baseUrl}/api/geo`
  const response = await fetch(url)
  return await response.json()
}