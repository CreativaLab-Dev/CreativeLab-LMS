'use server'

import { auth } from "@/auth"
import { db } from "@/lib/db"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"

export const checkoutMembership = async (courseId: string) => {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { error: "No autorizado" }
    }
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      }
    })

    if (!course) {
      return { error: "Curso no encontrado" }
    }

    //Verify if exist membership active
    const membership = await db.membership.findFirst({
      where: {
        userId: session.user.id,
        status: "active",
        expiresAt: {
          gte: new Date()
        }
      }
    })

    if (membership) {
      return { error: "Ya tienes una membresía activa" }
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: 'Membresia de 1 mes',
            description: 'Acceso a todos los cursos por 1 mes',
          },
          unit_amount: 100
        }
      }
    ]

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: session.user.id
      },
      select: {
        stripeCustomerId: true
      }
    })

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: session.user.email!
      })
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: session.user.id,
          stripeCustomerId: customer.id
        }
      })
    }

    const sessionStripe = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: session.user.id
      }
    })

    return {
      success: true,
      url: sessionStripe.url
    }

  } catch (error) {
    console.error("[CHECKOUT_MEMBERSHIP]", error)
    return { error: "Algo salió mal" }

  }
}