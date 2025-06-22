"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#F8F6F3] to-[#D1BFA7]/20 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold font-serif text-[#2E2C2A] leading-tight">
              Transform Your Walls with
              <span className="text-[#9A7B4F]"> Artisan Crafted</span> Decor
            </h1>
            <p className="text-lg text-[#777] leading-relaxed">
              Discover our exclusive collection of handcrafted wall decorative items made from premium glass and wood.
              Each piece tells a story of craftsmanship and elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#4A3F35] hover:bg-[#4A3F35]/90 text-white px-8 py-3 rounded-lg">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#9A7B4F] text-[#9A7B4F] hover:bg-[#9A7B4F] hover:text-white px-8 py-3 rounded-lg"
              >
                <Link href="/customize">Customize Yours</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero.png?height=600&width=600"
                alt="Beautiful wall decor showcase"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#9A7B4F] rounded-full opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#D1BFA7] rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
