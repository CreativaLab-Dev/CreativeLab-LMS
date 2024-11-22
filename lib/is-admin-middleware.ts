"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "./db"

export const isAdminMiddleware = async () => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return redirect('/login')
  }

  const currentUser = await db.user.findUnique({
    where: {
      id: session.user.id
    }
  })

  if (!currentUser) {
    return redirect('/')
  }

  if (!currentUser.isAdmin) {
    return redirect('/teacher/courses')
  }

  return
}