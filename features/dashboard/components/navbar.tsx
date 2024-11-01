'use client'

import { NavbarRoutes } from "@/components/ui/navbar-routes";
import { User } from "@prisma/client";
import MobileSidebar from "./mobile-sidebar";

interface NavbarProps {
  currentUser: User;
  isPremium: boolean
}

const Navbar = ({
  currentUser,
  isPremium
}: NavbarProps) => {
  return (
    <div className="bg-gradient-to-l from-blue-800 to-blue-500 p-4 border-b h-full flex items-center shadow-sm">
      <MobileSidebar currentUser={currentUser} isPremium={isPremium} />
      <NavbarRoutes currentUser={currentUser} isPremium={isPremium} />
    </div>
  );
}

export default Navbar;