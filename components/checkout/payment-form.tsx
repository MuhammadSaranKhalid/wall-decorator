"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock } from "lucide-react"
import type { PaymentInfo, ShippingAddress } from "./checkout-flow"

interface PaymentFormProps {
  onComplete: (data: PaymentInfo) => void
  onBack: () => void
  shippingAddress: ShippingAddress
  initialData?: PaymentInfo | null
}

export function PaymentForm({ onComplete, onBack, shippingAddress, initialData }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentInfo>({
    cardNumber: initialData?.cardNumber || "",
    expiryDate: initialData?.expiryDate || "",
    cvv: initialData?.cvv || "",
    cardholderName: initialData?.cardholderName || "",
    sameAsShipping: initialData?.sameAsShipping ?? true,
    billingAddress: initialData?.billingAddress || null,
  })

  const [errors, setErrors] = useState<Partial<PaymentInfo>>({})

  const handleInputChange = (field: keyof PaymentInfo, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\D/g, "")

    // Add slash after 2 digits
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4)
    }
    return v
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentInfo> = {}

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 13) {
      newErrors.cardNumber = "Valid card number is required"
    }
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Valid expiry date is required (MM/YY)"
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Valid CVV is required"
    }
    if (!formData.cardholderName) {
      newErrors.cardholderName = "Cardholder name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const paymentData: PaymentInfo = {
        ...formData,
        billingAddress: formData.sameAsShipping ? shippingAddress : formData.billingAddress,
      }
      onComplete(paymentData)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={errors.cardNumber ? "border-red-500" : ""}
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={errors.expiryDate ? "border-red-500" : ""}
                />
                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                  placeholder="123"
                  maxLength={4}
                  className={errors.cvv ? "border-red-500" : ""}
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="cardholderName">Cardholder Name *</Label>
              <Input
                id="cardholderName"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                placeholder="John Doe"
                className={errors.cardholderName ? "border-red-500" : ""}
              />
              {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAsShipping"
                checked={formData.sameAsShipping}
                onCheckedChange={(checked) => handleInputChange("sameAsShipping", checked as boolean)}
              />
              <Label htmlFor="sameAsShipping">Billing address same as shipping</Label>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
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
