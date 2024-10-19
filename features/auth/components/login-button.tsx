'use client'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild = false
}: LoginButtonProps) => {
  const onClick = () => {
    if (mode === "modal") {
      // open modal
    } else {
      // redirect
    }
  }
  return (
    <span
      onClick={onClick}
      className="cursor-pointer">
      {children}
    </span>
  )
}