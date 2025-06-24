// // import { configureStore } from "@reduxjs/toolkit"
// // import cartSlice from "./slices/cart-slice"
// // import productsSlice from "./slices/products-slice"

// // export const store = configureStore({
// //   reducer: {
// //     cart: cartSlice,
// //     products: productsSlice,
// //   },
// // })

// // export type RootState = ReturnType<typeof store.getState>
// // export type AppDispatch = typeof store.dispatch

// // store/index.ts
// import { configureStore } from "@reduxjs/toolkit"
// import { persistStore, persistReducer } from "redux-persist"
// import storage from "redux-persist/lib/storage" // defaults to localStorage for web
// import { combineReducers } from "@reduxjs/toolkit"
// import cartSlice from "./slices/cart-slice"
// import productsSlice from "./slices/products-slice"

// // Persist configuration for cart
// const cartPersistConfig = {
//   key: 'cart',
//   storage,
//   // You can add whitelist/blacklist if needed
//   // whitelist: ['items', 'total'] // only persist these fields
// }

// // Combine reducers
// const rootReducer = combineReducers({
//   cart: persistReducer(cartPersistConfig, cartSlice),
//   products: productsSlice,
// })

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//       },
//     }),
// })

// export const persistor = persistStore(store)

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
"use client"
// store/index.ts - Alternative approach to suppress warning
import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import cartSlice from "./slices/cart-slice"
import productsSlice from "./slices/products-slice"

// Only import and configure persistence on client side
let persistedCartReducer = cartSlice

if (typeof window !== 'undefined') {
  const { persistReducer: persistReducerImport } = require('redux-persist')
  const storage = require('redux-persist/lib/storage').default
  
  const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['items', 'total'],
  }
  
  persistedCartReducer = persistReducerImport(cartPersistConfig, cartSlice)
}

const rootReducer = combineReducers({
  cart: persistedCartReducer,
  products: productsSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = typeof window !== 'undefined' ? persistStore(store) : null

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch