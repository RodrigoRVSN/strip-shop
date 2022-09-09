export interface IProduct {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
}

export interface ProductProps {
  product: IProduct
}
