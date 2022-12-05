export const convertUrlToCategory = (url) => {
  return url.replace("-", " ")
}

export const convertCategoryToUrl = (category) => {
  return category.replace(/\s/, "-")
}