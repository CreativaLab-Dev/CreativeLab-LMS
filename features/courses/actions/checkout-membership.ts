import { auth } from "@/auth"
import { db } from "@/lib/db"

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

    console.log(membership)
    if (membership) {
      return { error: "Ya tienes una membresía activa" }
    }


  } catch (error) {
    console.error("[CHECKOUT_MEMBERSHIP]", error)
    return { error: "Algo salió mal" }

  }
}