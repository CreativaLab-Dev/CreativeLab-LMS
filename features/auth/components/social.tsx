'use client'

import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { Button } from "@/components/ui/button"

export const Social = () => {
  const onClick = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }
  return (
    <div className="flex items-center w-full">
      <Button
        size='lg'
        className="w-full"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle size={20} />
        <span className="px-2">Iniciar con google</span>
      </Button>
    </div>
  )
}