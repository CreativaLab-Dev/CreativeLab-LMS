'use server'

import * as z from "zod"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_TEACHER_REDIRECT, DEFAULT_LOGIN_STUDENT_REDIRECT } from "@/routes"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values)
  const validateFields = RegisterSchema.safeParse(values)
  if (!validateFields.success) {
    return { error: "Credenciales invalidas" }
  }
  const { email, password, name } = validateFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await db.user.findUnique({
    where: {
      email,
    }
  })

  if (existingUser) {
    return { error: "Este correo ya esta siendo usado" }
  }

  await db.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    if (values.role === "teacher") {
      const teacher = await tx.teacher.create({
        data: {
          userId: newUser.id,
        }
      })
      await tx.user.update({
        where: {
          id: newUser.id
        },
        data: {
          teacherId: teacher.id
        }
      })
    }

    const student = await tx.student.create({
      data: {
        userId: newUser.id,
      }
    })
    await tx.user.update({
      where: {
        id: newUser.id
      },
      data: {
        studentId: student.id
      }
    })

  })
  if (values.role === "teacher") {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_TEACHER_REDIRECT
    })
  }

  if (values.role === "student") {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_STUDENT_REDIRECT
    })
  }

  //Todo verification token

  return { success: 'Usuario agregado correctamente' }
}