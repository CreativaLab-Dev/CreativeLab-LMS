import SearchInput from "@/components/ui/search-input";
import { getCategories } from "@/features/categories/actions/get-categories";
import Categories from "@/features/categories/components/categories";

const SearchPage = async () => {
  const categories = await getCategories()
  console.log(categories)
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories
          items={categories}
        />
      </div>
    </>

  );
}

export default SearchPage;