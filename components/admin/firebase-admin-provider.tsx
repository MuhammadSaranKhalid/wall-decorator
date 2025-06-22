"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useFirebaseAuth } from "@/hooks/use-firebase-auth"
import { productService, orderService, analyticsService } from "@/lib/firebase-service"
import type { Product } from "@/types/product"
import type { OrderData } from "@/components/checkout/checkout-flow"

interface AdminContextType {
  // Auth
  user: any
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getAuthToken: () => Promise<string | null>

  // Products
  products: Product[]
  loadProducts: () => Promise<void>
  createProduct: (product: Omit<Product, "id">) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>

  // Orders
  orders: OrderData[]
  loadOrders: () => Promise<void>
  updateOrderStatus: (id: string, status: OrderData["status"]) => Promise<void>

  // Analytics
  dashboardStats: any
  loadDashboardStats: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | null>(null)

export function FirebaseAdminProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<OrderData[]>([])
  const [dashboardStats, setDashboardStats] = useState<any>({})
  const [dataLoading, setDataLoading] = useState(false)

  // Load initial data when user is authenticated
  useEffect(() => {
    if (auth.user && !auth.loading) {
      loadInitialData()
    }
  }, [auth.user, auth.loading])

  const loadInitialData = async () => {
    setDataLoading(true)
    try {
      await Promise.all([loadProducts(), loadOrders(), loadDashboardStats()])
    } catch (error) {
      console.error("Error loading initial data:", error)
    } finally {
      setDataLoading(false)
    }
  }

  const loadProducts = async () => {
    try {
      const fetchedProducts = await productService.getAllProducts()
      setProducts(fetchedProducts)
    } catch (error) {
      console.error("Error loading products:", error)
    }
  }

  const createProduct = async (productData: Omit<Product, "id">) => {
    try {
      const token = await auth.getAuthToken()
      if (!token) throw new Error("No auth token")

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error("Failed to create product")
      }

      await loadProducts() // Refresh products list
    } catch (error) {
      console.error("Error creating product:", error)
      throw error
    }
  }

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const token = await auth.getAuthToken()
      if (!token) throw new Error("No auth token")

      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error("Failed to update product")
      }

      await loadProducts() // Refresh products list
    } catch (error) {
      console.error("Error updating product:", error)
      throw error
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const token = await auth.getAuthToken()
      if (!token) throw new Error("No auth token")

      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

      await loadProducts() // Refresh products list
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    }
  }

  const loadOrders = async () => {
    try {
      const fetchedOrders = await orderService.getAllOrders()
      setOrders(fetchedOrders)
    } catch (error) {
      console.error("Error loading orders:", error)
    }
  }

  const updateOrderStatus = async (id: string, status: OrderData["status"]) => {
    try {
      const token = await auth.getAuthToken()
      if (!token) throw new Error("No auth token")

      const response = await fetch(`/api/admin/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      await loadOrders() // Refresh orders list
    } catch (error) {
      console.error("Error updating order status:", error)
      throw error
    }
  }

  const loadDashboardStats = async () => {
    try {
      const stats = await analyticsService.getDashboardStats()
      setDashboardStats(stats)
    } catch (error) {
      console.error("Error loading dashboard stats:", error)
    }
  }

  const contextValue: AdminContextType = {
    // Auth
    user: auth.user,
    loading: auth.loading || dataLoading,
    error: auth.error,
    signIn: auth.signIn,
    signOut: auth.signOut,
    getAuthToken: auth.getAuthToken,

    // Products
    products,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,

    // Orders
    orders,
    loadOrders,
    updateOrderStatus,

    // Analytics
    dashboardStats,
    loadDashboardStats,
  }

  return <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within FirebaseAdminProvider")
  }
  return context
}
