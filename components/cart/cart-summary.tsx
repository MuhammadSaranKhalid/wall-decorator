"use client"

import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RootState } from "@/store/store"
import Link from "next/link"
import { BadgeCheckIcon as CheckBadge } from "lucide-react"

export function CartSummary() {
  const { items, total } = useSelector((state: RootState) => state.cart)

  const subtotal = total
  // const shipping = subtotal > 100 ? 0 : 15
  const shipping = 250
  // const tax = subtotal * 0.08
  // const finalTotal = subtotal + shipping + tax
  const finalTotal = subtotal + shipping

  return (
    <div className="sticky top-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#2E2C2A]">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({items.length} items)</span>
            <span className="font-medium">Rs{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">{shipping === 0 ? "Free" : `Rs${shipping.toFixed(2)}`}</span>
          </div>

          {/* <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div> */}

          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold text-md">
              <span>Total</span>
              <span>Rs{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {subtotal < 100 && (
            <p className="text-xs text-green-600">
              You are Rs{(100 - subtotal).toFixed(2)} away from <span className="font-semibold">FREE Shipping!</span>
            </p>
          )}

          <Button asChild className="w-full bg-[#4A3F35] hover:bg-[#4A3F35]/90" size="lg">
            <Link href="/checkout">
              Proceed to Checkout <CheckBadge className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
