"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, CheckCircle, Clock, Users, Palette, Star, AlertCircle } from "lucide-react"
import { db, storage } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export function CustomizeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    timeline: "",
  })

  const [files, setFiles] = useState<File[]>([])
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 3,
    maxSize: 5 * 1024 * 1024, // 5MB per file
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    // Basic validation
    const validationErrors: Record<string, string> = {}
    if (!formData.name.trim()) validationErrors.name = "Name is required"
    if (!formData.email.trim()) validationErrors.email = "Email is required"
    if (!formData.phone.trim()) validationErrors.phone = "Phone number is required"
    if (!formData.description.trim()) validationErrors.description = "Design description is required"

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsSubmitting(false)
      return
    }

    setErrors({}) // Clear previous errors

    try {
      // Upload files to Firebase Storage
      const uploadedFiles: string[] = []

      if (storage && files.length > 0) {
        for (const file of files) {
          if (file && file.size > 0) {
            const fileName = `customize-requests/${Date.now()}-${file.name}`
            const storageRef = ref(storage, fileName)

            try {
              const snapshot = await uploadBytes(storageRef, file)
              const downloadURL = await getDownloadURL(snapshot.ref)
              uploadedFiles.push(downloadURL)
            } catch (uploadError) {
              console.error("File upload error:", uploadError)
              // Continue with other files even if one fails
            }
          }
        }
      }

      // Save to Firestore
      let requestId = ""
      if (db) {
        try {
          const customizeRequestData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            description: formData.description,
            timeline: formData.timeline,
            files: uploadedFiles,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          const docRef = await addDoc(collection(db, "customize-requests"), customizeRequestData)
          requestId = docRef.id
        } catch (firestoreError) {
          console.error("Firestore error:", firestoreError)
          requestId = `local-${Date.now()}`
        }
      } else {
        requestId = `local-${Date.now()}`
      }

      // Send email notification via API
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          description: formData.description,
          timeline: formData.timeline,
          files: uploadedFiles,
        }),
      })

      if (!emailResponse.ok) {
        console.error("Email sending failed, but form was saved")
        // Don't fail the entire submission if email fails
      }

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        description: "",
        timeline: "",
      })
      setFiles([])
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#2E2C2A] mb-4">Request Submitted Successfully!</h2>
            <p className="text-[#777] text-lg leading-relaxed">
              Thank you for your custom design request. Our creative team will review your specifications and contact
              you within 24 hours to discuss your project in detail.
            </p>
          </div>

          <div className="bg-[#F8F6F3] rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-[#2E2C2A] mb-3 flex items-center justify-center">
              <Clock className="w-5 h-5 mr-2" />
              What happens next?
            </h3>
            <div className="space-y-3 text-sm text-[#777]">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#4A3F35] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  1
                </div>
                <p>Our design team reviews your request and inspiration images</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#4A3F35] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  2
                </div>
                <p>We'll call you to discuss details and provide a detailed quote</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#4A3F35] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  3
                </div>
                <p>Upon approval, we create initial design concepts for your review</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#4A3F35] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  4
                </div>
                <p>After final approval and 50% payment, we begin crafting your piece</p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setSuccess(false)}
            variant="outline"
            className="border-[#4A3F35] text-[#4A3F35] hover:bg-[#4A3F35] hover:text-white"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#F8F6F3] to-white border-b border-[#E5E5E5]">
        <div className="text-center">
          <CardTitle className="text-3xl font-bold text-[#2E2C2A] mb-2">Create Your Custom Design</CardTitle>
          <p className="text-[#777] text-lg">
            Transform your vision into stunning wall art with our personalized design service
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-red-700">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information Section */}
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-[#4A3F35] mr-2" />
              <h3 className="text-xl font-semibold text-[#2E2C2A]">Contact Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#2E2C2A] font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`border-[#E5E5E5] focus:border-[#4A3F35] focus:ring-[#4A3F35] ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2E2C2A] font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`border-[#E5E5E5] focus:border-[#4A3F35] focus:ring-[#4A3F35] ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your email address"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#2E2C2A] font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`border-[#E5E5E5] focus:border-[#4A3F35] focus:ring-[#4A3F35] ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder="Enter your phone number"
                required
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </div>

          {/* Design Specifications Section */}
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Palette className="w-5 h-5 text-[#4A3F35] mr-2" />
              <h3 className="text-xl font-semibold text-[#2E2C2A]">Design Specifications</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-[#2E2C2A] font-medium">
                Design Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your vision in detail. Include colors, themes, style preferences, or specific elements you'd like to incorporate..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={5}
                className={`border-[#E5E5E5] focus:border-[#4A3F35] focus:ring-[#4A3F35] resize-none ${
                  errors.description ? "border-red-500" : ""
                }`}
                required
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[#2E2C2A] font-medium">Timeline</Label>
              <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                <SelectTrigger className="border-[#E5E5E5] focus:border-[#4A3F35] focus:ring-[#4A3F35]">
                  <SelectValue placeholder="When do you need this?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flexible">Flexible</SelectItem>
                  <SelectItem value="1-week">Within 1 week</SelectItem>
                  <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                  <SelectItem value="1-month">Within 1 month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Upload className="w-5 h-5 text-[#4A3F35] mr-2" />
              <h3 className="text-xl font-semibold text-[#2E2C2A]">Inspiration Images</h3>
            </div>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragActive
                  ? "border-[#4A3F35] bg-[#F8F6F3]"
                  : "border-[#E5E5E5] hover:border-[#4A3F35] hover:bg-[#F8F6F3]"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-[#777] mx-auto mb-4" />
              <p className="text-[#2E2C2A] font-medium mb-2">
                {isDragActive ? "Drop your images here" : "Upload inspiration images"}
              </p>
              <p className="text-[#777] text-sm">Drag & drop up to 3 images, or click to browse</p>
              <p className="text-[#777] text-xs mt-2">Supports: JPEG, PNG, GIF (Max 5MB per file)</p>
            </div>

            {files.length > 0 && (
              <div className="bg-[#F8F6F3] rounded-lg p-4">
                <h4 className="font-medium text-[#2E2C2A] mb-2">Uploaded Files:</h4>
                <ul className="space-y-1">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center text-sm text-[#777]">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      {file.name} ({Math.round(file.size / 1024)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Process Information */}
          <div className="bg-gradient-to-r from-[#F8F6F3] to-[#F5F3F0] rounded-lg p-6 border border-[#E5E5E5]">
            <div className="flex items-center mb-4">
              <Star className="w-5 h-5 text-[#4A3F35] mr-2" />
              <h3 className="font-semibold text-[#2E2C2A]">Our Custom Design Process</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-[#777]">
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#4A3F35] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    1
                  </div>
                  <p>Review your request within 24 hours</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#4A3F35] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    2
                  </div>
                  <p>Schedule consultation call to discuss details</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#4A3F35] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    3
                  </div>
                  <p>Create initial design concepts for approval</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#4A3F35] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    4
                  </div>
                  <p>Craft your custom piece with premium materials</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-[#4A3F35] hover:bg-[#3A2F25] text-white font-semibold py-4 text-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting Request...
              </div>
            ) : (
              "Submit Custom Design Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
