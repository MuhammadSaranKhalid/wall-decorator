"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Calendar, Banknote } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { OrderData } from "@/components/checkout/checkout-flow"

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get orders from localStorage (in a real app, this would be an API call)
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    // Convert date strings back to Date objects and sort by newest first
    const ordersWithDates = storedOrders
      .map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
      }))
      .sort((a: OrderData, b: OrderData) => b.createdAt.getTime() - a.createdAt.getTime())

    setOrders(ordersWithDates)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A3F35] mx-auto mb-4"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <h1 className="text-2xl font-bold text-[#2E2C2A] mb-4">No Orders Yet</h1>
        <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping to see your orders here!</p>
        <Button asChild className="bg-[#4A3F35] hover:bg-[#4A3F35]/90">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2E2C2A] mb-2">Your Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const codCharges = order.subtotal < 100 ? 5 : 0
          const finalTotal = order.total + codCharges

          return (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {order.createdAt.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {order.items.length} items
                      </div>
                      <div className="flex items-center gap-1">
                        <Banknote className="h-4 w-4" />${finalTotal.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-600">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/order-confirmed/${order.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {order.items.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      +{order.items.length - 4} more items
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
