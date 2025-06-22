// // "use client"

// // import type React from "react"

// // import { useState, useEffect } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Checkbox } from "@/components/ui/checkbox"
// // import { Card, CardContent } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import { Upload, X, Loader2 } from "lucide-react"
// // import type { Product } from "@/types/product"
// // import Image from "next/image"

// // interface ProductFormDialogProps {
// //   open: boolean
// //   onOpenChange: (open: boolean) => void
// //   product?: Product | null
// //   onSave: (product: Omit<Product, "id">) => void
// // }

// // interface ImageUpload {
// //   file: File
// //   preview: string
// //   uploading: boolean
// //   uploaded: boolean
// //   url?: string
// //   hash?: string
// //   error?: string
// // }

// // export function ProductFormDialog({ open, onOpenChange, product, onSave }: ProductFormDialogProps) {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     price: "",
// //     originalPrice: "",
// //     material: "Glass" as "Glass" | "Wood",
// //     category: "",
// //     tags: [] as string[],
// //     dimensions: {
// //       width: "",
// //       height: "",
// //       depth: "",
// //       weight: "",
// //     },
// //     description: "",
// //     shortDescription: "",
// //     features: [] as string[],
// //     inStock: true,
// //     stockQuantity: "",
// //     sku: "",
// //     seoTitle: "",
// //     seoDescription: "",
// //     isCustomizable: false,
// //     customizationOptions: [] as string[],
// //     careInstructions: "",
// //     warranty: "",
// //     shippingInfo: "",
// //     featured: false,
// //     onSale: false,
// //     salePrice: "",
// //     availability: "in-stock" as "in-stock" | "out-of-stock" | "pre-order" | "discontinued",
// //   })

// //   const [imageUploads, setImageUploads] = useState<ImageUpload[]>([])
// //   const [mainImageIndex, setMainImageIndex] = useState(0)
// //   const [tagInput, setTagInput] = useState("")
// //   const [featureInput, setFeatureInput] = useState("")
// //   const [customizationInput, setCustomizationInput] = useState("")
// //   const [errors, setErrors] = useState<Record<string, string>>({})
// //   const [isSubmitting, setIsSubmitting] = useState(false)

// //   useEffect(() => {
// //     if (product) {
// //       setFormData({
// //         name: product.name,
// //         price: product.price.toString(),
// //         originalPrice: (product as any).originalPrice?.toString() || "",
// //         material: product.material,
// //         category: (product as any).category || "",
// //         tags: (product as any).tags || [],
// //         dimensions: {
// //           width: (product as any).dimensions?.width || "",
// //           height: (product as any).dimensions?.height || "",
// //           depth: (product as any).dimensions?.depth || "",
// //           weight: (product as any).dimensions?.weight || "",
// //         },
// //         description: product.description || "",
// //         shortDescription: (product as any).shortDescription || "",
// //         features: (product as any).features || [],
// //         inStock: product.inStock,
// //         stockQuantity: (product as any).stockQuantity?.toString() || "",
// //         sku: (product as any).sku || "",
// //         seoTitle: (product as any).seoTitle || "",
// //         seoDescription: (product as any).seoDescription || "",
// //         isCustomizable: (product as any).isCustomizable || false,
// //         customizationOptions: (product as any).customizationOptions || [],
// //         careInstructions: (product as any).careInstructions || "",
// //         warranty: (product as any).warranty || "",
// //         shippingInfo: (product as any).shippingInfo || "",
// //         featured: (product as any).featured || false,
// //         onSale: (product as any).onSale || false,
// //         salePrice: (product as any).salePrice?.toString() || "",
// //         availability: (product as any).availability || "in-stock",
// //       })

// //       // Convert existing images to upload format for editing
// //       const existingImages = (product as any).images || [product.image]
// //       const existingUploads: ImageUpload[] = existingImages.filter(Boolean).map((url: string, index: number) => ({
// //         file: null as any,
// //         preview: url,
// //         uploading: false,
// //         uploaded: true,
// //         url: url,
// //         hash: index === 0 ? product.blurHash : undefined,
// //       }))
// //       setImageUploads(existingUploads)
// //       setMainImageIndex(0)
// //     } else {
// //       // Reset form for new product
// //       setFormData({
// //         name: "",
// //         price: "",
// //         originalPrice: "",
// //         material: "Glass",
// //         category: "",
// //         tags: [],
// //         dimensions: {
// //           width: "",
// //           height: "",
// //           depth: "",
// //           weight: "",
// //         },
// //         description: "",
// //         shortDescription: "",
// //         features: [],
// //         inStock: true,
// //         stockQuantity: "",
// //         sku: `SKU-${Date.now()}`,
// //         seoTitle: "",
// //         seoDescription: "",
// //         isCustomizable: false,
// //         customizationOptions: [],
// //         careInstructions: "",
// //         warranty: "",
// //         shippingInfo: "",
// //         featured: false,
// //         onSale: false,
// //         salePrice: "",
// //         availability: "in-stock",
// //       })
// //       setImageUploads([])
// //       setMainImageIndex(0)
// //     }
// //     setTagInput("")
// //     setFeatureInput("")
// //     setCustomizationInput("")
// //     setErrors({})
// //     setIsSubmitting(false)
// //   }, [product, open])

// //   const handleImageUpload = async (files: FileList) => {
// //     const newUploads: ImageUpload[] = []

// //     for (let i = 0; i < files.length; i++) {
// //       const file = files[i]
// //       if (file.type.startsWith("image/")) {
// //         const preview = URL.createObjectURL(file)
// //         newUploads.push({
// //           file,
// //           preview,
// //           uploading: true,
// //           uploaded: false,
// //         })
// //       }
// //     }

// //     setImageUploads((prev) => [...prev, ...newUploads])

// //     // Upload images to API with hash generation
// //     for (let i = 0; i < newUploads.length; i++) {
// //       const upload = newUploads[i]
// //       const uploadIndex = imageUploads.length + i

// //       try {
// //         const formData = new FormData()
// //         formData.append("image", upload.file)

// //         const response = await fetch("/api/upload-image", {
// //           method: "POST",
// //           body: formData,
// //         })

// //         if (!response.ok) {
// //           const errorData = await response.json()
// //           throw new Error(errorData.error || "Upload failed")
// //         }

// //         const result = await response.json()

// //         setImageUploads((prev) =>
// //           prev.map((img, index) =>
// //             index === uploadIndex
// //               ? {
// //                   ...img,
// //                   uploading: false,
// //                   uploaded: true,
// //                   url: result.url,
// //                   hash: result.hash, // BlurHash generated by API
// //                 }
// //               : img,
// //           ),
// //         )
// //       } catch (error) {
// //         console.error("Upload error:", error)
// //         setImageUploads((prev) =>
// //           prev.map((img, index) =>
// //             index === uploadIndex
// //               ? {
// //                   ...img,
// //                   uploading: false,
// //                   uploaded: false,
// //                   error: error instanceof Error ? error.message : "Upload failed",
// //                 }
// //               : img,
// //           ),
// //         )
// //       }
// //     }
// //   }

// //   const removeImage = (index: number) => {
// //     setImageUploads((prev) => prev.filter((_, i) => i !== index))
// //     if (mainImageIndex >= index && mainImageIndex > 0) {
// //       setMainImageIndex(mainImageIndex - 1)
// //     }
// //   }

// //   const setMainImage = (index: number) => {
// //     setMainImageIndex(index)
// //   }

// //   const addTag = () => {
// //     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         tags: [...prev.tags, tagInput.trim()],
// //       }))
// //       setTagInput("")
// //     }
// //   }

// //   const removeTag = (tag: string) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       tags: prev.tags.filter((t) => t !== tag),
// //     }))
// //   }

// //   const addFeature = () => {
// //     if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         features: [...prev.features, featureInput.trim()],
// //       }))
// //       setFeatureInput("")
// //     }
// //   }

// //   const removeFeature = (feature: string) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       features: prev.features.filter((f) => f !== feature),
// //     }))
// //   }

// //   const addCustomizationOption = () => {
// //     if (customizationInput.trim() && !formData.customizationOptions.includes(customizationInput.trim())) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         customizationOptions: [...prev.customizationOptions, customizationInput.trim()],
// //       }))
// //       setCustomizationInput("")
// //     }
// //   }

// //   const removeCustomizationOption = (option: string) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       customizationOptions: prev.customizationOptions.filter((o) => o !== option),
// //     }))
// //   }

// //   const validateForm = () => {
// //     const newErrors: Record<string, string> = {}

// //     if (!formData.name.trim()) {
// //       newErrors.name = "Product name is required"
// //     }

// //     if (!formData.price.trim()) {
// //       newErrors.price = "Price is required"
// //     } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
// //       newErrors.price = "Price must be a valid positive number"
// //     }

// //     if (formData.onSale && formData.salePrice) {
// //       if (isNaN(Number(formData.salePrice)) || Number(formData.salePrice) <= 0) {
// //         newErrors.salePrice = "Sale price must be a valid positive number"
// //       } else if (Number(formData.salePrice) >= Number(formData.price)) {
// //         newErrors.salePrice = "Sale price must be less than regular price"
// //       }
// //     }

// //     if (imageUploads.length === 0) {
// //       newErrors.images = "At least one product image is required"
// //     } else if (imageUploads.some((img) => img.uploading)) {
// //       newErrors.images = "Please wait for all images to finish uploading"
// //     } else if (imageUploads.some((img) => img.error)) {
// //       newErrors.images = "Some images failed to upload. Please try again"
// //     }

// //     if (!formData.description.trim()) {
// //       newErrors.description = "Description is required"
// //     }

// //     if (!formData.shortDescription.trim()) {
// //       newErrors.shortDescription = "Short description is required"
// //     }

// //     if (!formData.sku.trim()) {
// //       newErrors.sku = "SKU is required"
// //     }

// //     if (formData.stockQuantity && (isNaN(Number(formData.stockQuantity)) || Number(formData.stockQuantity) < 0)) {
// //       newErrors.stockQuantity = "Stock quantity must be a valid non-negative number"
// //     }

