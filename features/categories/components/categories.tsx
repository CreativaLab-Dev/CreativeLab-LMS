'use client'

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode
} from "react-icons/fc"
import { IconType } from "react-icons/lib";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[]
}

const icomMap: Record<Category['name'], IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcEngineering,
  "Filming": FcFilmReel,
  "Engineering": FcEngineering,
}

const Categories = ({
  items
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          Icon={icomMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}

export default Categories;