'use client'

import { NavbarRoutes } from "@/components/ui/navbar-routes";
import { User } from "@prisma/client";
import Logo from "@/features/dashboard/components/logo";

interface NavbarProps {
  currentUser: User;
  isPremium: boolean
  isSales?: boolean
}

const NavbarPlans = ({
  currentUser,
  isPremium,
  isSales
}: NavbarProps) => {
  return (
    <div className="bg-sky-100 p-4 border-b h-full flex items-center shadow-sm px-4 md:px-10">
      <Logo isSales />
      <NavbarRoutes
        isSales={isSales}
        currentUser={currentUser}
        isPremium={isPremium}
      />
    </div>
  );
}

export default NavbarPlans;