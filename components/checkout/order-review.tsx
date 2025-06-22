"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Loader2, Banknote } from "lucide-react"
import type { ShippingAddress, PaymentInfo } from "./checkout-flow"

interface OrderReviewProps {
  shippingAddress: ShippingAddress
  paymentInfo: PaymentInfo
  items: any[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  onConfirm: () => void
  onBack: () => void
  isProcessing: boolean
}

export function OrderReview({
  shippingAddress,
  paymentInfo,
  items,
  subtotal,
  shipping,
  tax,
  total,
  onConfirm,
  onBack,
  isProcessing,
}: OrderReviewProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p className="font-medium">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p>{shippingAddress.address}</p>
              {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
              <p>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              </p>
              <p>{shippingAddress.email}</p>
              <p>{shippingAddress.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Banknote className="h-6 w-6 text-[#9A7B4F]" />
              <div>
                <p className="font-medium">Cash on Delivery (COD)</p>
                <p className="text-sm text-gray-600">Pay when your order is delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            {subtotal < 100 && (
              <div className="flex justify-between text-sm text-amber-600">
                <span>COD Charges</span>
                <span>$5.00</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total (COD)</span>
              <span>${(total + (subtotal < 100 ? 5 : 0)).toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              <strong>COD Payment:</strong> Please keep ${(total + (subtotal < 100 ? 5 : 0)).toFixed(2)} ready in cash
              for the delivery person.
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={onConfirm} disabled={isProcessing} className="w-full bg-[#4A3F35] hover:bg-[#4A3F35]/90">
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Confirming Order...
                </>
              ) : (
                "Confirm Order"
              )}
            </Button>

            <Button variant="outline" onClick={onBack} disabled={isProcessing} className="w-full">
              Back to Payment
            </Button>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
            <p>You will pay in cash when the order is delivered.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
