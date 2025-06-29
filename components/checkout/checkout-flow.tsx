"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "@/store/store"
import { clearCart } from "@/store/slices/cart-slice"
import { ShippingForm } from "./shipping-form"
import { OrderSummary } from "./order-summary"
import { OrderConfirmation } from "./order-confirmation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ShoppingBag, Truck, CreditCard, CheckCircle } from "lucide-react"

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface PaymentInfo {
  method: "cod" | "card"
  billingAddress: ShippingAddress | null
  sameAsShipping: boolean
}

export interface OrderData {
  id: string
  items: any[]
  shippingAddress: ShippingAddress
  paymentInfo: PaymentInfo
  subtotal: number
  shipping: number
  tax: number
  total: number
  createdAt: Date
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered"
}

export function CheckoutFlow() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { items, total } = useSelector((state: RootState) => state.cart)

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Redirect if cart is empty
  // useEffect(() => {
  //   if (items.length === 0 && !showConfirmation) {
  //     router.push("/cart")
  //   }
  // }, [items.length, router, showConfirmation])

  const subtotal = total
  const shipping = 250
  const tax = subtotal * 0.08
  const codFee = subtotal < 100 ? 5 : 0
  const finalTotal = subtotal + shipping

  const processOrder = async (shippingData: ShippingAddress) => {
    setIsProcessing(true)
    setShippingAddress(shippingData)

    try {
      const paymentInfo: PaymentInfo = {
        method: "cod",
        sameAsShipping: true,
        billingAddress: shippingData,
      }

      // Create order data
      const orderData = {
        items: items,
        shippingAddress: shippingData,
        paymentInfo: paymentInfo,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: finalTotal,
      }

      // Save order to Firebase
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const result = await response.json()

      const order: OrderData = {
        id: result.orderId,
        items: items,
        shippingAddress: shippingData,
        paymentInfo: paymentInfo,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: finalTotal,
        createdAt: new Date(),
        status: "confirmed",
      }

      setOrderData(order)
      dispatch(clearCart())

      // Also store in localStorage as backup
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      existingOrders.push(order)
      localStorage.setItem("orders", JSON.stringify(existingOrders))

      // Redirect to order confirmation page and replace history to prevent going back to checkout
      router.replace(`/order-confirmed/${result.orderId}`)
    } catch (error) {
      console.error("Order processing failed:", error)
      // You might want to show an error message to the user here
      alert("Failed to process order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0 && !showConfirmation) {
    return null // Will redirect via useEffect
  }

  if (showConfirmation && orderData) {
    return <OrderConfirmation order={orderData} />
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
<Button variant="ghost" onClick={() => router.back()} className="mb-4 p-2 sm:p-3">
  <ArrowLeft className="h-4 w-4 mr-2" />
  <span className="hidden sm:inline">Back to Cart</span>
  <span className="sm:hidden">Back</span>
</Button>
<div className="flex items-center gap-3 mb-4">
  <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-[#9A7B4F]" />
  <h1 className="text-2xl sm:text-3xl font-bold text-[#2E2C2A]">Checkout</h1>
</div>

        {/* Progress Indicators */}
        {/* <div className="flex items-center gap-2 sm:gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#4A3F35] text-white flex items-center justify-center text-xs">
              <Truck className="h-3 w-3" />
            </div>
            <span className="hidden sm:inline">Shipping Details</span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#9A7B4F] text-white flex items-center justify-center text-xs">
              <CreditCard className="h-3 w-3" />
            </div>
            <span className="hidden sm:inline">Cash on Delivery</span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-xs">
              <CheckCircle className="h-3 w-3" />
            </div>
            <span className="hidden sm:inline">Complete</span>
          </div>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Info */}
          {/* <Card className="border-l-4 border-l-[#9A7B4F]">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#9A7B4F]/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-[#9A7B4F]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#2E2C2A] mb-2">Payment Method: Cash on Delivery</h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
                    <div className="text-sm text-amber-800 space-y-1">
                      <p className="font-medium">✓ Pay when your order arrives</p>
                      <p>• Please keep exact change ready</p>
                      <p>• Our delivery partner will collect payment</p>
                      <p>• COD fee: {codFee > 0 ? `$${codFee}` : "Free"} (orders under $100)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Shipping Form */}
          <ShippingForm onComplete={processOrder} initialData={shippingAddress} isProcessing={isProcessing} />
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              codFee={codFee}
              total={finalTotal}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// "use client";

// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import type { RootState } from "@/store/store";
// import { clearCart } from "@/store/slices/cart-slice";
// import { ShippingForm } from "./shipping-form";
// import { OrderSummary } from "./order-summary";
// import { OrderConfirmation } from "./order-confirmation";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, ShoppingBag } from "lucide-react";

// export interface ShippingAddress {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   apartment?: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
// }

// export interface PaymentInfo {
//   method: "cod" | "card";
//   billingAddress: ShippingAddress | null;
//   sameAsShipping: boolean;
// }

// export interface OrderData {
//   id: string;
//   items: any[];
//   shippingAddress: ShippingAddress;
//   paymentInfo: PaymentInfo;
//   subtotal: number;
//   shipping: number;
//   tax: number;
//   total: number;
//   createdAt: Date;
//   status: "pending" | "confirmed" | "processing" | "shipped" | "delivered";
// }

// export function CheckoutFlow() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { items, total } = useSelector((state: RootState) => state.cart);

//   const [shippingAddress, setShippingAddress] =
//     useState<ShippingAddress | null>(null);
//   const [orderData, setOrderData] = useState<OrderData | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   // Redirect if cart is empty
//   useEffect(() => {
//     if (items.length === 0 && !showConfirmation) {
//       router.push("/cart");
//     }
//   }, [items.length, router, showConfirmation]);

//   const subtotal = total;
//   const shipping = 250;
//   const tax = 0;
//   const codFee = 0;
//   const finalTotal = subtotal + shipping;

//   const processOrder = async (shippingData: ShippingAddress) => {
//     setIsProcessing(true);
//     setShippingAddress(shippingData);

//     try {
//       const paymentInfo: PaymentInfo = {
//         method: "cod",
//         sameAsShipping: true,
//         billingAddress: shippingData,
//       };

//       // Create order data
//       const orderData = {
//         items: items,
//         shippingAddress: shippingData,
//         paymentInfo: paymentInfo,
//         subtotal: subtotal,
//         shipping: shipping,
//         tax: tax,
//         total: finalTotal,
//       };

//       // Save order to Firebase
//       const response = await fetch("/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create order");
//       }

//       const result = await response.json();

//       const order: OrderData = {
//         id: result.orderId,
//         items: items,
//         shippingAddress: shippingData,
//         paymentInfo: paymentInfo,
//         subtotal: subtotal,
//         shipping: shipping,
//         tax: tax,
//         total: finalTotal,
//         createdAt: new Date(),
//         status: "confirmed",
//       };

//       setOrderData(order);
//       dispatch(clearCart());

//       // Also store in localStorage as backup
//       const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
//       existingOrders.push(order);
//       localStorage.setItem("orders", JSON.stringify(existingOrders));

//       // Redirect to order confirmation page and replace history to prevent going back to checkout
//       router.replace(`/order-confirmed/${result.orderId}`);
//     } catch (error) {
//       console.error("Order processing failed:", error);
//       // You might want to show an error message to the user here
//       alert("Failed to process order. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (items.length === 0 && !showConfirmation) {
//     return null; // Will redirect via useEffect
//   }

//   if (showConfirmation && orderData) {
//     return <OrderConfirmation order={orderData} />;
//   }

//   return (
//     <div className="min-h-screen bg-[#F8F6F3]">
//       {/* Header */}
//       {/* <div className="bg-white border-b">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <Link href="/" className="flex items-center space-x-3">
//               <Image src="/wd-logo-new.png" alt="WallDecoratr Logo" width={40} height={32} className="w-10 h-8" />
//               <span className="text-xl font-bold font-serif text-[#4A3F35]">WallDecoratr</span>
//             </Link>
//             <Button variant="ghost" onClick={() => router.back()} className="flex items-center space-x-2">
//               <ArrowLeft className="h-4 w-4" />
//               <span>Back to Cart</span>
//             </Button>
//           </div>
//         </div>
//       </div> */}
//       <Button
//         variant="ghost"
//         onClick={() => router.back()}
//         className="mb-4 p-2 sm:p-3"
//       >
//         <ArrowLeft className="h-4 w-4 mr-2" />
//         <span className="hidden sm:inline">Back to Cart</span>
//         <span className="sm:hidden">Back</span>
//       </Button>
//       {/* <div className="flex items-center gap-3 mb-4">
//         <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-[#9A7B4F]" />
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2E2C2A]">
//           Checkout
//         </h1>
//       </div> */}

//       <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
//         {/* Page Title */}
//         <div className="mb-6 sm:mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-[#9A7B4F]" />
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#2E2C2A]">
//               Checkout
//             </h1>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//           {/* Left Column - Forms */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Shipping Form */}
//             <ShippingForm
//               onComplete={processOrder}
//               initialData={shippingAddress}
//               isProcessing={isProcessing}
//             />
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-4">
//               <OrderSummary
//                 items={items}
//                 subtotal={subtotal}
//                 shipping={shipping}
//                 tax={tax}
//                 codFee={codFee}
//                 total={finalTotal}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
