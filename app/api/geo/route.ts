import { geolocation } from '@vercel/functions';
import { NextResponse } from "next/server"

export const runtime = 'nodejs';

export function GET(request: Request) {
  const { city, country } = geolocation(request);
  return NextResponse.json({
    city,
    country
  })
}