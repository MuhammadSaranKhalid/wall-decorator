"use client";

import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItems } from "@/components/cart/cart-items";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { RootState } from "@/store/store";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = total;
  const shipping = 250;
  const finalTotal = subtotal + shipping;

  const formatPrice = (price: number) => {
    return `Rs${price.toFixed(2)}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            {itemCount > 0 && (
              <span className="text-sm text-muted-foreground">
                ({itemCount} items)
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            {itemCount === 0
              ? "Your cart is empty. Add some items to get started!"
              : "Review your items and proceed to checkout when ready."}
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-4" />

        {itemCount === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Your cart is empty</h3>
              <p className="text-sm text-gray-500">
                Discover our amazing products and add them to your cart.
              </p>
            </div>
            <Button asChild className="bg-[#2E2C2A] hover:bg-[#3E3C3A]">
              <Link href="/products" onClick={() => onOpenChange(false)}>
                Browse Products
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <CartItems />
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />

              {/* Cart Summary */}
              {/* <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg">{formatPrice(total)}</span>
                </div>
              </div> */}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rs{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Rs{shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Rs{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full bg-[#9A7B4F] hover:bg-[#8A6B3F] text-white"
                >
                  <Link href="/checkout" onClick={() => onOpenChange(false)}>
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Link href="/cart" onClick={() => onOpenChange(false)}>
                    View Full Cart
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
