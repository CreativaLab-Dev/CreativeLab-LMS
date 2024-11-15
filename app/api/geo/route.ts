import { geolocation } from '@vercel/functions';
import { NextResponse } from "next/server"

const COUNTRY_ACCOUNT_IDS = {
  AR: { name: "Argentina", accountId: "512322", currency: "ARS" },
  BR: { name: "Brasil", accountId: "512327", currency: "BRL" },
  CL: { name: "Chile", accountId: "512325", currency: "CLP" },
  CO: { name: "Colombia", accountId: "512321", currency: "COP" },
  MX: { name: "México", accountId: "512324", currency: "MXN" },
  PA: { name: "Panamá", accountId: "512326", currency: "PAB" },
  PE: { name: "Perú", accountId: "512323", currency: "PEN" }
};

export const runtime = 'nodejs';

export function GET(request: Request) {
  const { country = 'PE' } = geolocation(request);
  const countryData = COUNTRY_ACCOUNT_IDS[country as keyof typeof COUNTRY_ACCOUNT_IDS];

  return NextResponse.json(countryData);
}