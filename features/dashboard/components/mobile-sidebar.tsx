'use client'

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import Sidebar from "./sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition bg-sky-100">
        <Menu size="24" />
      </SheetTrigger>
      <SheetContent side='left' className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;