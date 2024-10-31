import { PageParamasProps } from "@/dtype";

export const getParams = (searchParams: PageParamasProps) => {
  const {
    searchParams: params
  } = searchParams
  return {
    page: params?.page ? Number(params.page) : 1,
    sizePage: params.sizePage ? Number(params.sizePage) : 10,
    sortBy: params.sortBy ? params.sortBy : undefined,
    isDesc: params.isDesc ? params.isDesc === 'true' : true,
    title: params.title ? params.title : undefined,
    name: params.name ? params.name : undefined
  }

}