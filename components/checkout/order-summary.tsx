// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import Image from "next/image"
// import { ShoppingCart, Truck, Calculator, Banknote } from "lucide-react"

// interface OrderSummaryProps {
//   items: any[]
//   subtotal: number
//   shipping: number
//   tax: number
//   codFee: number
//   total: number
// }

// export function OrderSummary({ items, subtotal, shipping, tax, codFee, total }: OrderSummaryProps) {
//   return (
//     <Card className="shadow-lg">
//       <CardHeader className="pb-4">
//         <CardTitle className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-[#9A7B4F] text-white flex items-center justify-center">
//             <ShoppingCart className="h-4 w-4" />
//           </div>
//           Order Summary
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {/* Order Items */}
//         <div className="space-y-3">
//           {items.map((item) => (
//             <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//               <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-lg overflow-hidden flex-shrink-0">
//                 <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h4 className="font-medium text-sm sm:text-base line-clamp-2">{item.name}</h4>
//                 <div className="flex items-center justify-between mt-1">
//                   <Badge variant="outline" className="text-xs">
//                     Qty: {item.quantity}
//                   </Badge>
//                   <p className="font-semibold text-sm sm:text-base">Rs{(item.price * item.quantity).toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <Separator />

//         {/* Cost Breakdown */}
//         <div className="space-y-3">
//           <div className="flex justify-between text-sm">
//             <span className="flex items-center gap-2">
//               <Calculator className="h-4 w-4 text-gray-500" />
//               Subtotal ({items.length} items)
//             </span>
//             <span className="font-medium">Rs{subtotal.toFixed(2)}</span>
//           </div>

//           <div className="flex justify-between text-sm">
//             <span className="flex items-center gap-2">
//               <Truck className="h-4 w-4 text-gray-500" />
//               Shipping
//             </span>
//             <span className={`font-medium Rs{shipping === 0 ? "text-green-600" : ""}`}>
//               {shipping === 0 ? "Free" : `Rs${shipping.toFixed(2)}`}
//             </span>
//           </div>

//           {/* <div className="flex justify-between text-sm">
//             <span>Tax (8%)</span>
//             <span className="font-medium">${tax.toFixed(2)}</span>
//           </div> */}

//           {codFee > 0 && (
//             <div className="flex justify-between text-sm">
//               <span className="flex items-center gap-2">
//                 <Banknote className="h-4 w-4 text-amber-600" />
//                 COD Fee
//               </span>
//               <span className="font-medium text-amber-600">Rs{codFee.toFixed(2)}</span>
//             </div>
//           )}

//           {/* {subtotal >= 100 && (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//               <p className="text-sm text-green-800 font-medium">🎉 Free shipping on orders over Rs100!</p>
//             </div>
//           )} */}
//         </div>

//         <Separator />

//         {/* Total */}
//         <div className="bg-[#4A3F35] text-white rounded-lg p-4">
//           <div className="flex justify-between items-center">
//             <span className="text-lg font-semibold">Total (COD)</span>
//             <span className="text-2xl font-bold">Rs{total.toFixed(2)}</span>
//           </div>
//           <p className="text-sm opacity-90 mt-1">Pay Rs{total.toFixed(2)} in cash upon delivery</p>
//         </div>

//         {/* Security Notice */}
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//           <p className="text-xs text-blue-800">
//             🔒 Your order is secure. We'll send you tracking information via email once shipped.
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }


"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ShoppingCart, Truck, Calculator } from "lucide-react"

interface OrderSummaryProps {
  items: any[]
  subtotal: number
  shipping: number
  tax: number
  codFee: number
  total: number
}

export function OrderSummary({ items, subtotal, shipping, total }: OrderSummaryProps) {
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
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm sm:text-base line-clamp-2">{item.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <Badge variant="outline" className="text-xs">
                    Qty: {item.quantity}
                  </Badge>
                  <p className="font-semibold text-sm sm:text-base">Rs{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

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
            <span className="text-2xl font-bold">Rs{total.toFixed(2)}</span>
          </div>
          <p className="text-sm opacity-90 mt-1">Pay Rs{total.toFixed(2)} in cash upon delivery</p>
        </div>

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
