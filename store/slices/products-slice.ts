import { collection, getDocs, query, where, orderBy } from "firebase/firestore"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { Product } from "@/types/product"
import { db } from "@/lib/firebase"


interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    let products: Product[] = []

    try {
      const productsRef = collection(db, "products")
      // Only fetch active and public products for the frontend
      const q = query(
        productsRef,
        where("status", "==", "active"),
        where("visibility", "==", "public"),
        where("isDeleted", "!=", true),
        orderBy("isDeleted", "asc"),
        orderBy("featured", "desc"),
        orderBy("createdAt", "desc"),
      )

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        console.log("Fetched Product Data : ", data)
        products.push({
          id: doc.id,
          ...data,
          // Convert Firestore timestamps to Date objects if needed
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        } as Product)
      })

      console.log("Product : ", products)

      console.log("Fetched from Firestore:", products.length, "products")
    } catch (firebaseError) {
      console.log("Firestore fetch failed, using localStorage:", firebaseError)
    }

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch products"
      })
  },
})

export default productsSlice.reducer
