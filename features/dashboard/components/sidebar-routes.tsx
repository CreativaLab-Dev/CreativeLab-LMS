'use client';

import { User } from "@prisma/client";
import { BookUser, Compass, HistoryIcon, Layout, Settings, UserIcon } from "lucide-react"
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const commonRoutes = [

]

const studentRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Cursos",
    href: "/search",
  },
  {
    icon: UserIcon,
    label: "Mi cuenta",
    href: "/profile",
  },
  {
    icon: Settings,
    label: "Configuracion",
    href: "/settings",
  },
]

const teacherRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/teacher/dashboard",
  },
  {
    icon: BookUser,
    label: "Cursos",
    href: "/teacher/courses",
  },
  {
    label: "Estadisticas",
    icon: HistoryIcon,
    href: "/teacher/history",
  },
]

interface SidebarRoutesProps {
  currentUser: User;
}

const SidebarRoutes = ({ currentUser }: SidebarRoutesProps) => {
  const pathname = usePathname();

  const isTeacherPage = pathname.includes("/teacher")
  const routes = isTeacherPage ? teacherRoutes : studentRoutes;

  return (
    <div className="flex flex-col w-full">
      {
        routes.map((route, index) => (
          <SidebarItem
            key={index}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))
      }
    </div>
  );
}

export default SidebarRoutes;