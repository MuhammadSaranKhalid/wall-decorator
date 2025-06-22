"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "@/store/store"
import { clearCart } from "@/store/slices/cart-slice"
import { CheckoutStepper } from "./checkout-stepper"
import { ShippingForm } from "./shipping-form"
import { PaymentMethodForm } from "./payment-method-form"
import { OrderReview } from "./order-review"
import { OrderConfirmation } from "./order-confirmation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export type CheckoutStep = "shipping" | "payment" | "review" | "confirmation"

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
  // Card payment fields (commented out for COD implementation)
  // cardNumber?: string
  // expiryDate?: string
  // cvv?: string
  // cardholderName?: string
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

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && currentStep !== "confirmation") {
      router.push("/cart")
    }
  }, [items.length, router, currentStep])

  const subtotal = total
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.08
  const finalTotal = subtotal + shipping + tax

  const handleStepComplete = (step: CheckoutStep, data?: any) => {
    switch (step) {
      case "shipping":
        setShippingAddress(data)
        setCurrentStep("payment")
        break
      case "payment":
        setPaymentInfo(data)
        setCurrentStep("review")
        break
      case "review":
        processOrder()
        break
    }
  }

  const processOrder = async () => {
    if (!shippingAddress || !paymentInfo) return

    setIsProcessing(true)

    try {
      // For COD, we don't need payment processing
      // Just simulate order confirmation
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const order: OrderData = {
        id: `ORD-${Date.now()}`,
        items: items,
        shippingAddress: shippingAddress,
        paymentInfo: paymentInfo,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: finalTotal,
        createdAt: new Date(),
        status: "confirmed",
      }

      setOrderData(order)
      setCurrentStep("confirmation")
      dispatch(clearCart())

      // Store order in localStorage for demo
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      existingOrders.push(order)
      localStorage.setItem("orders", JSON.stringify(existingOrders))
    } catch (error) {
      console.error("Order processing failed:", error)
      // Handle error state
    } finally {
      setIsProcessing(false)
    }
  }

  const goToPreviousStep = () => {
    switch (currentStep) {
      case "payment":
        setCurrentStep("shipping")
        break
      case "review":
        setCurrentStep("payment")
        break
    }
  }

  if (items.length === 0 && currentStep !== "confirmation") {
    return null // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {currentStep !== "confirmation" && (
        <>
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-[#2E2C2A]">Checkout</h1>
          </div>

          <CheckoutStepper currentStep={currentStep} />
        </>
      )}

      <div className="mt-8">
        {currentStep === "shipping" && (
          <ShippingForm onComplete={(data) => handleStepComplete("shipping", data)} initialData={shippingAddress} />
        )}

        {currentStep === "payment" && (
          <PaymentMethodForm
            onComplete={(data) => handleStepComplete("payment", data)}
            onBack={goToPreviousStep}
            shippingAddress={shippingAddress!}
            initialData={paymentInfo}
          />
        )}

        {currentStep === "review" && (
          <OrderReview
            shippingAddress={shippingAddress!}
            paymentInfo={paymentInfo!}
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={finalTotal}
            onConfirm={() => handleStepComplete("review")}
            onBack={goToPreviousStep}
            isProcessing={isProcessing}
          />
        )}

        {currentStep === "confirmation" && orderData && <OrderConfirmation order={orderData} />}
      </div>
    </div>
  )
}
