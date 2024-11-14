import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  const body = req.body;
  return NextResponse.json({ body });
}