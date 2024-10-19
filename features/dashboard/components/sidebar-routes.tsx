'use client';

import { Compass, Layout, Settings, UserIcon } from "lucide-react"
import SidebarItem from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
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

const SidebarRoutes = () => {
  const routes = guestRoutes;
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