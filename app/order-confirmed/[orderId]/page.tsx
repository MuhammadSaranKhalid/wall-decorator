"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { OrderConfirmationPage } from "@/components/order/order-confirmation-page"
import type { OrderData } from "@/components/checkout/checkout-flow"
import { Loader2 } from "lucide-react"

export default function OrderConfirmedPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = params.orderId as string

        // Fetch order from Firebase via API
        const response = await fetch(`/api/orders/${orderId}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError("Order not found")
          } else {
            setError("Failed to load order details")
          }
          return
        }

        const data = await response.json()
        const foundOrder = data.order

        // Convert date string back to Date object if needed
        if (foundOrder.createdAt && typeof foundOrder.createdAt === 'string') {
          foundOrder.createdAt = new Date(foundOrder.createdAt)
        } else if (foundOrder.createdAt?.seconds) {
          // Handle Firestore timestamp format
          foundOrder.createdAt = new Date(foundOrder.createdAt.seconds * 1000)
        }

        setOrder(foundOrder)
      } catch (err) {
        setError("Failed to load order details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [params.orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2E2C2A] mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The order you're looking for doesn't exist."}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#4A3F35] text-white px-6 py-2 rounded-lg hover:bg-[#4A3F35]/90"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  return <OrderConfirmationPage order={order} />
}
