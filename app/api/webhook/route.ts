import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string
  console.log(signature)

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error?.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const userId = session?.metadata?.userId
  const courseId = session?.metadata?.courseId

  const student = await db.student.findFirst({
    where: {
      userId
    }
  })

  if (!student) {
    return new NextResponse("Error: Student not found", { status: 404 })
  }

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse("Error: Missing metadata", { status: 400 })
    }

    const paymentOrder = await db.paymentOrder.create({
      data: {
        amount: session?.amount_total ?? 10,
        status: "paid",
      }
    })

    await db.studentCourse.create({
      data: {
        courseId,
        studentId: student.id
      }
    })

    await db.membership.create({
      data: {
        userId,
        expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        status: "active",
        paymentOrderId: paymentOrder.id,
        type: "monthly"
      }
    })
  } else {
    return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
  }

  return new NextResponse(null, { status: 200 })
}