import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'

import { db } from '@/lib/db'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }
      return session
    },
    async jwt({ token }) {
      const existingUser = await db.user.findFirst({
        where: { id: token.sub }
      })
      if (!existingUser) {
        return null
      }
      token.role = existingUser.role
      return token
    },
    async authorized({ request }) {
      // Verify is token is valid
      console.log('Request:', request)
      return true
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})