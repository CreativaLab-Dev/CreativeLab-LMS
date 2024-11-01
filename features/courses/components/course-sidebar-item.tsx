'use client'

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle, Lock, PlayCircle } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface CourseSidebarItemProps {
  id: string
  label: string
  isCompleted: boolean
  courseId: string
  isLocked: boolean
}

const CourseSidebarItem = ({
  courseId,
  id,
  isCompleted,
  isLocked,
  label,
}: CourseSidebarItemProps) => {
  const pathName = usePathname()
  const router = useRouter()

  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle)
  const isActive = pathName.includes(id)

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`)
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-blue-300 text-sm font-[500] pl-6 transition-all hover:text-blue-200 hover:bg-blue-200/10 relative",
        isActive && "text-blue-200 bg-blue-200/20 hover:bg-blue-100/20 hover:text-blue-100",
        isCompleted && "text-green-300",
        !isCompleted && isActive && "text-blue-200"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-blue-300",
            isActive && "text-blue-200",
            isCompleted && "text-green-300"
          )}
        />
        {label}
      </div>
      <div className={cn(
        "ml-auto opacity-0 border-2 border-gray-800 h-full transition-all",
        isActive && "opacity-100",
        isCompleted && "border-green-400"
      )}
      />
    </button>
  );
}

export default CourseSidebarItem;