// //     setErrors(newErrors)
// //     return Object.keys(newErrors).length === 0
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     if (!validateForm()) {
// //       return
// //     }

// //     setIsSubmitting(true)

// //     try {
// //       const uploadedImages = imageUploads.filter((img) => img.uploaded && img.url)
// //       const mainImage = uploadedImages[mainImageIndex]

// //       const productData: any = {
// //         name: formData.name.trim(),
// //         price: Number(formData.price),
// //         originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
// //         image: mainImage?.url || "",
// //         images: uploadedImages.map((img) => img.url),
// //         material: formData.material,
// //         category: formData.category.trim(),
// //         tags: formData.tags,
// //         dimensions: {
// //           width: formData.dimensions.width,
// //           height: formData.dimensions.height,
// //           depth: formData.dimensions.depth,
// //           weight: formData.dimensions.weight,
// //         },
// //         description: formData.description.trim(),
// //         shortDescription: formData.shortDescription.trim(),
// //         features: formData.features,
// //         inStock: formData.inStock,
// //         stockQuantity: formData.stockQuantity ? Number(formData.stockQuantity) : undefined,
// //         sku: formData.sku.trim(),
// //         blurHash: mainImage?.hash || undefined,
// //         seoTitle: formData.seoTitle.trim(),
// //         seoDescription: formData.seoDescription.trim(),
// //         isCustomizable: formData.isCustomizable,
// //         customizationOptions: formData.customizationOptions,
// //         careInstructions: formData.careInstructions.trim(),
// //         warranty: formData.warranty.trim(),
// //         shippingInfo: formData.shippingInfo.trim(),
// //         featured: formData.featured,
// //         onSale: formData.onSale,
// //         salePrice: formData.onSale && formData.salePrice ? Number(formData.salePrice) : undefined,
// //         availability: formData.availability,
// //       }

// //       onSave(productData)
// //     } catch (error) {
// //       console.error("Error saving product:", error)
// //     } finally {
// //       setIsSubmitting(false)
// //     }
// //   }

// //   const handleInputChange = (field: string, value: any) => {
// //     setFormData((prev) => ({ ...prev, [field]: value }))
// //     if (errors[field]) {
// //       setErrors((prev) => ({ ...prev, [field]: "" }))
// //     }
// //   }

// //   const handleDimensionChange = (dimension: string, value: string) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       dimensions: { ...prev.dimensions, [dimension]: value },
// //     }))
// //   }

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
// //         <DialogHeader>
// //           <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
// //         </DialogHeader>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Basic Information */}
// //           <div className="space-y-4">
// //             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <Label htmlFor="name">Product Name *</Label>
// //                 <Input
// //                   id="name"
// //                   value={formData.name}
// //                   onChange={(e) => handleInputChange("name", e.target.value)}
// //                   className={errors.name ? "border-red-500" : ""}
// //                 />
// //                 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
// //               </div>

// //               <div>
// //                 <Label htmlFor="sku">SKU *</Label>
// //                 <Input
// //                   id="sku"
// //                   value={formData.sku}
// //                   onChange={(e) => handleInputChange("sku", e.target.value)}
// //                   className={errors.sku ? "border-red-500" : ""}
// //                 />
// //                 {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
// //               </div>
// //             </div>

// //             <div>
// //               <Label htmlFor="shortDescription">Short Description *</Label>
// //               <Textarea
// //                 id="shortDescription"
// //                 value={formData.shortDescription}
// //                 onChange={(e) => handleInputChange("shortDescription", e.target.value)}
// //                 rows={2}
// //                 className={errors.shortDescription ? "border-red-500" : ""}
// //               />
// //               {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>}
// //             </div>

// //             <div>
// //               <Label htmlFor="description">Full Description *</Label>
// //               <Textarea
// //                 id="description"
// //                 value={formData.description}
// //                 onChange={(e) => handleInputChange("description", e.target.value)}
// //                 rows={4}
// //                 className={errors.description ? "border-red-500" : ""}
// //               />
// //               {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <Label>Material *</Label>
// //                 <Select
// //                   value={formData.material}
// //                   onValueChange={(value: "Glass" | "Wood") => handleInputChange("material", value)}
// //                 >
// //                   <SelectTrigger>
// //                     <SelectValue />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     <SelectItem value="Glass">Glass</SelectItem>
// //                     <SelectItem value="Wood">Wood</SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //               </div>

// //               <div>
// //                 <Label htmlFor="category">Category</Label>
// //                 <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Select category" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     <SelectItem value="wall-art">Wall Art</SelectItem>
// //                     <SelectItem value="decorative-panels">Decorative Panels</SelectItem>
// //                     <SelectItem value="mirrors">Mirrors</SelectItem>
// //                     <SelectItem value="sculptures">Sculptures</SelectItem>
// //                     <SelectItem value="custom">Custom Pieces</SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Images */}
// //           <div className="space-y-4">
// //             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Product Images</h3>

// //             <div>
// //               <Label>Upload Images *</Label>
// //               <div className="mt-2">
// //                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
// //                   <input
// //                     type="file"
// //                     multiple
// //                     accept="image/*"
// //                     onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
// //                     className="hidden"
// //                     id="image-upload"
// //                   />
// //                   <label htmlFor="image-upload" className="cursor-pointer">
// //                     <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //                     <p className="text-lg font-medium text-gray-900">Upload Images</p>
// //                     <p className="text-sm text-gray-500">Drag and drop or click to select files</p>
// //                   </label>
// //                 </div>
// //               </div>
// //               {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
// //             </div>

// //             {imageUploads.length > 0 && (
// //               <div>
// //                 <Label>Image Gallery</Label>
// //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
// //                   {imageUploads.map((upload, index) => (
// //                     <Card key={index} className="relative">
// //                       <CardContent className="p-2">
// //                         <div className="relative aspect-square">
// //                           <Image
// //                             src={upload.preview || "/placeholder.svg"}
// //                             alt={`Product image ${index + 1}`}
// //                             fill
// //                             className="object-cover rounded"
// //                           />
// //                           {mainImageIndex === index && (
// //                             <Badge className="absolute top-1 left-1 bg-green-600">Main</Badge>
// //                           )}
// //                           {upload.uploading && (
// //                             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
// //                               <Loader2 className="h-6 w-6 text-white animate-spin" />
// //                             </div>
// //                           )}
// //                           {upload.error && (
// //                             <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center rounded">
// //                               <span className="text-white text-xs">Error</span>
// //                             </div>
// //                           )}
// //                           <button
// //                             type="button"
// //                             onClick={() => removeImage(index)}
// //                             className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
// //                           >
// //                             <X className="h-3 w-3" />
// //                           </button>
// //                         </div>
// //                         <Button
// //                           type="button"
// //                           variant="outline"
// //                           size="sm"
// //                           onClick={() => setMainImage(index)}
// //                           className="w-full mt-2"
// //                           disabled={mainImageIndex === index || upload.uploading || upload.error}
// //                         >
// //                           {mainImageIndex === index ? "Main Image" : "Set as Main"}
// //                         </Button>
// //                       </CardContent>
// //                     </Card>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Pricing & Inventory */}
// //           <div className="space-y-4">
// //             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Pricing & Inventory</h3>

// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //               <div>
// //                 <Label htmlFor="price">Regular Price *</Label>
// //                 <Input
// //                   id="price"
// //                   type="number"
// //                   step="0.01"
// //                   min="0"
// //                   value={formData.price}
// //                   onChange={(e) => handleInputChange("price", e.target.value)}
// //                   className={errors.price ? "border-red-500" : ""}
// //                 />
// //                 {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
// //               </div>

// //               <div>
// //                 <Label htmlFor="originalPrice">Original Price</Label>
// //                 <Input
// //                   id="originalPrice"
// //                   type="number"
// //                   step="0.01"
// //                   min="0"
// //                   value={formData.originalPrice}
// //                   onChange={(e) => handleInputChange("originalPrice", e.target.value)}
// //                   placeholder="For showing discounts"
// //                 />
// //               </div>

// //               <div>
// //                 <Label htmlFor="stockQuantity">Stock Quantity</Label>
// //                 <Input
// //                   id="stockQuantity"
// //                   type="number"
// //                   min="0"
// //                   value={formData.stockQuantity}
// //                   onChange={(e) => handleInputChange("stockQuantity", e.target.value)}
// //                   className={errors.stockQuantity ? "border-red-500" : ""}
// //                 />
// //                 {errors.stockQuantity && <p className="text-red-500 text-sm mt-1">{errors.stockQuantity}</p>}
// //               </div>
// //             </div>

// //             <div className="flex items-center space-x-6">
// //               <div className="flex items-center space-x-2">
// //                 <Checkbox
// //                   id="inStock"
// //                   checked={formData.inStock}
// //                   onCheckedChange={(checked) => handleInputChange("inStock", checked)}
// //                 />
// //                 <Label htmlFor="inStock">In Stock</Label>
// //               </div>

// //               <div className="flex items-center space-x-2">
// //                 <Checkbox
// //                   id="onSale"
// //                   checked={formData.onSale}
// //                   onCheckedChange={(checked) => handleInputChange("onSale", checked)}
// //                 />
// //                 <Label htmlFor="onSale">On Sale</Label>
// //               </div>

// //               <div className="flex items-center space-x-2">
// //                 <Checkbox
// //                   id="featured"
// //                   checked={formData.featured}
// //                   onCheckedChange={(checked) => handleInputChange("featured", checked)}
// //                 />
// //                 <Label htmlFor="featured">Featured Product</Label>
// //               </div>
// //             </div>

// //             {formData.onSale && (
// //               <div>
// //                 <Label htmlFor="salePrice">Sale Price</Label>
// //                 <Input
// //                   id="salePrice"
// //                   type="number"
// //                   step="0.01"
// //                   min="0"
// //                   value={formData.salePrice}
// //                   onChange={(e) => handleInputChange("salePrice", e.target.value)}
// //                   className={errors.salePrice ? "border-red-500" : ""}
// //                 />
// //                 {errors.salePrice && <p className="text-red-500 text-sm mt-1">{errors.salePrice}</p>}
// //               </div>
// //             )}

// //             <div>
// //               <Label>Availability Status</Label>
// //               <Select value={formData.availability} onValueChange={(value) => handleInputChange("availability", value)}>
// //                 <SelectTrigger>
// //                   <SelectValue />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="in-stock">In Stock</SelectItem>
// //                   <SelectItem value="out-of-stock">Out of Stock</SelectItem>
// //                   <SelectItem value="pre-order">Pre-order</SelectItem>
// //                   <SelectItem value="discontinued">Discontinued</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </div>

// //           {/* Product Details */}
// //           <div className="space-y-4">
// //             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Product Details</h3>

// //             <div>
// //               <Label>Dimensions</Label>
// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
// //                 <div>
// //                   <Label htmlFor="width">Width</Label>
// //                   <Input
// //                     id="width"
// //                     value={formData.dimensions.width}
// //                     onChange={(e) => handleDimensionChange("width", e.target.value)}
// //                     placeholder="24 inches"
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label htmlFor="height">Height</Label>
// //                   <Input
// //                     id="height"
// //                     value={formData.dimensions.height}
// //                     onChange={(e) => handleDimensionChange("height", e.target.value)}
// //                     placeholder="36 inches"
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label htmlFor="depth">Depth</Label>
// //                   <Input
// //                     id="depth"
// //                     value={formData.dimensions.depth}
// //                     onChange={(e) => handleDimensionChange("depth", e.target.value)}
// //                     placeholder="2 inches"
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label htmlFor="weight">Weight</Label>
// //                   <Input
// //                     id="weight"
// //                     value={formData.dimensions.weight}
// //                     onChange={(e) => handleDimensionChange("weight", e.target.value)}
// //                     placeholder="8.5 lbs"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             <div>
// //               <Label>Product Features</Label>
// //               <div className="flex gap-2 mt-2">
// //                 <Input
// //                   value={featureInput}
// //                   onChange={(e) => setFeatureInput(e.target.value)}
// //                   placeholder="Add a feature"
// //                   onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
// //                 />
// //                 <Button type="button" onClick={addFeature}>
// //                   Add
// //                 </Button>
// //               </div>
// //               <div className="flex flex-wrap gap-2 mt-2">
// //                 {formData.features.map((feature, index) => (
// //                   <Badge key={index} variant="secondary" className="flex items-center gap-1">
// //                     {feature}
// //                     <button type="button" onClick={() => removeFeature(feature)} className="ml-1 hover:text-red-600">
// //                       <X className="h-3 w-3" />
// //                     </button>
// //                   </Badge>
// //                 ))}
// //               </div>
// //             </div>

// //             <div>
// //               <Label>Tags</Label>
// //               <div className="flex gap-2 mt-2">
// //                 <Input
// //                   value={tagInput}
// //                   onChange={(e) => setTagInput(e.target.value)}
// //                   placeholder="Add a tag"
// //                   onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
// //                 />
// //                 <Button type="button" onClick={addTag}>
// //                   Add
// //                 </Button>
// //               </div>
// //               <div className="flex flex-wrap gap-2 mt-2">
// //                 {formData.tags.map((tag, index) => (
// //                   <Badge key={index} variant="outline" className="flex items-center gap-1">
// //                     {tag}
// //                     <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-600">
// //                       <X className="h-3 w-3" />
// //                     </button>
// //                   </Badge>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <Label htmlFor="careInstructions">Care Instructions</Label>
// //                 <Textarea
// //                   id="careInstructions"
// //                   value={formData.careInstructions}
// //                   onChange={(e) => handleInputChange("careInstructions", e.target.value)}
// //                   rows={3}
// //                   placeholder="How to care for this product..."
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="warranty">Warranty</Label>
// //                 <Input
// //                   id="warranty"
// //                   value={formData.warranty}
// //                   onChange={(e) => handleInputChange("warranty", e.target.value)}
// //                   placeholder="1 year limited warranty"
// //                 />
// //                 <Label htmlFor="shippingInfo" className="mt-2 block">
// //                   Shipping Info
// //                 </Label>
// //                 <Input
// //                   id="shippingInfo"
// //                   value={formData.shippingInfo}
// //                   onChange={(e) => handleInputChange("shippingInfo", e.target.value)}
// //                   placeholder="Ships in 3-5 business days"
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* SEO & Customization */}
// //           <div className="space-y-4">
// //             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">SEO & Customization</h3>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <Label htmlFor="seoTitle">SEO Title</Label>
// //                 <Input
// //                   id="seoTitle"
// //                   value={formData.seoTitle}
// //                   onChange={(e) => handleInputChange("seoTitle", e.target.value)}
// //                   placeholder="Optimized title for search engines"
// //                 />
// //                 <p className="text-sm text-gray-500 mt-1">{formData.seoTitle.length}/60 characters</p>
// //               </div>
// //               <div>
// //                 <Label htmlFor="seoDescription">SEO Description</Label>
// //                 <Textarea
// //                   id="seoDescription"
// //                   value={formData.seoDescription}
// //                   onChange={(e) => handleInputChange("seoDescription", e.target.value)}
// //                   rows={2}
// //                   placeholder="Meta description for search engines"
// //                 />
// //                 <p className="text-sm text-gray-500 mt-1">{formData.seoDescription.length}/160 characters</p>
// //               </div>
// //             </div>

