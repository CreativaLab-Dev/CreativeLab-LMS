'use client'

import { NavbarRoutes } from "@/components/ui/navbar-routes";
import MobileSidebar from "./mobile-sidebar";
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser: User;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="bg-sky-100 p-4 border-b h-full flex items-center shadow-sm">
      <MobileSidebar />
      <NavbarRoutes currentUser={currentUser} />
    </div>
  );
}

export default Navbar;