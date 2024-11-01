'use client'

import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"
import LogoAuth from "./logo-auth"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

interface HeaderProps {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <LogoAuth />
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  )
}