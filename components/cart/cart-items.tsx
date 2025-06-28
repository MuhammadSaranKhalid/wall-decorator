"use client"

import { useSelector, useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Trash } from "lucide-react"
import { updateQuantity, removeFromCart } from "@/store/slices/cart-slice"
import type { RootState } from "@/store/store"

export function CartItems() {
  const { items } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === "USD" ? "$" : currency === "PKR" ? "₨" : "";
    return `${symbol}${price.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* Image */}
              <div className="md:col-span-1 relative h-32 w-full md:w-32">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, 150px"
                />
              </div>

              {/* Details */}
              <div className="md:col-span-3">
                <h3 className="font-semibold text-lg text-[#2E2C2A]">{item.name}</h3>
                <p className="text-[#777]">Rs{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="md:col-span-1 flex items-center justify-end gap-2">
                <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="h-7 w-7 p-0"
                    disabled={item.quantity <= 1}
                  >
                    <span className="sr-only">Reduce quantity</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-minus"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </Button>

                  <span className="w-6 text-center">{item.quantity}</span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="h-7 w-7 p-0"
                  >
                    <span className="sr-only">Increase quantity</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </Button>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash className="h-5 w-5" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
