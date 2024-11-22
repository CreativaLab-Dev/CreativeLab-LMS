'use client';

import { User } from "@prisma/client";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

interface SidebarProps {
  currentUser: User;
  isPremium: boolean;
  isAdmin?: boolean;
}

const Sidebar = ({
  isAdmin = false,
  currentUser,
  isPremium
}: SidebarProps) => {
  return (
    <div className="bg-gradient-to-b border-blue-600 from-blue-800 to-blue-500 h-full border-r flex flex-col overflow-y-auto">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full h-full">
        <SidebarRoutes
          isAdmin={isAdmin}
          currentUser={currentUser}
          isPremium={!!isPremium}
        />
      </div>
    </div>
  );
}

export default Sidebar;