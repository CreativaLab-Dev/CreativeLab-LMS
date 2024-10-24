'use client'

import { User } from "@prisma/client";
import UserButton from "./user-button"
import UpgradeButton from "./upgrade-button";
import { usePathname } from "next/navigation";
import SearchInput from "./search-input";

interface NavbarRoutesProps {
  currentUser: User;
}

export const NavbarRoutes = ({
  currentUser
}: NavbarRoutesProps) => {
  const pathname = usePathname()

  const isTeacherPage = pathname.includes("/teacher")
  const isPlayerPage = pathname.includes("/player")
  const isSearchPage = pathname === "/search"

  const isUserBasic = currentUser && currentUser.role && currentUser.role === "USER_BASIC"
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto bg-sky-100 items-center">
        {
          isUserBasic && <UpgradeButton />
        }
        <UserButton currentUser={currentUser} />
      </div >
    </>
  )
}