// //             <div className="flex items-center space-x-2">
// //               <Checkbox
// //                 id="isCustomizable"
// //                 checked={formData.isCustomizable}
// //                 onCheckedChange={(checked) => handleInputChange("isCustomizable", checked)}
// //               />
// //               <Label htmlFor="isCustomizable">This product is customizable</Label>
// //             </div>

// //             {formData.isCustomizable && (
// //               <div>
// //                 <Label>Customization Options</Label>
// //                 <div className="flex gap-2 mt-2">
// //                   <Input
// //                     value={customizationInput}
// //                     onChange={(e) => setCustomizationInput(e.target.value)}
// //                     placeholder="Add customization option"
// //                     onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomizationOption())}
// //                   />
// //                   <Button type="button" onClick={addCustomizationOption}>
// //                     Add
// //                   </Button>
// //                 </div>
// //                 <div className="flex flex-wrap gap-2 mt-2">
// //                   {formData.customizationOptions.map((option, index) => (
// //                     <Badge key={index} variant="secondary" className="flex items-center gap-1">
// //                       {option}
// //                       <button
// //                         type="button"
// //                         onClick={() => removeCustomizationOption(option)}
// //                         className="ml-1 hover:text-red-600"
// //                       >
// //                         <X className="h-3 w-3" />
// //                       </button>
// //                     </Badge>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex justify-end gap-3 pt-6 border-t">
// //             <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
// //               Cancel
// //             </Button>
// //             <Button type="submit" disabled={isSubmitting}>
// //               {isSubmitting ? (
// //                 <>
// //                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// //                   {product ? "Updating..." : "Adding..."}
// //                 </>
// //               ) : product ? (
// //                 "Update Product"
// //               ) : (
// //                 "Add Product"
// //               )}
// //             </Button>
// //           </div>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }
// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Upload, X, Loader2 } from "lucide-react";
// import type { Product } from "@/types/product";
// import Image from "next/image";
// // import { isFirebaseConfigured } from "@/lib/firebase"

// interface ProductFormDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   product?: Product | null;
//   onSave: () => void;
// }

// interface ImageUpload {
//   file: File;
//   preview: string;
//   uploading: boolean;
//   uploaded: boolean;
//   url?: string;
//   hash?: string;
//   fileName?: string;
//   imageId?: string;
//   error?: string;
// }

// // Mock data for demo purposes
// const generateMockImageData = (file: File) => ({
//   url: URL.createObjectURL(file),
//   hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj", // Sample BlurHash
//   fileName: `products/${Date.now()}-${file.name}`,
//   imageId: `img_${Date.now()}`,
//   size: file.size,
// });

// export function ProductFormDialog({
//   open,
//   onOpenChange,
//   product,
//   onSave,
// }: ProductFormDialogProps) {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     originalPrice: "",
//     material: "Glass" as "Glass" | "Wood",
//     category: "",
//     tags: [] as string[],
//     dimensions: {
//       width: "",
//       height: "",
//       depth: "",
//       weight: "",
//     },
//     description: "",
//     shortDescription: "",
//     features: [] as string[],
//     inStock: true,
//     stockQuantity: "",
//     sku: "",
//     seoTitle: "",
//     seoDescription: "",
//     isCustomizable: false,
//     customizationOptions: [] as string[],
//     careInstructions: "",
//     warranty: "",
//     shippingInfo: "",
//     featured: false,
//     onSale: false,
//     salePrice: "",
//     availability: "in-stock" as
//       | "in-stock"
//       | "out-of-stock"
//       | "pre-order"
//       | "discontinued",
//   });

//   const [imageUploads, setImageUploads] = useState<ImageUpload[]>([]);
//   const [mainImageIndex, setMainImageIndex] = useState(0);
//   const [tagInput, setTagInput] = useState("");
//   const [featureInput, setFeatureInput] = useState("");
//   const [customizationInput, setCustomizationInput] = useState("");
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name,
//         price: product.price.toString(),
//         originalPrice: (product as any).originalPrice?.toString() || "",
//         material: product.material,
//         category: (product as any).category || "",
//         tags: (product as any).tags || [],
//         dimensions: {
//           width: (product as any).dimensions?.width || "",
//           height: (product as any).dimensions?.height || "",
//           depth: (product as any).dimensions?.depth || "",
//           weight: (product as any).dimensions?.weight || "",
//         },
//         description: product.description || "",
//         shortDescription: (product as any).shortDescription || "",
//         features: (product as any).features || [],
//         inStock: product.inStock,
//         stockQuantity: (product as any).stockQuantity?.toString() || "",
//         sku: (product as any).sku || "",
//         seoTitle: product.seoTitle || "",
//         seoDescription: product.seoDescription || "",
//         isCustomizable: (product as any).isCustomizable || false,
//         customizationOptions: (product as any).customizationOptions || [],
//         careInstructions: product.careInstructions || "",
//         warranty: product.warranty || "",
//         shippingInfo: product.shippingInfo || "",
//         featured: (product as any).featured || false,
//         onSale: (product as any).onSale || false,
//         salePrice: (product as any).salePrice?.toString() || "",
//         availability: (product as any).availability || "in-stock",
//       });

