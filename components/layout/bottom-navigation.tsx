"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { Home, Package, ShoppingCart, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartSheet } from "@/components/cart/cart-sheet"
import { cn } from "@/lib/utils"
import type { RootState } from "@/store/store"

export function BottomNavigation() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      name: "Products",
      href: "/products",
      icon: Package,
      isActive: pathname.startsWith("/products"),
    },
    {
      name: "Cart",
      href: "#",
      icon: ShoppingCart,
      isActive: false,
      onClick: () => setIsCartOpen(true),
      badge: cartTotal > 0 ? cartTotal : undefined,
    },
    {
      name: "Customize",
      href: "/customize",
      icon: Palette,
      isActive: pathname === "/customize",
    },
  ]

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon

            if (item.onClick) {
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={cn(
                    "flex flex-col items-center justify-center h-full space-y-1 rounded-none relative",
                    "hover:bg-gray-50 active:bg-gray-100 transition-colors",
                    item.isActive && "text-[#9A7B4F] bg-[#9A7B4F]/5",
                  )}
                  onClick={item.onClick}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {item.badge && (
                      <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-[#9A7B4F] hover:bg-[#9A7B4F]">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-medium">{item.name}</span>
                </Button>
              )
            }

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex flex-col items-center justify-center h-full w-full space-y-1 rounded-none",
                    "hover:bg-gray-50 active:bg-gray-100 transition-colors",
                    item.isActive && "text-[#9A7B4F] bg-[#9A7B4F]/5",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Cart Sheet */}
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Bottom padding for content to avoid overlap */}
      <div className="h-16 md:hidden" />
    </>
  )
}
