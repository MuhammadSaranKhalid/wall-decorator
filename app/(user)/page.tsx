"use client"

import { Hero } from "@/components/home/hero"
import { AboutSection } from "@/components/home/about-section"
import { FeaturedCollections } from "@/components/home/featured-collections"
import { Testimonials } from "@/components/home/testimonials"
import { Newsletter } from "@/components/home/newsletter"

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <AboutSection />
      <FeaturedCollections />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
