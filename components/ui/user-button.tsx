'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@radix-ui/react-avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./button";
import { User } from "@prisma/client";
import { Badge } from "./badge";
import { signOut } from "next-auth/react";
import { Building, LogOut, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "./separator";

const roleText = {
  USER_BASIC: 'Gratis',
  USER_PREMIUM: 'Premium',
  ADMIN: 'Administrador',
}

interface UserButtonProps {
  currentUser: User;
}

const UserButton = ({ currentUser }: UserButtonProps) => {

  const router = useRouter()

  const avatarPath = currentUser?.image ? currentUser?.image : 'https://github.com/shadcn.png'
  const role = roleText[currentUser?.role as keyof typeof roleText]

  const handleProfile = () => {
    router.push('/profile')
  }

  const handleLogout = () => {
    signOut()
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
          <Avatar>
            <AvatarImage src={avatarPath} alt="@shadcn" className="w-full h-full" />
            <AvatarFallback>
              <div className=" loading-spinner">
                <span className="sr-only">Loading...</span>
              </div>
            </AvatarFallback>
          </Avatar>
        </div>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="bg-sky-100">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div
            className="flex gap-x-2 w-full cursor-pointer"
            onClick={handleProfile}
          >
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage src={avatarPath} alt="@shadcn" className="w-full h-full" />
                <AvatarFallback>
                  <div className=" loading-spinner">
                    <span className="sr-only">Loading...</span>
                  </div>
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm font-bold text-gray-800 truncate max-w-[190px]">
                {currentUser?.name}
              </div>
              <div className="text-sm text-gray-500 truncate max-w-[190px]">
                {currentUser?.email}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 items-center justify-center">
            <Badge>Plan: {role}</Badge>
          </div>
          <div className="flex flex-col justify-center gap-y-1 w-full">
            <Button
              className="w-full justify-start"
              variant='ghost'
              onClick={handleProfile}
            >
              <UserIcon size={16} />
              <span className="pl-2">
                Mi cuenta
              </span>
            </Button>
            <Separator className="mb-1 bg-sky-200" />
            <Button
              className="w-full justify-start"
              variant='ghost'
              onClick={handleProfile}
            >
              <Building size={16} />
              <span className="pl-2">
                Academia
              </span>
            </Button>
            <Separator className="mb-1 bg-sky-200" />
            <Button
              className="w-full justify-start"
              variant='ghost'
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span className="pl-2">
                Cerrar sesión
              </span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserButton;