import { auth } from "@/auth";
import SearchInput from "@/components/ui/search-input";
import { getCategories } from "@/features/categories/actions/get-categories";
import Categories from "@/features/categories/components/categories";
import CoursesList from "@/features/search/components/courses-list";
import getCourses from "@/features/search/components/get-courses";

interface SearchPageProps {
  searchParams: {
    title: string
    categoryId: string
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return null
  }

  const { id } = session.user


  const categories = await getCategories()
  const courses = await getCourses({
    userId: id,
    ...searchParams
  })
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
    </>

  );
}

export default SearchPage;