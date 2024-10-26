'use client'

import { User } from "@prisma/client";
import UserButton from "./user-button"
import UpgradeButton from "./upgrade-button";
import { usePathname } from "next/navigation";
import SearchInput from "./search-input";
import Link from "next/link";
import { Button } from "./button";
import { LogOut } from "lucide-react";

interface NavbarRoutesProps {
  currentUser: User;
  isPremium: boolean
}

export const NavbarRoutes = ({
  currentUser,
  isPremium
}: NavbarRoutesProps) => {
  const pathname = usePathname()

  const isTeacherPage = pathname.includes("/teacher")
  const isCoursePage = pathname.includes("/courses")
  const isSearchPage = pathname === "/search"

  const isUserTeacher = currentUser.isAdmin

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="flex gap-x-2 ml-auto items-center">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button
              size='sm'
              variant='ghost'
            >
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </Link>
        ) : (isUserTeacher &&
          <Link href="/teacher/courses">
            <Button
              size='sm'
              variant='ghost'
            >
              Modo Profesor
            </Button>
          </Link>
        )}
        {/* {
          isUserBasic && <UpgradeButton />
        } */}
        <UserButton currentUser={currentUser} isPremium={isPremium} />
      </div >
    </>
  )
}