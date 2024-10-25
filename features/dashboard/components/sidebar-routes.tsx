'use client';

import { User } from "@prisma/client";
import { BarChart2, Book, BookOpen, Calendar, Crown, Layout, LayoutDashboard, Settings, User2 } from "lucide-react"
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import EnrollButton from "@/components/ui/enroll-button";

const commonRoutes = [
  {
    icon: User2,
    label: "Mi perfil",
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
    icon: BookOpen,
    label: "Cursos",
    href: "/search",
  },
  // {
  //   icon: Calendar,
  //   label: "Eventos",
  //   href: "/events",
  // },

]

const teacherRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/teacher/dashboard",
  },
  {
    icon: Book,
    label: "Cursos",
    href: "/teacher/courses",
  },
  {
    label: "Estadisticas",
    icon: BarChart2,
    href: "/teacher/history",
  },
]

interface SidebarRoutesProps {
  currentUser: User;
  isPremium: boolean;
}

const SidebarRoutes = ({
  currentUser,
  isPremium
}: SidebarRoutesProps) => {
  const pathname = usePathname();

  const isTeacherPage = pathname.includes("/teacher")
  const routes = isTeacherPage ? teacherRoutes : studentRoutes;

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        {routes.map((route, index) => (
          <SidebarItem
            key={index}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>

      <div className="flex flex-col mb-4">
        <div className="px-4 py-3">
          {isPremium && (
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 border-yellow-600 text-white border text-center px-2 py-2 text-xs flex items-center justify-center w-full rounded-lg shadow-lg">
              <Crown className="h-4 w-4 text-white mr-2" />
              <p className="text-xs font-semibold">
                PREMIUM ACTIVO
              </p>
            </div>
          )}
          {!isPremium && <EnrollButton />}
        </div>
        {commonRoutes.map((route, index) => (
          <SidebarItem
            key={index}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
    </div>

  );
}

export default SidebarRoutes;