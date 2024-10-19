import Credentials from 'next-auth/providers/credentials'

import { LoginSchema } from './schemas'
import bcrypt from 'bcryptjs'

import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from "next-auth"
import { db } from './lib/db'

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      //@ts-ignore
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data;

        const user = await db.user.findFirst({
          where: {
            email
          }
        })

        if (!user || !user.password) {
          return null
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)

        if (!passwordsMatch) {
          return null
        }
        return user
      },
    }),
  ]
} satisfies NextAuthConfig