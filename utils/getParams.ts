import { PageParamasProps } from "@/dtype";

export const getParams = (searchParams: PageParamasProps) => {
  return {
    page: searchParams?.page ? Number(searchParams.page) : 1,
    sizePage: searchParams.sizePage ? Number(searchParams.sizePage) : 10,
    sortBy: searchParams.sortBy ? searchParams.sortBy : undefined,
    isDesc: searchParams.isDesc ? searchParams.isDesc === 'true' : true,
    search: searchParams.search ? searchParams.search : undefined
  }

}