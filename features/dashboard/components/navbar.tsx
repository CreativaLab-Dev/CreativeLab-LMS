'use client'

import { NavbarRoutes } from "@/components/ui/navbar-routes";
import { User } from "@prisma/client";
import MobileSidebar from "./mobile-sidebar";

interface NavbarProps {
  currentUser: User;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="bg-sky-100 p-4 border-b h-full flex items-center shadow-sm">
      <MobileSidebar currentUser={currentUser} />
      <NavbarRoutes currentUser={currentUser} />
    </div>
  );
}

export default Navbar;