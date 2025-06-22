import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./slices/cart-slice"
import productsSlice from "./slices/products-slice"

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
