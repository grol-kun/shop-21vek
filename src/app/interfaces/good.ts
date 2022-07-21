export interface Good {
  id: string,
  name: string,
  imageUrls: string[],
  availableAmount: number,
  price: number,
  rating: number,
  description: string
}

export interface CleverGood extends Good {
  isInCart: boolean,
  isFavorite: boolean
}
