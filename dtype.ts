/**
 * @description: Type for the page params
 * @param {string} page - The page number
 * @param {string} sizePage - The size of the page
 * @param {string} sortBy - The field to sort
 * @param {string} isDesc - The order to sort
 * @param {string} search - The search value
 * @return {PageParamasProps} - The page params
 * 
  */
export type PageParamasProps = {
  searchParams: {
    page?: string
    sizePage?: string
    sortBy?: string
    isDesc?: string
    title?: string
    name?: string
  }
}