//       // Convert existing images to upload format for editing
//       const existingImages = (product as any).images || [product.image];
//       const existingUploads: ImageUpload[] = existingImages
//         .filter(Boolean)
//         .map((url: string, index: number) => ({
//           file: null as any,
//           preview: url,
//           uploading: false,
//           uploaded: true,
//           url: url,
//           hash: index === 0 ? product.blurHash : undefined,
//         }));
//       setImageUploads(existingUploads);
//       setMainImageIndex(0);
//     } else {
//       // Reset form for new product
//       setFormData({
//         name: "",
//         price: "",
//         originalPrice: "",
//         material: "Glass",
//         category: "",
//         tags: [],
//         dimensions: {
//           width: "",
//           height: "",
//           depth: "",
//           weight: "",
//         },
//         description: "",
//         shortDescription: "",
//         features: [],
//         inStock: true,
//         stockQuantity: "",
//         sku: `SKU-${Date.now()}`,
//         seoTitle: "",
//         seoDescription: "",
//         isCustomizable: false,
//         customizationOptions: [],
//         careInstructions: "",
//         warranty: "",
//         shippingInfo: "",
//         featured: false,
//         onSale: false,
//         salePrice: "",
//         availability: "in-stock",
//       });
//       setImageUploads([]);
//       setMainImageIndex(0);
//     }
//     setTagInput("");
//     setFeatureInput("");
//     setCustomizationInput("");
//     setErrors({});
//     setIsSubmitting(false);
//   }, [product, open]);

//   const handleImageUpload = async (files: FileList) => {
//     const newUploads: ImageUpload[] = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       if (file.type.startsWith("image/")) {
//         const preview = URL.createObjectURL(file);
//         newUploads.push({
//           file,
//           preview,
//           uploading: true,
//           uploaded: false,
//         });
//       }
//     }

//     setImageUploads((prev) => [...prev, ...newUploads]);

//     // Upload images to API
//     for (let i = 0; i < newUploads.length; i++) {
//       const upload = newUploads[i];
//       const uploadIndex = imageUploads.length + i;

//       try {
//         console.log("Starting upload for:", upload.file.name);

//         const formData = new FormData();
//         formData.append("image", upload.file);

//         const response = await fetch("/api/upload-image", {
//           method: "POST",
//           body: formData,
//         });

//         console.log("Upload response status:", response.status);

//         if (!response.ok) {
//           let errorMessage = `Upload failed with status ${response.status}`;
//           try {
//             const errorData = await response.json();
//             errorMessage = errorData.error || errorData.details || errorMessage;
//             console.log("Error response:", errorData);
//           } catch (jsonError) {
//             // If response is not JSON, try to get text
//             try {
//               const errorText = await response.text();
//               errorMessage = errorText || response.statusText || errorMessage;
//               console.log("Error text:", errorText);
//             } catch (textError) {
//               console.log("Could not parse error response");
//             }
//           }
//           throw new Error(errorMessage);
//         }

//         const result = await response.json();
//         console.log("Upload successful:", result);

//         if (!result.success) {
//           throw new Error(result.error || "Upload failed");
//         }

//         setImageUploads((prev) =>
//           prev.map((img, index) =>
//             index === uploadIndex
//               ? {
//                   ...img,
//                   uploading: false,
//                   uploaded: true,
//                   url: result.url,
//                   hash: result.hash,
//                   fileName: result.fileName,
//                 }
//               : img
//           )
//         );
//       } catch (error) {
//         console.error("Upload error for", upload.file.name, ":", error);

//         // Create fallback blob URL
//         const fallbackUrl = URL.createObjectURL(upload.file);
//         console.log("Using fallback URL:", fallbackUrl);

//         setImageUploads((prev) =>
//           prev.map((img, index) =>
//             index === uploadIndex
//               ? {
//                   ...img,
//                   uploading: false,
//                   uploaded: true,
//                   url: fallbackUrl,
//                   hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj", // Default blur hash
//                   fileName: `local-${Date.now()}-${upload.file.name}`,
//                   error: undefined, // Clear error since we have fallback
//                 }
//               : img
//           )
//         );
//       }
//     }
//   };

//   const removeImage = (index: number) => {
//     setImageUploads((prev) => prev.filter((_, i) => i !== index));
//     if (mainImageIndex >= index && mainImageIndex > 0) {
//       setMainImageIndex(mainImageIndex - 1);
//     }
//   };

//   const setMainImage = (index: number) => {
//     setMainImageIndex(index);
//   };

//   const addTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData((prev) => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()],
//       }));
//       setTagInput("");
//     }
//   };

//   const removeTag = (tag: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       tags: prev.tags.filter((t) => t !== tag),
//     }));
//   };

//   const addFeature = () => {
//     if (
//       featureInput.trim() &&
//       !formData.features.includes(featureInput.trim())
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         features: [...prev.features, featureInput.trim()],
//       }));
//       setFeatureInput("");
//     }
//   };

//   const removeFeature = (feature: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       features: prev.features.filter((f) => f !== feature),
//     }));
//   };

