import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../../types/IProduct'

export interface CartState {
  countItems: number
  items: IProduct[]
}

const initialState: CartState = {
  countItems: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.countItems += 1
      state.items = [...state.items, action.payload]
    },
    removeFromCart: (state) => {
      state.countItems -= 1
    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer