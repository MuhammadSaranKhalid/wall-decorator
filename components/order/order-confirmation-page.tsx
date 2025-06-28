"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Banknote,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Download,
  Share2,
  Copy,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { OrderData } from "@/components/checkout/checkout-flow"

interface OrderConfirmationPageProps {
  order: OrderData
}

export function OrderConfirmationPage({ order }: OrderConfirmationPageProps) {
  const [copied, setCopied] = useState(false)

  const codCharges = order.subtotal < 100 ? 5 : 0
  const finalTotal = order.total + codCharges

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy order ID")
    }
  }

  const shareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Order ${order.id} Confirmed`,
          text: `My order for ${order.items.length} items has been confirmed!`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    }
  }

  const downloadOrderDetails = () => {
    const orderDetails = `
Order Confirmation - ArtisanWall
================================

Order ID: ${order.id}
Order Date: ${order.createdAt.toLocaleDateString()}
Status: ${order.status}

ITEMS ORDERED:
${order.items.map((item) => `- ${item.name} (Qty: ${item.quantity}) - Rs${(item.price * item.quantity).toFixed(2)}`).join("\n")}

DELIVERY ADDRESS:
${order.shippingAddress.firstName} ${order.shippingAddress.lastName}
${order.shippingAddress.address}
${order.shippingAddress.apartment ? order.shippingAddress.apartment + "\n" : ""}${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}

CONTACT:
Email: ${order.shippingAddress.email}
Phone: ${order.shippingAddress.phone}

PAYMENT:
Method: Cash on Delivery (COD)
Amount to Pay: $${finalTotal.toFixed(2)}

SUMMARY:
Subtotal: $${order.subtotal.toFixed(2)}
Shipping: ${order.shipping === 0 ? "Free" : "$" + order.shipping.toFixed(2)}
Tax: $${order.tax.toFixed(2)}
${codCharges > 0 ? `COD Charges: $${codCharges.toFixed(2)}\n` : ""}Total: $${finalTotal.toFixed(2)}

Thank you for shopping with ArtisanWall!
    `

    const blob = new Blob([orderDetails], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `order-${order.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-[#2E2C2A] mb-3">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your order. Your items will be delivered and payment will be collected on delivery.
          </p>

          {/* Order ID with copy functionality */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-sm text-gray-500">Order ID:</span>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">{order.id}</code>
            <Button variant="ghost" size="sm" onClick={copyOrderId} className="h-8 w-8 p-0">
              <Copy className="h-4 w-4" />
            </Button>
            {copied && <span className="text-green-600 text-sm">Copied!</span>}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={downloadOrderDetails} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Details
            </Button>
            <Button onClick={shareOrder} variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Order
            </Button>
          </div>
        </div>

        {/* Order Status Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Order Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-green-600">Confirmed</p>
                <p className="text-xs text-gray-500">{order.createdAt.toLocaleDateString()}</p>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-500">Processing</p>
                <p className="text-xs text-gray-500">1-2 days</p>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <Truck className="h-6 w-6 text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-500">Shipped</p>
                <p className="text-xs text-gray-500">2-3 days</p>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <Banknote className="h-6 w-6 text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                <p className="text-xs text-gray-500">3-5 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Order Date:</span>
                  <span>{order.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Order Time:</span>
                  <span>{order.createdAt.toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Items:</span>
                  <span>{order.items.length} items</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Payment Method:</span>
                  <Badge variant="outline" className="text-amber-600 border-amber-600">
                    <Banknote className="h-3 w-3 mr-1" />
                    Cash on Delivery
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Status:</span>
                  <Badge className="bg-green-600">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-[#2E2C2A]">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
                {order.shippingAddress.apartment && (
                  <p className="text-sm text-gray-600">{order.shippingAddress.apartment}</p>
                )}
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{order.shippingAddress.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{order.shippingAddress.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Expected: 3-5 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Items */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Items ({order.items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[#2E2C2A]">{item.name}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Rs{item.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rs{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>{order.shipping === 0 ? "Free" : `Rs${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>Rs{order.tax.toFixed(2)}</span>
                </div>
                {codCharges > 0 && (
                  <div className="flex justify-between text-sm text-amber-600">
                    <span>COD Charges:</span>
                    <span>Rs{codCharges.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total (Cash on Delivery):</span>
                  <span>Rs{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* COD Instructions */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Banknote className="h-5 w-5" />
              Cash on Delivery Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-amber-800">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Keep Cash Ready</p>
                  <p className="text-sm">
                    Please keep exactly <strong>Rs{finalTotal.toFixed(2)}</strong> in cash ready for the delivery person.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">Inspect Before Payment</p>
                  <p className="text-sm">
                    You can inspect the items and verify they match your order before making payment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">Payment Collection</p>
                  <p className="text-sm">
                    Our delivery partner will collect the payment and provide you with a receipt.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Mail className="h-5 w-5" />
              What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                You'll receive an email confirmation within 5 minutes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Our team will call you within 24 hours to confirm order details
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                You'll receive tracking information once your order ships
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Our delivery partner will contact you before delivery
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Expected delivery: 3-5 business days
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#4A3F35] hover:bg-[#4A3F35]/90">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/orders">View All Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
