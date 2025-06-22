"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Banknote, Truck } from "lucide-react"
import type { PaymentInfo, ShippingAddress } from "./checkout-flow"

interface PaymentMethodFormProps {
  onComplete: (data: PaymentInfo) => void
  onBack: () => void
  shippingAddress: ShippingAddress
  initialData?: PaymentInfo | null
}

export function PaymentMethodForm({ onComplete, onBack, shippingAddress, initialData }: PaymentMethodFormProps) {
  const [formData, setFormData] = useState<PaymentInfo>({
    method: initialData?.method || "cod",
    sameAsShipping: initialData?.sameAsShipping ?? true,
    billingAddress: initialData?.billingAddress || null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const paymentData: PaymentInfo = {
      ...formData,
      billingAddress: formData.sameAsShipping ? shippingAddress : formData.billingAddress,
    }
    onComplete(paymentData)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <RadioGroup
              value={formData.method}
              onValueChange={(value: "cod" | "card") => setFormData((prev) => ({ ...prev, method: value }))}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Banknote className="h-6 w-6 text-[#9A7B4F]" />
                    <div>
                      <p className="font-medium">Cash on Delivery (COD)</p>
                      <p className="text-sm text-gray-600">Pay when your order is delivered to your doorstep</p>
                    </div>
                  </div>
                </Label>
              </div>

              {/* Commented out card payment option for COD implementation */}
              {/* 
              <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                <RadioGroupItem value="card" id="card" disabled />
                <Label htmlFor="card" className="flex-1 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-400">Credit/Debit Card</p>
                      <p className="text-sm text-gray-400">Coming soon - Pay securely with your card</p>
                    </div>
                  </div>
                </Label>
              </div>
              */}
            </RadioGroup>

            {formData.method === "cod" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="text-sm">
                    <h4 className="font-medium text-amber-800 mb-1">Cash on Delivery Information</h4>
                    <ul className="text-amber-700 space-y-1">
                      <li>• Pay in cash when your order is delivered</li>
                      <li>• Please keep the exact amount ready</li>
                      <li>• Our delivery partner will collect the payment</li>
                      <li>• COD charges may apply for orders under $100</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAsShipping"
                checked={formData.sameAsShipping}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, sameAsShipping: checked as boolean }))}
              />
              <Label htmlFor="sameAsShipping">Billing address same as shipping</Label>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                Back to Shipping
              </Button>
              <Button type="submit" className="flex-1 bg-[#4A3F35] hover:bg-[#4A3F35]/90">
                Review Order
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="font-medium">
              {shippingAddress.firstName} {shippingAddress.lastName}
            </p>
            <p>{shippingAddress.address}</p>
            {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
            <p>
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
            </p>
            <p>{shippingAddress.country}</p>
            <Separator className="my-3" />
            <p>
              <strong>Email:</strong> {shippingAddress.email}
            </p>
            <p>
              <strong>Phone:</strong> {shippingAddress.phone}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
