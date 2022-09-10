import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../../types/IProduct'
import { useSelector } from 'react-redux'
import { RootState } from '../../config'

export interface CartState {
  countItems: number
  items: IProduct[]
  totalPrice: number
}

const initialState: CartState = {
  countItems: 0,
  items: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.countItems += 1
      state.items = [...state.items, action.payload]
      state.totalPrice += action.payload.productPrice
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      const newItems = state.items.filter(item => item.id !== action.payload.id)

      state.items = newItems

      state.countItems -= 1
      state.totalPrice -= action.payload.productPrice
    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer

export const useCartReducer = () => useSelector((state: RootState) => state.cart)