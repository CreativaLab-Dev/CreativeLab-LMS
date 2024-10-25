'use client';

import { User } from "@prisma/client";
import { BookUser, Compass, HistoryIcon, Layout, Settings, UserIcon } from "lucide-react"
import SidebarItem from "./sidebar-item";

const commonRoutes = [
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
  ...commonRoutes,
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
  ...commonRoutes,
]

interface SidebarRoutesProps {
  currentUser: User;
}

const SidebarRoutes = ({ currentUser }: SidebarRoutesProps) => {
  console.log(currentUser)
  const role = currentUser?.studentId ? "student" : "teacher";
  const routes = role === "student" ? studentRoutes : teacherRoutes;
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