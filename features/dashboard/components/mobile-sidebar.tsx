'use client'

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import Sidebar from "./sidebar";
import { User } from "@prisma/client";

interface MobileSidebarProps {
  currentUser: User;
  isPremium: boolean;
}

const MobileSidebar = ({
  currentUser,
  isPremium
}: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition bg-blue-500">
        <Menu size="24" className="text-blue-200" />
      </SheetTrigger>
      <SheetContent side='left' className="p-0 bg-blue-500 border-blue-500">
        <Sidebar
          currentUser={currentUser}
          isPremium={isPremium}
        />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;