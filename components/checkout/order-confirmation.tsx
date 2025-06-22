"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CheckCircle } from "lucide-react"
import type { OrderData } from "./checkout-flow"

interface OrderConfirmationProps {
  order: OrderData
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the dedicated order confirmation page
    const timer = setTimeout(() => {
      router.push(`/order-confirmed/${order.id}`)
    }, 2000)

    return () => clearTimeout(timer)
  }, [order.id, router])

  return (
    <div className="max-w-md mx-auto text-center py-16">
      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4 animate-pulse" />
      <h1 className="text-2xl font-bold text-[#2E2C2A] mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 mb-4">Redirecting to order details...</p>
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#4A3F35] mx-auto"></div>
    </div>
  )
}
