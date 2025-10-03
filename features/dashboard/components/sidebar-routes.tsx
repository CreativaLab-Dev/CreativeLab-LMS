'use client';

import { User } from "@prisma/client";
import { BarChart2, Book, BookOpen, Calendar, CalendarArrowUp, CreditCard, Crown, Layout, Settings, User2, UserCircle } from "lucide-react"
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
    label: "Inicio",
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
  {
    icon: UserCircle,
    label: "Mentorias",
    href: "/mentors",
  },
  {
    icon: Book,
    label: "Recursos",
    href: "/resources",
  },

]

const teacherRoutes = [
  {
    icon: Book,
    label: "Mis cursos",
    href: "/teacher/courses",
  },
  // {
  //   icon: CalendarArrowUp,
  //   label: "Eventos",
  //   href: "/teacher/events",
  // },
  {
    icon: UserCircle,
    label: "Mentores",
    href: "/teacher/mentors",
  },
  {
    icon: Book,
    label: "Recursos",
    href: "/teacher/resources",
  },
  {
    icon: CreditCard,
    label: "Membresias",
    href: "/teacher/memberships",
  },
  {
    label: "Estadisticas",
    icon: BarChart2,
    href: "/teacher/statistics",
  },
]

interface SidebarRoutesProps {
  currentUser: User;
  isPremium: boolean;
  isAdmin?: boolean;
}

const SidebarRoutes = ({
  currentUser,
  isAdmin = false,
  isPremium
}: SidebarRoutesProps) => {
  const pathname = usePathname();

  const isTeacherPage = pathname.includes("/teacher")
  let routes = isTeacherPage ? teacherRoutes : studentRoutes;
  if (!isAdmin && isTeacherPage) {
    routes = routes.filter(route => route.href === "/teacher/courses");
  }

  const currentYear = new Date().getFullYear();

  const statisticsRoute = (href: string) => href.includes("statistics") ? `${href}?year=${currentYear}` : href;

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        {routes.map((route, index) => (
          <SidebarItem
            key={index}
            icon={route.icon}
            label={route.label}
            href={statisticsRoute(route.href)}
          />
        ))}
      </div>

      <div className="flex flex-col mb-4">
        {/* <div className="px-4 py-3">
          {!isTeacherPage && isPremium && (
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 border-yellow-600 text-white border text-center px-2 py-2 text-xs flex items-center justify-center w-full rounded-lg shadow-lg">
              <Crown className="h-4 w-4 text-white mr-2" />
              <p className="text-xs font-semibold">
                PREMIUM ACTIVO
              </p>
            </div>
          )}
          {!isTeacherPage && !isPremium && <EnrollButton />}
        </div> */}
        {!isTeacherPage && commonRoutes.map((route, index) => (
          <SidebarItem
            key={index}
            icon={route.icon}
            label={route.label}
            href={statisticsRoute(route.href)}
          />
        ))}
      </div>
    </div>

  );
}

export default SidebarRoutes;