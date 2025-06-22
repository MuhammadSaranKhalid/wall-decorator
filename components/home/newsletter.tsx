"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-20 bg-gradient-to-r from-[#4A3F35] to-[#9A7B4F]">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-white mb-4">Stay Updated</h2>
          <p className="text-lg text-white/90 mb-8">
            Subscribe to our newsletter for exclusive offers, new collection launches, and design inspiration.
          </p>

          {isSubscribed ? (
            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-white text-lg">Thank you for subscribing! 🎉</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button type="submit" className="bg-white text-[#4A3F35] hover:bg-white/90">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
