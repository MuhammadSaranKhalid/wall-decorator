// "use client"

// import { useSelector } from "react-redux"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import type { RootState } from "@/store/store"
// import Link from "next/link"
// import { BadgeCheckIcon as CheckBadge } from "lucide-react"

// export function CartSummary() {
//   const { items, total } = useSelector((state: RootState) => state.cart)

//   const subtotal = total
//   // const shipping = subtotal > 100 ? 0 : 15
//   const shipping = 250
//   // const tax = subtotal * 0.08
//   // const finalTotal = subtotal + shipping + tax
//   const finalTotal = subtotal + shipping

//   return (
//     <div className="sticky top-4">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold text-[#2E2C2A]">Order Summary</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Subtotal ({items.length} items)</span>
//             <span className="font-medium">Rs{subtotal.toFixed(2)}</span>
//           </div>

//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Shipping</span>
//             <span className="font-medium">{`Rs${shipping.toFixed(2)}`}</span>
//           </div>

//           {/* <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Tax</span>
//             <span className="font-medium">${tax.toFixed(2)}</span>
//           </div> */}

//           <div className="border-t pt-4">
//             <div className="flex justify-between font-semibold text-md">
//               <span>Total</span>
//               <span>Rs{finalTotal.toFixed(2)}</span>
//             </div>
//           </div>

//           {subtotal < 100 && (
//             <p className="text-xs text-green-600">
//               You are Rs{(100 - subtotal).toFixed(2)} away from <span className="font-semibold">FREE Shipping!</span>
//             </p>
//           )}

//           <Button asChild className="w-full bg-[#4A3F35] hover:bg-[#4A3F35]/90" size="lg">
//             <Link href="/checkout">
//               Proceed to Checkout <CheckBadge className="ml-2 h-4 w-4" />
//             </Link>
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Truck, Calculator } from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/store/store"

export function CartSummary() {
  const { items, total } = useSelector((state: RootState) => state.cart)

  const subtotal = total
  const shipping = 250
  const finalTotal = subtotal + shipping

  if (items.length === 0) {
    return null
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#9A7B4F] text-white flex items-center justify-center">
            <ShoppingCart className="h-4 w-4" />
          </div>
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cost Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-gray-500" />
              Subtotal ({items.length} items)
            </span>
            <span className="font-medium">Rs{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-gray-500" />
              Shipping
            </span>
            <span className="font-medium">Rs{shipping.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="bg-[#4A3F35] text-white rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total (COD)</span>
            <span className="text-2xl font-bold">Rs{finalTotal.toFixed(2)}</span>
          </div>
          <p className="text-sm opacity-90 mt-1">Pay Rs{finalTotal.toFixed(2)} in cash upon delivery</p>
        </div>

        {/* Checkout Button */}
        <Link href="/checkout" className="block">
          <Button className="w-full bg-[#9A7B4F] hover:bg-[#8A6B3F] text-white py-3">Proceed to Checkout</Button>
        </Link>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            🔒 Your order is secure. We'll send you tracking information via email once shipped.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
