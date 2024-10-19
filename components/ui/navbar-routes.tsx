'use client'

import { User } from "@prisma/client";
import UserButton from "./user-button"
import UpgradeButton from "./upgrade-button";

interface NavbarRoutesProps {
  currentUser: User;
}

export const NavbarRoutes = ({ currentUser }: NavbarRoutesProps) => {
  const isUserBasic = currentUser && currentUser.role && currentUser.role === "USER_BASIC"
  return (
    <div className="flex gap-x-2 ml-auto bg-sky-100 items-center">
      {
        isUserBasic && <UpgradeButton />
      }
      <UserButton currentUser={currentUser} />
    </div>
  )
}