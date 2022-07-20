import { SubCategory } from "./subCategory";

export interface Category {
  id: string,
  name: string,
  subCategories: SubCategory[]
}
