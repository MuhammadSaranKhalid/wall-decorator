// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import type { ShippingAddress } from "./checkout-flow"

// interface ShippingFormProps {
//   onComplete: (data: ShippingAddress) => void
//   initialData?: ShippingAddress | null
//   isProcessing?: boolean
// }

// export function ShippingForm({ onComplete, initialData, isProcessing = false }: ShippingFormProps) {
//   const [formData, setFormData] = useState<ShippingAddress>({
//     firstName: initialData?.firstName || "",
//     lastName: initialData?.lastName || "",
//     email: initialData?.email || "",
//     phone: initialData?.phone || "",
//     address: initialData?.address || "",
//     apartment: initialData?.apartment || "",
//     city: initialData?.city || "",
//     state: initialData?.state || "",
//     zipCode: initialData?.zipCode || "",
//     country: initialData?.country || "US",
//   })

//   const [errors, setErrors] = useState<Partial<ShippingAddress>>({})

//   const handleInputChange = (field: keyof ShippingAddress, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }))
//     }
//   }

//   const validateForm = (): boolean => {
//     const newErrors: Partial<ShippingAddress> = {}

//     if (!formData.firstName) newErrors.firstName = "First name is required"
//     if (!formData.lastName) newErrors.lastName = "Last name is required"
//     if (!formData.email) newErrors.email = "Email is required"
//     if (!formData.phone) newErrors.phone = "Phone number is required"
//     if (!formData.address) newErrors.address = "Address is required"
//     if (!formData.city) newErrors.city = "City is required"
//     if (!formData.state) newErrors.state = "State is required"
//     if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (validateForm()) {
//       onComplete(formData)
//     }
//   }

//   const states = [
//     "AL",
//     "AK",
//     "AZ",
//     "AR",
//     "CA",
//     "CO",
//     "CT",
//     "DE",
//     "FL",
//     "GA",
//     "HI",
//     "ID",
//     "IL",
//     "IN",
//     "IA",
//     "KS",
//     "KY",
//     "LA",
//     "ME",
//     "MD",
//     "MA",
//     "MI",
//     "MN",
//     "MS",
//     "MO",
//     "MT",
//     "NE",
//     "NV",
//     "NH",
//     "NJ",
//     "NM",
//     "NY",
//     "NC",
//     "ND",
//     "OH",
//     "OK",
//     "OR",
//     "PA",
//     "RI",
//     "SC",
//     "SD",
//     "TN",
//     "TX",
//     "UT",
//     "VT",
//     "VA",
//     "WA",
//     "WV",
//     "WI",
//     "WY",
//   ]

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Shipping Information</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="firstName">First Name *</Label>
//               <Input
//                 id="firstName"
//                 value={formData.firstName}
//                 onChange={(e) => handleInputChange("firstName", e.target.value)}
//                 className={errors.firstName ? "border-red-500" : ""}
//               />
//               {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
//             </div>
//             <div>
//               <Label htmlFor="lastName">Last Name *</Label>
//               <Input
//                 id="lastName"
//                 value={formData.lastName}
//                 onChange={(e) => handleInputChange("lastName", e.target.value)}
//                 className={errors.lastName ? "border-red-500" : ""}
//               />
//               {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="email">Email *</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 className={errors.email ? "border-red-500" : ""}
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>
//             <div>
//               <Label htmlFor="phone">Phone Number *</Label>
//               <Input
//                 id="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(e) => handleInputChange("phone", e.target.value)}
//                 className={errors.phone ? "border-red-500" : ""}
//               />
//               {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//             </div>
//           </div>

//           <div>
//             <Label htmlFor="address">Address *</Label>
//             <Input
//               id="address"
//               value={formData.address}
//               onChange={(e) => handleInputChange("address", e.target.value)}
//               className={errors.address ? "border-red-500" : ""}
//             />
//             {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//           </div>

//           <div>
//             <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
//             <Input
//               id="apartment"
//               value={formData.apartment}
//               onChange={(e) => handleInputChange("apartment", e.target.value)}
//             />
//           </div>

//           <div className="grid md:grid-cols-3 gap-4">
//             <div>
//               <Label htmlFor="city">City *</Label>
//               <Input
//                 id="city"
//                 value={formData.city}
//                 onChange={(e) => handleInputChange("city", e.target.value)}
//                 className={errors.city ? "border-red-500" : ""}
//               />
//               {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
//             </div>
//             <div>
//               <Label>State *</Label>
//               <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
//                 <SelectTrigger className={errors.state ? "border-red-500" : ""}>
//                   <SelectValue placeholder="Select state" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {states.map((state) => (
//                     <SelectItem key={state} value={state}>
//                       {state}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
//             </div>
//             <div>
//               <Label htmlFor="zipCode">ZIP Code *</Label>
//               <Input
//                 id="zipCode"
//                 value={formData.zipCode}
//                 onChange={(e) => handleInputChange("zipCode", e.target.value)}
//                 className={errors.zipCode ? "border-red-500" : ""}
//               />
//               {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
//             </div>
//           </div>

//           <div>
//             <Label>Country</Label>
//             <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="US">United States</SelectItem>
//                 <SelectItem value="CA">Canada</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-[#4A3F35] hover:bg-[#4A3F35]/90"
//             disabled={isProcessing}
//           >
//             {isProcessing ? "Processing Order..." : "Place Order (Cash on Delivery)"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ShippingAddress } from "./checkout-flow";

interface ShippingFormProps {
  onComplete: (data: ShippingAddress) => void;
  initialData?: ShippingAddress | null;
  isProcessing?: boolean;
}

export function ShippingForm({
  onComplete,
  initialData,
  isProcessing = false,
}: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    apartment: initialData?.apartment || "",
    city: initialData?.city || "",
    state: initialData?.state || "", // “state” key kept for downstream type-safety
    zipCode: initialData?.zipCode || "",
    country: initialData?.country || "PK",
  });

  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingAddress> = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    // province/state no longer required
    if (!formData.zipCode) newErrors.zipCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) onComplete(formData);
  };

  const provinces = [
    "Azad Jammu & Kashmir",
    "Balochistan",
    "Gilgit-Baltistan",
    "Islamabad Capital Territory",
    "Khyber Pakhtunkhwa",
    "Punjab",
    "Sindh",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Names */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Apartment */}
          <div>
            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
            <Input
              id="apartment"
              value={formData.apartment}
              onChange={(e) => handleInputChange("apartment", e.target.value)}
            />
          </div>

          {/* City / Province / Postal */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <Label>Province (optional)</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => handleInputChange("state", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((prov) => (
                    <SelectItem key={prov} value={prov}>
                      {prov}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="zipCode">Postal Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className={errors.zipCode ? "border-red-500" : ""}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>

          {/* Country */}
          <div>
            <Label>Country</Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PK">Pakistan</SelectItem>
                {/* Add more countries if you need multi-country support */}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#4A3F35] hover:bg-[#4A3F35]/90"
            disabled={isProcessing}
          >
            {isProcessing
              ? "Processing Order..."
              : "Place Order (Cash on Delivery)"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
