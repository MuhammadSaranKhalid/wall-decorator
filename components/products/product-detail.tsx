"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addToCart } from "@/store/slices/cart-slice"
import type { Product } from "@/types/product"
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Minus,
  Plus,
  Palette,
  Ruler,
  Package,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Mock additional images for gallery
  const productImages = [
    product.image,
    "/placeholder.svg?height=600&width=600&text=Angle+2",
    "/placeholder.svg?height=600&width=600&text=Detail+View",
    "/placeholder.svg?height=600&width=600&text=In+Room",
  ]

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      }),
    )
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-white shadow-lg">
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-[#9A7B4F] ring-2 ring-[#9A7B4F]/20"
                    : "border-gray-200 hover:border-[#D1BFA7]"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-[#9A7B4F] hover:bg-[#9A7B4F]">{product.material}</Badge>
              {product.inStock ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold font-serif text-[#2E2C2A] mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "fill-[#9A7B4F] text-[#9A7B4F]" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-[#777]">(24 reviews)</span>
            </div>

            <p className="text-4xl font-bold text-[#9A7B4F] mb-6">${product.price}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-[#777] text-lg leading-relaxed">
              {product.description ||
                "This handcrafted wall decorative piece combines traditional artisan techniques with modern design sensibilities. Each piece is unique and made with premium materials to ensure lasting beauty and quality."}
            </p>
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <Palette className="h-6 w-6 mx-auto mb-2 text-[#9A7B4F]" />
              <p className="text-sm font-medium">Handcrafted</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Ruler className="h-6 w-6 mx-auto mb-2 text-[#9A7B4F]" />
              <p className="text-sm font-medium">Custom Sizes</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Package className="h-6 w-6 mx-auto mb-2 text-[#9A7B4F]" />
              <p className="text-sm font-medium">Premium Quality</p>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-[#4A3F35] hover:bg-[#4A3F35]/90 py-3 text-lg disabled:opacity-50"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3 ${isWishlisted ? "text-red-500 border-red-500" : ""}`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare} className="p-3">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shipping & Returns */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-[#9A7B4F]" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-[#777]">On orders over $100</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-[#9A7B4F]" />
                  <div>
                    <p className="font-medium">Quality Guarantee</p>
                    <p className="text-sm text-[#777]">Handcrafted with premium materials</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-[#9A7B4F]" />
                  <div>
                    <p className="font-medium">30-Day Returns</p>
                    <p className="text-sm text-[#777]">Easy returns and exchanges</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Design CTA */}
          <Card className="bg-gradient-to-r from-[#4A3F35] to-[#9A7B4F] text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Want Something Custom?</h3>
              <p className="mb-4 opacity-90">
                Create a personalized version of this design with your own specifications
              </p>
              <Button asChild variant="secondary" className="bg-white text-[#4A3F35] hover:bg-white/90">
                <Link href="/customize">Customize This Design</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-[#2E2C2A] mb-4">About This Piece</h3>
                  <p className="text-[#777] mb-4">
                    This exquisite wall decorative piece represents the perfect fusion of traditional craftsmanship and
                    contemporary design. Each piece is meticulously handcrafted by skilled artisans using premium{" "}
                    {product.material.toLowerCase()} materials sourced for their exceptional quality and beauty.
                  </p>
                  <p className="text-[#777] mb-4">
                    The unique characteristics of {product.material.toLowerCase()} allow for stunning visual effects
                    that change throughout the day as natural light interacts with the surface. This creates a dynamic
                    focal point that enhances any interior space.
                  </p>
                  <h4 className="text-lg font-semibold text-[#2E2C2A] mb-2">Care Instructions</h4>
                  <ul className="list-disc list-inside text-[#777] space-y-1">
                    <li>Clean gently with a soft, dry cloth</li>
                    <li>Avoid harsh chemicals or abrasive materials</li>
                    <li>Handle with care during installation</li>
                    <li>Professional installation recommended for large pieces</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#2E2C2A] mb-4">Dimensions & Materials</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-[#777]">Material:</dt>
                        <dd className="font-medium">{product.material}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#777]">Dimensions:</dt>
                        <dd className="font-medium">24" x 36" x 2"</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#777]">Weight:</dt>
                        <dd className="font-medium">8.5 lbs</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#777]">Finish:</dt>
                        <dd className="font-medium">Hand-polished</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#777]">Mounting:</dt>
                        <dd className="font-medium">Wall-mounted</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2E2C2A] mb-4">Product Features</h3>
                    <ul className="space-y-2 text-[#777]">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#9A7B4F] rounded-full"></div>
                        Handcrafted by skilled artisans
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#9A7B4F] rounded-full"></div>
                        Premium quality materials
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#9A7B4F] rounded-full"></div>
                        Unique, one-of-a-kind design
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#9A7B4F] rounded-full"></div>
                        Easy wall mounting system
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#9A7B4F] rounded-full"></div>
                        Suitable for indoor use
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-6">
              {/* Reviews Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#9A7B4F] mb-2">4.2</div>
                      <div className="flex items-center justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < 4 ? "fill-[#9A7B4F] text-[#9A7B4F]" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-[#777]">Based on 24 reviews</p>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-8">{stars}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#9A7B4F] h-2 rounded-full"
                              style={{ width: `${stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : 5}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-[#777] w-8">
                            {stars === 5 ? 14 : stars === 4 ? 6 : stars === 3 ? 2 : stars === 2 ? 1 : 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {[
                  {
                    name: "Sarah M.",
                    rating: 5,
                    date: "2 weeks ago",
                    comment:
                      "Absolutely stunning piece! The quality exceeded my expectations and it looks perfect in my living room. The craftsmanship is evident in every detail.",
                  },
                  {
                    name: "Michael R.",
                    rating: 4,
                    date: "1 month ago",
                    comment:
                      "Beautiful wall art that really transforms the space. Shipping was fast and packaging was excellent. Only minor issue was the mounting hardware could be better.",
                  },
                  {
                    name: "Jennifer L.",
                    rating: 5,
                    date: "1 month ago",
                    comment:
                      "This piece is even more beautiful in person. The way it catches the light throughout the day is mesmerizing. Highly recommend!",
                  },
                ].map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-[#9A7B4F] text-[#9A7B4F]" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-[#777]">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#777]">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
