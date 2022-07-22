export interface Details {
  name: string,
  address: string,
  phone: string,
  timeToDeliver: string,
  comment: string
}

export interface User {
  firstName: string,
  lastName: string,
  cart: string[],
  favorites: string[],
  orders?: [
    {
      items: [
        {
          id: string,
          amount: number
        }
      ],
      details: Details,
      id: string
    }
  ]
}


