import { auth } from "@/auth";
import HeaderPage from "@/components/ui/header-page";
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
        <HeaderPage
          title="Cursos"
          description="Descubre los cursos que tenemos para ti."
          bgColor="bg-gradient-to-r from-blue-500 to-blue-400"
          icon="course"
          iconColor="text-white"
        />
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
    </>

  );
}

export default SearchPage;