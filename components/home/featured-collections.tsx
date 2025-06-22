"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export function FeaturedCollections() {
  const collections = [
    {
      title: "Modern Glass Art",
      description: "Contemporary glass pieces that catch and reflect light beautifully",
      image: "/placeholder.svg?height=400&width=600",
      items: "24 items",
    },
    {
      title: "Rustic Wooden Panels",
      description: "Handcrafted wooden wall art with natural textures and warmth",
      image: "/placeholder.svg?height=400&width=600",
      items: "18 items",
    },
    {
      title: "Mixed Media Collection",
      description: "Unique combinations of glass and wood for stunning visual impact",
      image: "/placeholder.svg?height=400&width=600",
      items: "12 items",
    },
  ]

  return (
    <section className="py-20 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#2E2C2A] mb-4">Featured Collections</h2>
          <p className="text-lg text-[#777] max-w-2xl mx-auto">
            Explore our curated collections, each telling its own story through masterful craftsmanship
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-[#2E2C2A]">{collection.title}</h3>
                    <span className="text-sm text-[#9A7B4F] font-medium">{collection.items}</span>
                  </div>
                  <p className="text-[#777] mb-4">{collection.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-[#9A7B4F] text-[#9A7B4F] hover:bg-[#9A7B4F] hover:text-white"
                  >
                    View Collection
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-[#4A3F35] hover:bg-[#4A3F35]/90">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
