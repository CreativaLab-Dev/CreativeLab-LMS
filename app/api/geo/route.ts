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

const USD_PRICES = {
  monthly: 10,
  annual: 100
};

const EXCHANGE_RATES = {
  AR: 350,    // Argentina (ARS)
  BR: 5,      // Brasil (BRL)
  CL: 900,    // Chile (CLP)
  CO: 4000,   // Colombia (COP)
  MX: 17,     // México (MXN)
  PA: 1,      // Panamá (USD)
  PE: 3.8     // Perú (PEN)
};

const getLocalizedPrices = (countryCode: keyof typeof EXCHANGE_RATES) => {
  const rate = EXCHANGE_RATES[countryCode];
  return {
    monthly: (USD_PRICES.monthly * rate).toFixed(2),
    annual: (USD_PRICES.annual * rate).toFixed(2)
  };
};

export const runtime = 'nodejs';

export default async function GET(request: Request) {
  const { country = 'PE' } = geolocation(request);
  const countryData = COUNTRY_ACCOUNT_IDS[country as keyof typeof COUNTRY_ACCOUNT_IDS];

  if (!countryData) {
    return NextResponse.json({ error: "País no soportado" }, { status: 404 });
  }

  // Agregamos los precios en moneda local al objeto de datos del país
  const localizedPrices = getLocalizedPrices(country as keyof typeof EXCHANGE_RATES);
  const response = {
    ...countryData,
    plans: localizedPrices
  };

  return NextResponse.json(response);
}