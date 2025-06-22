"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ProductDetail } from "@/components/products/product-detail"
import { RelatedProducts } from "@/components/products/related-products"
import { getProductById, getProducts } from "@/lib/firebase"
import type { Product } from "@/types/product"
import { Loader2 } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        const productId = params.id as string

        // Fetch the main product
        const productData = await getProductById(productId)
        if (!productData) {
          setError("Product not found")
          return
        }
        setProduct(productData)

        // Fetch related products (same material, different products)
        const allProducts = await getProducts()
        const related = allProducts.filter((p) => p.id !== productId && p.material === productData.material).slice(0, 4)
        setRelatedProducts(related)
      } catch (err) {
        setError("Failed to load product")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading product...</span>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#2E2C2A] mb-4">Product Not Found</h1>
        <p className="text-[#777]">{error || "The product you're looking for doesn't exist."}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <ProductDetail product={product} />
      <RelatedProducts products={relatedProducts} currentProductMaterial={product.material} />
    </div>
  )
}
