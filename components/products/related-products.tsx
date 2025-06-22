"use client"

import { ProductCard } from "./product-card"
import type { Product } from "@/types/product"

interface RelatedProductsProps {
  products: Product[]
  currentProductMaterial: string
}

export function RelatedProducts({ products, currentProductMaterial }: RelatedProductsProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-serif text-[#2E2C2A] mb-4">More {currentProductMaterial} Pieces</h2>
        <p className="text-[#777] text-lg">
          Discover other handcrafted {currentProductMaterial.toLowerCase()} wall decorations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