//   const addCustomizationOption = () => {
//     if (
//       customizationInput.trim() &&
//       !formData.customizationOptions.includes(customizationInput.trim())
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         customizationOptions: [
//           ...prev.customizationOptions,
//           customizationInput.trim(),
//         ],
//       }));
//       setCustomizationInput("");
//     }
//   };

//   const removeCustomizationOption = (option: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       customizationOptions: prev.customizationOptions.filter(
//         (o) => o !== option
//       ),
//     }));
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Product name is required";
//     }

//     if (!formData.price.trim()) {
//       newErrors.price = "Price is required";
//     } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
//       newErrors.price = "Price must be a valid positive number";
//     }

//     if (formData.onSale && formData.salePrice) {
//       if (
//         isNaN(Number(formData.salePrice)) ||
//         Number(formData.salePrice) <= 0
//       ) {
//         newErrors.salePrice = "Sale price must be a valid positive number";
//       } else if (Number(formData.salePrice) >= Number(formData.price)) {
//         newErrors.salePrice = "Sale price must be less than regular price";
//       }
//     }

//     if (imageUploads.length === 0) {
//       newErrors.images = "At least one product image is required";
//     } else if (imageUploads.some((img) => img.uploading)) {
//       newErrors.images = "Please wait for all images to finish uploading";
//     } else if (imageUploads.some((img) => img.error)) {
//       newErrors.images = "Some images failed to upload. Please try again";
//     }

//     if (!formData.description.trim()) {
//       newErrors.description = "Description is required";
//     }

//     if (!formData.shortDescription.trim()) {
//       newErrors.shortDescription = "Short description is required";
//     }

//     if (!formData.sku.trim()) {
//       newErrors.sku = "SKU is required";
//     }

//     if (
//       formData.stockQuantity &&
//       (isNaN(Number(formData.stockQuantity)) ||
//         Number(formData.stockQuantity) < 0)
//     ) {
//       newErrors.stockQuantity =
//         "Stock quantity must be a valid non-negative number";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const uploadedImages = imageUploads.filter(
//         (img) => img.uploaded && img.url
//       );
//       const mainImage = uploadedImages[mainImageIndex];

//       const productData: any = {
//         name: formData.name.trim(),
//         price: Number(formData.price),
//         originalPrice: formData.originalPrice
//           ? Number(formData.originalPrice)
//           : 0,
//         image: mainImage?.url || "",
//         images: uploadedImages.map((img) => img.url),
//         material: formData.material,
//         category: formData.category.trim(),
//         tags: formData.tags,
//         dimensions: {
//           width: formData.dimensions.width,
//           height: formData.dimensions.height,
//           depth: formData.dimensions.depth,
//           weight: formData.dimensions.weight,
//         },
//         description: formData.description.trim(),
//         shortDescription: formData.shortDescription.trim(),
//         features: formData.features,
//         inStock: formData.inStock,
//         stockQuantity: formData.stockQuantity
//           ? Number(formData.stockQuantity)
//           : 0,
//         sku: formData.sku.trim(),
//         blurHash: mainImage?.hash || undefined,
//         seoTitle: formData.seoTitle.trim(),
//         seoDescription: formData.seoDescription.trim(),
//         isCustomizable: formData.isCustomizable,
//         customizationOptions: formData.customizationOptions,
//         careInstructions: formData.careInstructions.trim(),
//         warranty: formData.warranty.trim(),
//         shippingInfo: formData.shippingInfo.trim(),
//         featured: formData.featured,
//         onSale: formData.onSale,
//         salePrice:
//           formData.onSale && formData.salePrice
//             ? Number(formData.salePrice)
//             : 0,
//         availability: formData.availability,
//       };

//       // Check if Firebase is properly configured
//       // if (isFirebaseConfigured()) {
//       // Try real Firestore save
//       try {
//         const { collection, addDoc, updateDoc, doc } = await import(
//           "firebase/firestore"
//         );
//         const { db } = await import("@/lib/firebase");

//         if (product) {
//           // Update existing product
//           const productRef = doc(db, "products", product.id);
//           await updateDoc(productRef, {
//             ...productData,
//             updatedAt: new Date(),
//           });
//         } else {
//           // Create new product
//           await addDoc(collection(db, "products"), {
//             ...productData,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             status: "active",
//           });
//         }
//       } catch (firebaseError) {
//         console.log(
//           "Firestore save failed, using local storage:",
//           firebaseError
//         );
//         // Fallback to localStorage for demo
//         // saveToLocalStorage(productData);
//       }
//       // } else {
//       //   // Use localStorage for demo
//       //   saveToLocalStorage(productData)
//       // }

//       // Close dialog and refresh products list
//       onOpenChange(false);
//       onSave();
//     } catch (error) {
//       console.error("Error saving product:", error);
//       setErrors({ submit: "Failed to save product. Please try again." });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const saveToLocalStorage = (productData: any) => {
//     const products = JSON.parse(localStorage.getItem("demo-products") || "[]");

//     if (product) {
//       // Update existing product
//       const index = products.findIndex((p: any) => p.id === product.id);
//       if (index !== -1) {
//         products[index] = {
//           ...productData,
//           id: product.id,
//           updatedAt: new Date().toISOString(),
//         };
//       }
//     } else {
//       // Add new product
//       const newProduct = {
//         ...productData,
//         id: `product_${Date.now()}`,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         status: "active",
//       };
//       products.push(newProduct);
//     }

//     localStorage.setItem("demo-products", JSON.stringify(products));
//   };

//   const handleInputChange = (field: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };

//   const handleDimensionChange = (dimension: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       dimensions: { ...prev.dimensions, [dimension]: value },
//     }));
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>
//             {product ? "Edit Product" : "Add New Product"}
//           </DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
//               Basic Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name">Product Name *</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   className={errors.name ? "border-red-500" : ""}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="sku">SKU *</Label>
//                 <Input
//                   id="sku"
//                   value={formData.sku}
//                   onChange={(e) => handleInputChange("sku", e.target.value)}
//                   className={errors.sku ? "border-red-500" : ""}
//                 />
//                 {errors.sku && (
//                   <p className="text-red-500 text-sm mt-1">{errors.sku}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="shortDescription">Short Description *</Label>
//               <Textarea
//                 id="shortDescription"
//                 value={formData.shortDescription}
//                 onChange={(e) =>
//                   handleInputChange("shortDescription", e.target.value)
//                 }
//                 rows={2}
//                 className={errors.shortDescription ? "border-red-500" : ""}
//               />
//               {errors.shortDescription && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.shortDescription}
//                 </p>
//               )}
//             </div>

//             <div>
//               <Label htmlFor="description">Full Description *</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) =>
//                   handleInputChange("description", e.target.value)
//                 }
//                 rows={4}
//                 className={errors.description ? "border-red-500" : ""}
//               />
//               {errors.description && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.description}
//                 </p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label>Material *</Label>
//                 <Select
//                   value={formData.material}
//                   onValueChange={(value: "Glass" | "Wood") =>
//                     handleInputChange("material", value)
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Glass">Glass</SelectItem>
//                     <SelectItem value="Wood">Wood</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label htmlFor="category">Category</Label>
//                 <Select
//                   value={formData.category}
//                   onValueChange={(value) =>
//                     handleInputChange("category", value)
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="wall-art">Wall Art</SelectItem>
//                     <SelectItem value="decorative-panels">
//                       Decorative Panels
//                     </SelectItem>
//                     <SelectItem value="mirrors">Mirrors</SelectItem>
//                     <SelectItem value="sculptures">Sculptures</SelectItem>
//                     <SelectItem value="custom">Custom Pieces</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           {/* Images */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
//               Product Images
//             </h3>

//             <div>
//               <Label>Upload Images *</Label>
//               <div className="mt-2">
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={(e) =>
//                       e.target.files && handleImageUpload(e.target.files)
//                     }
//                     className="hidden"
//                     id="image-upload"
//                   />
//                   <label htmlFor="image-upload" className="cursor-pointer">
//                     <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <p className="text-lg font-medium text-gray-900">
//                       Upload Images
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Drag and drop or click to select files
//                     </p>
//                   </label>
//                 </div>
//               </div>
//               {errors.images && (
//                 <p className="text-red-500 text-sm mt-1">{errors.images}</p>
//               )}
//             </div>

//             {imageUploads.length > 0 && (
//               <div>
//                 <Label>Image Gallery</Label>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
//                   {imageUploads.map((upload, index) => (
//                     <Card key={index} className="relative">
//                       <CardContent className="p-2">
//                         <div className="relative aspect-square">
//                           <Image
//                             src={upload.preview || "/placeholder.svg"}
//                             alt={`Product image ${index + 1}`}
//                             fill
//                             className="object-cover rounded"
//                           />
//                           {mainImageIndex === index && (
//                             <Badge className="absolute top-1 left-1 bg-green-600">
//                               Main
//                             </Badge>
//                           )}
//                           {upload.uploading && (
//                             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
//                               <Loader2 className="h-6 w-6 text-white animate-spin" />
//                             </div>
//                           )}
//                           {upload.error && (
//                             <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center rounded">
//                               <span className="text-white text-xs">Error</span>
//                             </div>
//                           )}
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
//                           >
//                             <X className="h-3 w-3" />
//                           </button>
//                         </div>
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="sm"
//                           onClick={() => setMainImage(index)}
//                           className="w-full mt-2"
//                           // disabled={mainImageIndex === index || upload.uploading || upload.error}
//                         >
//                           {mainImageIndex === index
//                             ? "Main Image"
//                             : "Set as Main"}
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Pricing & Inventory */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
//               Pricing & Inventory
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <Label htmlFor="price">Regular Price *</Label>
//                 <Input
//                   id="price"
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   value={formData.price}
//                   onChange={(e) => handleInputChange("price", e.target.value)}
//                   className={errors.price ? "border-red-500" : ""}
//                 />
//                 {errors.price && (
//                   <p className="text-red-500 text-sm mt-1">{errors.price}</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="originalPrice">Original Price</Label>
//                 <Input
//                   id="originalPrice"
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   value={formData.originalPrice}
//                   onChange={(e) =>
//                     handleInputChange("originalPrice", e.target.value)
//                   }
//                   placeholder="For showing discounts"
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="stockQuantity">Stock Quantity</Label>
//                 <Input
//                   id="stockQuantity"
//                   type="number"
//                   min="0"
//                   value={formData.stockQuantity}
//                   onChange={(e) =>
//                     handleInputChange("stockQuantity", e.target.value)
//                   }
//                   className={errors.stockQuantity ? "border-red-500" : ""}
//                 />
//                 {errors.stockQuantity && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.stockQuantity}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center space-x-6">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="inStock"
//                   checked={formData.inStock}
//                   onCheckedChange={(checked) =>
//                     handleInputChange("inStock", checked)
//                   }
//                 />
//                 <Label htmlFor="inStock">In Stock</Label>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="onSale"
//                   checked={formData.onSale}
//                   onCheckedChange={(checked) =>
//                     handleInputChange("onSale", checked)
//                   }
//                 />
//                 <Label htmlFor="onSale">On Sale</Label>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="featured"
//                   checked={formData.featured}
//                   onCheckedChange={(checked) =>
//                     handleInputChange("featured", checked)
//                   }
//                 />
//                 <Label htmlFor="featured">Featured Product</Label>
//               </div>
//             </div>

//             {formData.onSale && (
//               <div>
//                 <Label htmlFor="salePrice">Sale Price</Label>
//                 <Input
//                   id="salePrice"
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   value={formData.salePrice}
//                   onChange={(e) =>
//                     handleInputChange("salePrice", e.target.value)
//                   }
//                   className={errors.salePrice ? "border-red-500" : ""}
//                 />
//                 {errors.salePrice && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.salePrice}
//                   </p>
//                 )}
//               </div>
//             )}

//             <div>
//               <Label>Availability Status</Label>
//               <Select
//                 value={formData.availability}
//                 onValueChange={(value) =>
//                   handleInputChange("availability", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="in-stock">In Stock</SelectItem>
//                   <SelectItem value="out-of-stock">Out of Stock</SelectItem>
//                   <SelectItem value="pre-order">Pre-order</SelectItem>
//                   <SelectItem value="discontinued">Discontinued</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
//               Product Details
//             </h3>

//             <div>
//               <Label>Dimensions</Label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
//                 <div>
//                   <Label htmlFor="width">Width</Label>
//                   <Input
//                     id="width"
//                     value={formData.dimensions.width}
//                     onChange={(e) =>
//                       handleDimensionChange("width", e.target.value)
//                     }
//                     placeholder="24 inches"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="height">Height</Label>
//                   <Input
//                     id="height"
//                     value={formData.dimensions.height}
//                     onChange={(e) =>
//                       handleDimensionChange("height", e.target.value)
//                     }
//                     placeholder="36 inches"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="depth">Depth</Label>
//                   <Input
//                     id="depth"
//                     value={formData.dimensions.depth}
//                     onChange={(e) =>
//                       handleDimensionChange("depth", e.target.value)
//                     }
//                     placeholder="2 inches"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="weight">Weight</Label>
//                   <Input
//                     id="weight"
//                     value={formData.dimensions.weight}
//                     onChange={(e) =>
//                       handleDimensionChange("weight", e.target.value)
//                     }
//                     placeholder="8.5 lbs"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <Label>Product Features</Label>
//               <div className="flex gap-2 mt-2">
//                 <Input
//                   value={featureInput}
//                   onChange={(e) => setFeatureInput(e.target.value)}
//                   placeholder="Add a feature"
//                   onKeyPress={(e) =>
//                     e.key === "Enter" && (e.preventDefault(), addFeature())
//                   }
//                 />
//                 <Button type="button" onClick={addFeature}>
//                   Add
//                 </Button>
//               </div>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {formData.features.map((feature, index) => (
//                   <Badge
//                     key={index}
//                     variant="secondary"
//                     className="flex items-center gap-1"
//                   >
//                     {feature}
//                     <button
//                       type="button"
//                       onClick={() => removeFeature(feature)}
//                       className="ml-1 hover:text-red-600"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <Label>Tags</Label>
//               <div className="flex gap-2 mt-2">
//                 <Input
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   placeholder="Add a tag"
//                   onKeyPress={(e) =>
//                     e.key === "Enter" && (e.preventDefault(), addTag())
//                   }
//                 />
//                 <Button type="button" onClick={addTag}>
//                   Add
//                 </Button>
//               </div>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {formData.tags.map((tag, index) => (
//                   <Badge
//                     key={index}
//                     variant="outline"
//                     className="flex items-center gap-1"
//                   >
//                     {tag}
//                     <button
//                       type="button"
//                       onClick={() => removeTag(tag)}
//                       className="ml-1 hover:text-red-600"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="careInstructions">Care Instructions</Label>
//                 <Textarea
//                   id="careInstructions"
//                   value={formData.careInstructions}
//                   onChange={(e) =>
//                     handleInputChange("careInstructions", e.target.value)
//                   }
//                   rows={3}
//                   placeholder="How to care for this product..."
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="warranty">Warranty</Label>
//                 <Input
//                   id="warranty"
//                   value={formData.warranty}
//                   onChange={(e) =>
//                     handleInputChange("warranty", e.target.value)
//                   }
//                   placeholder="1 year limited warranty"
//                 />
//                 <Label htmlFor="shippingInfo" className="mt-2 block">
//                   Shipping Info
//                 </Label>
//                 <Input
//                   id="shippingInfo"
//                   value={formData.shippingInfo}
//                   onChange={(e) =>
//                     handleInputChange("shippingInfo", e.target.value)
//                   }
//                   placeholder="Ships in 3-5 business days"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* SEO & Customization */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
//               SEO & Customization
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="seoTitle">SEO Title</Label>
//                 <Input
//                   id="seoTitle"
//                   value={formData.seoTitle}
//                   onChange={(e) =>
//                     handleInputChange("seoTitle", e.target.value)
//                   }
//                   placeholder="Optimized title for search engines"
//                 />
//                 <p className="text-sm text-gray-500 mt-1">
//                   {formData.seoTitle.length}/60 characters
//                 </p>
//               </div>
//               <div>
//                 <Label htmlFor="seoDescription">SEO Description</Label>
//                 <Textarea
//                   id="seoDescription"
//                   value={formData.seoDescription}
//                   onChange={(e) =>
//                     handleInputChange("seoDescription", e.target.value)
//                   }
//                   rows={2}
//                   placeholder="Meta description for search engines"
//                 />
//                 <p className="text-sm text-gray-500 mt-1">
//                   {formData.seoDescription.length}/160 characters
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="isCustomizable"
//                 checked={formData.isCustomizable}
//                 onCheckedChange={(checked) =>
//                   handleInputChange("isCustomizable", checked)
//                 }
//               />
//               <Label htmlFor="isCustomizable">
//                 This product is customizable
//               </Label>
//             </div>

//             {formData.isCustomizable && (
//               <div>
//                 <Label>Customization Options</Label>
//                 <div className="flex gap-2 mt-2">
//                   <Input
//                     value={customizationInput}
//                     onChange={(e) => setCustomizationInput(e.target.value)}
//                     placeholder="Add customization option"
//                     onKeyPress={(e) =>
//                       e.key === "Enter" &&
//                       (e.preventDefault(), addCustomizationOption())
//                     }
//                   />
//                   <Button type="button" onClick={addCustomizationOption}>
//                     Add
//                   </Button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.customizationOptions.map((option, index) => (
//                     <Badge
//                       key={index}
//                       variant="secondary"
//                       className="flex items-center gap-1"
//                     >
//                       {option}
//                       <button
//                         type="button"
//                         onClick={() => removeCustomizationOption(option)}
//                         className="ml-1 hover:text-red-600"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {errors.submit && (
//             <p className="text-red-500 text-sm">{errors.submit}</p>
//           )}

//           <div className="flex justify-end gap-3 pt-6 border-t">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   {product ? "Updating..." : "Adding..."}
//                 </>
//               ) : product ? (
//                 "Update Product"
//               ) : (
//                 "Add Product"
//               )}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Loader2, Plus, Trash2 } from "lucide-react";
import type {
  Product,
  CustomizationOption,
  ProductImage,
} from "@/types/product";
import Image from "next/image";
// import { isFirebaseConfigured } from "@/lib/firebase";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: () => void;
}

interface ImageUpload {
  file: File;
  preview: string;
  uploading: boolean;
  uploaded: boolean;
  url?: string;
  hash?: string;
  fileName?: string;
  alt?: string;
  error?: string;
}

// Helper function to generate URL slug
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onSave,
}: ProductFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    slug: "",
    category: "",
    tags: [] as string[],
    material: "Glass" as "Glass" | "Wood",
    pricing: {
      originalPrice: "",
      salePrice: "",
      isOnSale: false,
      effectivePrice: "",
      currency: "USD",
    },
    shortDescription: "",
    description: "",
    features: [] as string[],
    dimensions: {
      width: "",
      height: "",
      depth: "",
      weight: "",
    },
    inStock: true,
    stockQuantity: "",
    availability: "in-stock" as
      | "in-stock"
      | "out-of-stock"
      | "pre-order"
      | "discontinued",
    careInstructions: "",
    warranty: "",
    shippingInfo: "",
    isCustomizable: false,
    customizationOptions: [] as CustomizationOption[],
    seo: {
      title: "",
      description: "",
      keywords: [] as string[],
      canonicalUrl: "",
    },
    featured: false,
    status: "active" as "active" | "inactive" | "draft",
    visibility: "public" as "public" | "private",
  });

  const [imageUploads, setImageUploads] = useState<ImageUpload[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Customization option form state
  const [newCustomizationOption, setNewCustomizationOption] =
    useState<CustomizationOption>({
      label: "",
      type: "text",
      values: [],
      required: false,
    });
  const [customizationValueInput, setCustomizationValueInput] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        slug: product.slug,
        category: product.category,
        tags: product.tags || [],
        material: product.material,
        pricing: {
          originalPrice: product.pricing.originalPrice?.toString() || "",
          salePrice: product.pricing.salePrice?.toString() || "",
          isOnSale: product.pricing.isOnSale,
          effectivePrice: product.pricing.effectivePrice.toString(),
          currency: product.pricing.currency,
        },
        shortDescription: product.shortDescription,
        description: product.description,
        features: product.features || [],
        dimensions: {
          width: product.dimensions?.width || "",
          height: product.dimensions?.height || "",
          depth: product.dimensions?.depth || "",
          weight: product.dimensions?.weight || "",
        },
        inStock: product.inStock,
        stockQuantity: product.stockQuantity?.toString() || "",
        availability: product.availability,
        careInstructions: product.careInstructions || "",
        warranty: product.warranty || "",
        shippingInfo: product.shippingInfo || "",
        isCustomizable: product.isCustomizable,
        customizationOptions: product.customizationOptions || [],
        seo: {
          title: product.seo?.title || "",
          description: product.seo?.description || "",
          keywords: product.seo?.keywords || [],
          canonicalUrl: product.seo?.canonicalUrl || "",
        },
        featured: product.featured,
        status: product.status,
        visibility: product.visibility,
      });

      // Convert existing images to upload format for editing
      const existingUploads: ImageUpload[] = product.images.map(
        (img, index) => ({
          file: null as any,
          preview: img.url,
          uploading: false,
          uploaded: true,
          url: img.url,
          hash: img.blurHash,
          alt: img.alt || "",
        })
      );
      setImageUploads(existingUploads);
      setMainImageIndex(0);
    } else {
      // Reset form for new product
      const newSku = `SKU-${Date.now()}`;
      setFormData({
        name: "",
        sku: newSku,
        slug: "",
        category: "",
        tags: [],
        material: "Glass",
        pricing: {
          originalPrice: "",
          salePrice: "",
          isOnSale: false,
          effectivePrice: "",
          currency: "USD",
        },
        shortDescription: "",
        description: "",
        features: [],
        dimensions: {
          width: "",
          height: "",
          depth: "",
          weight: "",
        },
        inStock: true,
        stockQuantity: "",
        availability: "in-stock",
        careInstructions: "",
        warranty: "",
        shippingInfo: "",
        isCustomizable: false,
        customizationOptions: [],
        seo: {
          title: "",
          description: "",
          keywords: [],
          canonicalUrl: "",
        },
        featured: false,
        status: "active",
        visibility: "public",
      });
      setImageUploads([]);
      setMainImageIndex(0);
    }
    setTagInput("");
    setFeatureInput("");
    setKeywordInput("");
    setErrors({});
    setIsSubmitting(false);
  }, [product, open]);

  // Auto-generate slug when name changes
  useEffect(() => {
    if (formData.name && !product) {
      const slug = generateSlug(formData.name);
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.name, product]);

  // Auto-calculate effective price
  useEffect(() => {
    const originalPrice =
      Number.parseFloat(formData.pricing.originalPrice) || 0;
    const salePrice = Number.parseFloat(formData.pricing.salePrice) || 0;

    let effectivePrice = originalPrice;
    if (
      formData.pricing.isOnSale &&
      salePrice > 0 &&
      salePrice < originalPrice
    ) {
      effectivePrice = salePrice;
    }

    if (effectivePrice !== Number.parseFloat(formData.pricing.effectivePrice)) {
      setFormData((prev) => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          effectivePrice: effectivePrice.toString(),
        },
      }));
    }
  }, [
    formData.pricing.originalPrice,
    formData.pricing.salePrice,
    formData.pricing.isOnSale,
  ]);

  const handleImageUpload = async (files: FileList) => {
    const newUploads: ImageUpload[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const preview = URL.createObjectURL(file);
        newUploads.push({
          file,
          preview,
          uploading: true,
          uploaded: false,
          alt: `${formData.name} - Image ${imageUploads.length + i + 1}`,
        });
      }
    }

    setImageUploads((prev) => [...prev, ...newUploads]);

    // Upload images to API
    for (let i = 0; i < newUploads.length; i++) {
      const upload = newUploads[i];
      const uploadIndex = imageUploads.length + i;

      try {
        const formDataUpload = new FormData();
        formDataUpload.append("image", upload.file);

        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formDataUpload,
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || "Upload failed");
        }

        setImageUploads((prev) =>
          prev.map((img, index) =>
            index === uploadIndex
              ? {
                  ...img,
                  uploading: false,
                  uploaded: true,
                  url: result.url,
                  hash: result.hash,
                  fileName: result.fileName,
                }
              : img
          )
        );
      } catch (error) {
        console.error("Upload error:", error);
        const fallbackUrl = URL.createObjectURL(upload.file);

        setImageUploads((prev) =>
          prev.map((img, index) =>
            index === uploadIndex
              ? {
                  ...img,
                  uploading: false,
                  uploaded: true,
                  url: fallbackUrl,
                  hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
                  fileName: `local-${Date.now()}-${upload.file.name}`,
                }
              : img
          )
        );
      }
    }
  };

  const removeImage = (index: number) => {
    setImageUploads((prev) => prev.filter((_, i) => i !== index));
    if (mainImageIndex >= index && mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  const updateImageAlt = (index: number, alt: string) => {
    setImageUploads((prev) =>
      prev.map((img, i) => (i === index ? { ...img, alt } : img))
    );
  };

  const setMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const addFeature = () => {
    if (
      featureInput.trim() &&
      !formData.features.includes(featureInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const addKeyword = () => {
    if (
      keywordInput.trim() &&
      !formData.seo.keywords.includes(keywordInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, keywordInput.trim()],
        },
      }));
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter((k) => k !== keyword),
      },
    }));
  };

  const addCustomizationValue = () => {
    if (
      customizationValueInput.trim() &&
      !newCustomizationOption.values?.includes(customizationValueInput.trim())
    ) {
      setNewCustomizationOption((prev) => ({
        ...prev,
        values: [...(prev.values || []), customizationValueInput.trim()],
      }));
      setCustomizationValueInput("");
    }
  };

  const removeCustomizationValue = (value: string) => {
    setNewCustomizationOption((prev) => ({
      ...prev,
      values: prev.values?.filter((v) => v !== value) || [],
    }));
  };

  const addCustomizationOption = () => {
    if (newCustomizationOption.label.trim()) {
      setFormData((prev) => ({
        ...prev,
        customizationOptions: [
          ...prev.customizationOptions,
          { ...newCustomizationOption },
        ],
      }));
      setNewCustomizationOption({
        label: "",
        type: "text",
        values: [],
        required: false,
      });
    }
  };

  const removeCustomizationOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customizationOptions: prev.customizationOptions.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    }

    if (!formData.pricing.originalPrice.trim()) {
      newErrors.originalPrice = "Original price is required";
    } else if (
      isNaN(Number(formData.pricing.originalPrice)) ||
      Number(formData.pricing.originalPrice) <= 0
    ) {
      newErrors.originalPrice =
        "Original price must be a valid positive number";
    }

    if (formData.pricing.isOnSale && formData.pricing.salePrice) {
      if (
        isNaN(Number(formData.pricing.salePrice)) ||
        Number(formData.pricing.salePrice) <= 0
      ) {
        newErrors.salePrice = "Sale price must be a valid positive number";
      } else if (
        Number(formData.pricing.salePrice) >=
        Number(formData.pricing.originalPrice)
      ) {
        newErrors.salePrice = "Sale price must be less than original price";
      }
    }

    if (imageUploads.length === 0) {
      newErrors.images = "At least one product image is required";
    } else if (imageUploads.some((img) => img.uploading)) {
      newErrors.images = "Please wait for all images to finish uploading";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     const uploadedImages = imageUploads.filter(
  //       (img) => img.uploaded && img.url
  //     );
  //     const mainImage = uploadedImages[mainImageIndex];

  //     // Prepare product images array
  //     const productImages: ProductImage[] = uploadedImages.map((img) => ({
  //       url: img.url!,
  //       blurHash: img.hash || "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
  //       alt: img.alt || `${formData.name} product image`,
  //     }));

  //     const currentUser = "admin-user-123"; // In real app, get from auth context
  //     const now = new Date();

  //     const productData: Partial<Product> = {
  //       name: formData.name.trim(),
  //       sku: formData.sku.trim(),
  //       slug: formData.slug || generateSlug(formData.name),
  //       category: formData.category.trim(),
  //       tags: formData.tags,
  //       material: formData.material,
  //       pricing: {
  //         originalPrice: formData.pricing.originalPrice
  //           ? Number(formData.pricing.originalPrice)
  //           : 0,
  //         salePrice: formData.pricing.salePrice
  //           ? Number(formData.pricing.salePrice)
  //           : 0,
  //         isOnSale: formData.pricing.isOnSale,
  //         effectivePrice: Number(formData.pricing.effectivePrice),
  //         currency: formData.pricing.currency,
  //       },
  //       image: mainImage?.url || "",
  //       images: productImages,
  //       shortDescription: formData.shortDescription.trim(),
  //       description: formData.description.trim(),
  //       features: formData.features,
  //       dimensions: Object.values(formData.dimensions).some((v) => v.trim())
  //         ? formData.dimensions
  //         : undefined,
  //       inStock: formData.inStock,
  //       stockQuantity: formData.stockQuantity
  //         ? Number(formData.stockQuantity)
  //         : 0,
  //       availability: formData.availability,
  //       careInstructions: formData.careInstructions.trim() || undefined,
  //       warranty: formData.warranty.trim() || undefined,
  //       shippingInfo: formData.shippingInfo.trim() || undefined,
  //       isCustomizable: formData.isCustomizable,
  //       customizationOptions: formData.isCustomizable
  //         ? formData.customizationOptions
  //         : undefined,
  //       seo: {
  //         title: formData.seo.title.trim() || undefined,
  //         description: formData.seo.description.trim() || undefined,
  //         keywords:
  //           formData.seo.keywords.length > 0
  //             ? formData.seo.keywords
  //             : undefined,
  //         canonicalUrl: formData.seo.canonicalUrl.trim() || undefined,
  //       },
  //       featured: formData.featured,
  //       status: formData.status,
  //       visibility: formData.visibility,
  //       updatedBy: currentUser,
  //       updatedAt: now,
  //       // Analytics defaults for new products
  //       viewCount: product?.viewCount || 0,
  //       purchaseCount: product?.purchaseCount || 0,
  //       rating: product?.rating || 0,
  //       reviewCount: product?.reviewCount || 0,
  //     };

  //     if (!product) {
  //       // New product
  //       productData.createdBy = currentUser;
  //       productData.createdAt = now;
  //     }

  //     // Save to Firestore or localStorage
  //     // if (isFirebaseConfigured()) {
  //       try {
  //         const { collection, addDoc, updateDoc, doc } = await import(
  //           "firebase/firestore"
  //         );
  //         const { db } = await import("@/lib/firebase");

  //         if (product) {
  //           const productRef = doc(db, "products", product.id);
  //           await updateDoc(productRef, productData);
  //         } else {
  //           await addDoc(collection(db, "products"), productData);
  //         }
  //       } catch (firebaseError) {
  //         console.log(
  //           "Firestore save failed, using localStorage:",
  //           firebaseError
  //         );
  //         saveToLocalStorage(productData);
  //       }
  //     // } else {
  //     //   saveToLocalStorage(productData);
  //     // }

  //     onOpenChange(false);
  //     onSave();
  //   } catch (error) {
  //     console.error("Error saving product:", error);
  //     setErrors({ submit: "Failed to save product. Please try again." });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadedImages = imageUploads.filter(
        (img) => img.uploaded && img.url
      );
      const mainImage = uploadedImages[mainImageIndex];

      // Prepare product images array
      const productImages: ProductImage[] = uploadedImages.map((img) => ({
        url: img.url!,
        blurHash: img.hash || "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
        alt: img.alt || `${formData.name} product image`,
      }));

      const currentUser = "admin-user-123"; // In real app, get from auth context
      const now = new Date();

      // Helper function to remove undefined values from objects
      const removeUndefined = (obj: any): any => {
        if (obj === null || obj === undefined) return obj;
        if (typeof obj !== "object") return obj;
        if (Array.isArray(obj)) return obj.map(removeUndefined);

        const cleaned: any = {};
        for (const [key, value] of Object.entries(obj)) {
          if (value !== undefined) {
            cleaned[key] = removeUndefined(value);
          }
        }
        return cleaned;
      };

      // Build SEO object only with defined values
      const seoData: any = {};
      if (formData.seo.title.trim()) seoData.title = formData.seo.title.trim();
      if (formData.seo.description.trim())
        seoData.description = formData.seo.description.trim();
      if (formData.seo.keywords.length > 0)
        seoData.keywords = formData.seo.keywords;
      if (formData.seo.canonicalUrl.trim())
        seoData.canonicalUrl = formData.seo.canonicalUrl.trim();

      // Build dimensions object only if any values exist
      const dimensionsData: any = {};
      if (formData.dimensions.width.trim())
        dimensionsData.width = formData.dimensions.width.trim();
      if (formData.dimensions.height.trim())
        dimensionsData.height = formData.dimensions.height.trim();
      if (formData.dimensions.depth.trim())
        dimensionsData.depth = formData.dimensions.depth.trim();
      if (formData.dimensions.weight.trim())
        dimensionsData.weight = formData.dimensions.weight.trim();

      const productData: any = {
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        slug: formData.slug || generateSlug(formData.name),
        category: formData.category.trim(),
        tags: formData.tags,
        material: formData.material,
        pricing: {
          originalPrice: formData.pricing.originalPrice
            ? Number(formData.pricing.originalPrice)
            : 0,
          salePrice: formData.pricing.salePrice
            ? Number(formData.pricing.salePrice)
            : 0,
          isOnSale: formData.pricing.isOnSale,
          effectivePrice: Number(formData.pricing.effectivePrice),
          currency: formData.pricing.currency,
        },
        image: mainImage?.url || "",
        images: productImages,
        shortDescription: formData.shortDescription.trim(),
        description: formData.description.trim(),
        features: formData.features,
        inStock: formData.inStock,
        stockQuantity: formData.stockQuantity
          ? Number(formData.stockQuantity)
          : 0,
        availability: formData.availability,
        isCustomizable: formData.isCustomizable,
        featured: formData.featured,
        status: formData.status,
        visibility: formData.visibility,
        updatedBy: currentUser,
        updatedAt: now,
        // Analytics defaults for new products
        viewCount: product?.viewCount || 0,
        purchaseCount: product?.purchaseCount || 0,
        rating: product?.rating || 0,
        reviewCount: product?.reviewCount || 0,
      };

      // Add optional fields only if they have values
      if (Object.keys(dimensionsData).length > 0) {
        productData.dimensions = dimensionsData;
      }

      if (formData.careInstructions.trim()) {
        productData.careInstructions = formData.careInstructions.trim();
      }

      if (formData.warranty.trim()) {
        productData.warranty = formData.warranty.trim();
      }

      if (formData.shippingInfo.trim()) {
        productData.shippingInfo = formData.shippingInfo.trim();
      }

      if (formData.isCustomizable && formData.customizationOptions.length > 0) {
        productData.customizationOptions = formData.customizationOptions;
      }

      if (Object.keys(seoData).length > 0) {
        productData.seo = seoData;
      }

      if (!product) {
        // New product
        productData.createdBy = currentUser;
        productData.createdAt = now;
      }

      // Remove any remaining undefined values as a safety measure
      const cleanProductData = removeUndefined(productData);

      // Save to Firestore or localStorage
      try {
        const { collection, addDoc, updateDoc, doc } = await import(
          "firebase/firestore"
        );
        const { db } = await import("@/lib/firebase");

        if (product) {
          const productRef = doc(db, "products", product.id);
          await updateDoc(productRef, cleanProductData);
        } else {
          await addDoc(collection(db, "products"), cleanProductData);
        }
      } catch (firebaseError) {
        console.log(
          "Firestore save failed, using localStorage:",
          firebaseError
        );
        saveToLocalStorage(cleanProductData);
      }

      onOpenChange(false);
      onSave();
    } catch (error) {
      console.error("Error saving product:", error);
      setErrors({ submit: "Failed to save product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveToLocalStorage = (productData: any) => {
    const products = JSON.parse(localStorage.getItem("demo-products") || "[]");

    if (product) {
      const index = products.findIndex((p: any) => p.id === product.id);
      if (index !== -1) {
        products[index] = { ...productData, id: product.id };
      }
    } else {
      const newProduct = {
        ...productData,
        id: `product_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      products.push(newProduct);
    }

    localStorage.setItem("demo-products", JSON.stringify(products));
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...(prev as any)[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleDimensionChange = (dimension: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [dimension]: value },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    className={errors.sku ? "border-red-500" : ""}
                  />
                  {errors.sku && (
                    <p className="text-red-500 text-sm mt-1">{errors.sku}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="auto-generated-from-name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Material *</Label>
                  <Select
                    value={formData.material}
                    onValueChange={(value: "Glass" | "Wood") =>
                      handleInputChange("material", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Glass">Glass</SelectItem>
                      <SelectItem value="Wood">Wood</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wall-art">Wall Art</SelectItem>
                      <SelectItem value="decorative-panels">
                        Decorative Panels
                      </SelectItem>
                      <SelectItem value="mirrors">Mirrors</SelectItem>
                      <SelectItem value="sculptures">Sculptures</SelectItem>
                      <SelectItem value="custom">Custom Pieces</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    handleInputChange("shortDescription", e.target.value)
                  }
                  rows={2}
                  className={errors.shortDescription ? "border-red-500" : ""}
                />
                {errors.shortDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shortDescription}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="originalPrice">Original Price *</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.pricing.originalPrice}
                    onChange={(e) =>
                      handleInputChange("pricing.originalPrice", e.target.value)
                    }
                    className={errors.originalPrice ? "border-red-500" : ""}
                  />
                  {errors.originalPrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.originalPrice}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="salePrice">Sale Price</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.pricing.salePrice}
                    onChange={(e) =>
                      handleInputChange("pricing.salePrice", e.target.value)
                    }
                    disabled={!formData.pricing.isOnSale}
                    className={errors.salePrice ? "border-red-500" : ""}
                  />
                  {errors.salePrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.salePrice}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="effectivePrice">Effective Price</Label>
                  <Input
                    id="effectivePrice"
                    type="number"
                    step="0.01"
                    value={formData.pricing.effectivePrice}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-sm text-gray-500 mt-1">Auto-calculated</p>
                </div>

                <div>
                  <Label>Currency</Label>
                  <Select
                    value={formData.pricing.currency}
                    onValueChange={(value) =>
                      handleInputChange("pricing.currency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="PKR">PKR (₨)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isOnSale"
                  checked={formData.pricing.isOnSale}
                  onCheckedChange={(checked) =>
                    handleInputChange("pricing.isOnSale", checked)
                  }
                />
                <Label htmlFor="isOnSale">This product is on sale</Label>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files && handleImageUpload(e.target.files)
                    }
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900">
                      Upload Images
                    </p>
                    <p className="text-sm text-gray-500">
                      Drag and drop or click to select files
                    </p>
                  </label>
                </div>
                {errors.images && (
                  <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                )}
              </div>

              {imageUploads.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {imageUploads.map((upload, index) => (
                    <Card key={index} className="relative">
                      <CardContent className="p-4">
                        <div className="relative aspect-square mb-3">
                          <Image
                            src={upload.preview || "/placeholder.svg"}
                            alt={upload.alt || `Product image ${index + 1}`}
                            fill
                            className="object-cover rounded"
                          />
                          {mainImageIndex === index && (
                            <Badge className="absolute top-2 left-2 bg-green-600">
                              Main
                            </Badge>
                          )}
                          {upload.uploading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                              <Loader2 className="h-6 w-6 text-white animate-spin" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <Input
                            placeholder="Alt text for accessibility"
                            value={upload.alt || ""}
                            onChange={(e) =>
                              updateImageAlt(index, e.target.value)
                            }
                            className="text-sm"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setMainImageIndex(index)}
                            className="w-full"
                            disabled={mainImageIndex === index}
                          >
                            {mainImageIndex === index
                              ? "Main Image"
                              : "Set as Main"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing & Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory & Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stockQuantity">Stock Quantity</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      handleInputChange("stockQuantity", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Availability Status</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) =>
                      handleInputChange("availability", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      <SelectItem value="pre-order">Pre-order</SelectItem>
                      <SelectItem value="discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) =>
                      handleInputChange("inStock", checked)
                    }
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      handleInputChange("featured", checked)
                    }
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Visibility</Label>
                  <Select
                    value={formData.visibility}
                    onValueChange={(value) =>
                      handleInputChange("visibility", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Dimensions</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  <div>
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      value={formData.dimensions.width}
                      onChange={(e) =>
                        handleInputChange("dimensions.width", e.target.value)
                      }
                      placeholder="24 inches"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      value={formData.dimensions.height}
                      onChange={(e) =>
                        handleInputChange("dimensions.height", e.target.value)
                      }
                      placeholder="36 inches"
                    />
                  </div>
                  <div>
                    <Label htmlFor="depth">Depth</Label>
                    <Input
                      id="depth"
                      value={formData.dimensions.depth}
                      onChange={(e) =>
                        handleInputChange("dimensions.depth", e.target.value)
                      }
                      placeholder="2 inches"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={formData.dimensions.weight}
                      onChange={(e) =>
                        handleInputChange("dimensions.weight", e.target.value)
                      }
                      placeholder="8.5 lbs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Product Features</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add a feature"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addFeature())
                    }
                  />
                  <Button type="button" onClick={addFeature}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" onClick={addTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="careInstructions">Care Instructions</Label>
                  <Textarea
                    id="careInstructions"
                    value={formData.careInstructions}
                    onChange={(e) =>
                      handleInputChange("careInstructions", e.target.value)
                    }
                    rows={3}
                    placeholder="How to care for this product..."
                  />
                </div>
                <div>
                  <Label htmlFor="warranty">Warranty</Label>
                  <Input
                    id="warranty"
                    value={formData.warranty}
                    onChange={(e) =>
                      handleInputChange("warranty", e.target.value)
                    }
                    placeholder="1 year limited warranty"
                  />
                </div>
                <div>
                  <Label htmlFor="shippingInfo">Shipping Info</Label>
                  <Input
                    id="shippingInfo"
                    value={formData.shippingInfo}
                    onChange={(e) =>
                      handleInputChange("shippingInfo", e.target.value)
                    }
                    placeholder="Ships in 3-5 business days"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customization Options */}
          <Card>
            <CardHeader>
              <CardTitle>Customization Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isCustomizable"
                  checked={formData.isCustomizable}
                  onCheckedChange={(checked) =>
                    handleInputChange("isCustomizable", checked)
                  }
                />
                <Label htmlFor="isCustomizable">
                  This product is customizable
                </Label>
              </div>

              {formData.isCustomizable && (
                <div className="space-y-4">
                  {/* Existing customization options */}
                  {formData.customizationOptions.map((option, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{option.label}</p>
                          <p className="text-sm text-gray-500">
                            Type: {option.type} | Required:{" "}
                            {option.required ? "Yes" : "No"}
                          </p>
                          {option.values && option.values.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {option.values.map((value, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {value}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCustomizationOption(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}

                  {/* Add new customization option */}
                  <Card className="p-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="Option label (e.g., Size, Color)"
                          value={newCustomizationOption.label}
                          onChange={(e) =>
                            setNewCustomizationOption((prev) => ({
                              ...prev,
                              label: e.target.value,
                            }))
                          }
                        />
                        <Select
                          value={newCustomizationOption.type}
                          onValueChange={(
                            value: "text" | "select" | "color" | "upload"
                          ) =>
                            setNewCustomizationOption((prev) => ({
                              ...prev,
                              type: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Input</SelectItem>
                            <SelectItem value="select">Dropdown</SelectItem>
                            <SelectItem value="color">Color Picker</SelectItem>
                            <SelectItem value="upload">File Upload</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={newCustomizationOption.required}
                            onCheckedChange={(checked) =>
                              setNewCustomizationOption((prev) => ({
                                ...prev,
                                required: !!checked,
                              }))
                            }
                          />
                          <Label>Required</Label>
                        </div>
                      </div>

                      {(newCustomizationOption.type === "select" ||
                        newCustomizationOption.type === "color") && (
                        <div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add option value"
                              value={customizationValueInput}
                              onChange={(e) =>
                                setCustomizationValueInput(e.target.value)
                              }
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), addCustomizationValue())
                              }
                            />
                            <Button
                              type="button"
                              onClick={addCustomizationValue}
                            >
                              Add
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {newCustomizationOption.values?.map((value, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                {value}
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeCustomizationValue(value)
                                  }
                                  className="ml-1 hover:text-red-600"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button
                        type="button"
                        onClick={addCustomizationOption}
                        disabled={!newCustomizationOption.label.trim()}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Customization Option
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO & Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seo.title}
                    onChange={(e) =>
                      handleInputChange("seo.title", e.target.value)
                    }
                    placeholder="Optimized title for search engines"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.seo.title.length}/60 characters
                  </p>
                </div>
                <div>
                  <Label htmlFor="canonicalUrl">Canonical URL</Label>
                  <Input
                    id="canonicalUrl"
                    value={formData.seo.canonicalUrl}
                    onChange={(e) =>
                      handleInputChange("seo.canonicalUrl", e.target.value)
                    }
                    placeholder="https://example.com/products/product-name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={formData.seo.description}
                  onChange={(e) =>
                    handleInputChange("seo.description", e.target.value)
                  }
                  rows={2}
                  placeholder="Meta description for search engines"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.seo.description.length}/160 characters
                </p>
              </div>

              <div>
                <Label>SEO Keywords</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="Add SEO keyword"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addKeyword())
                    }
                  />
                  <Button type="button" onClick={addKeyword}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.seo.keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {product ? "Updating..." : "Adding..."}
                </>
              ) : product ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
