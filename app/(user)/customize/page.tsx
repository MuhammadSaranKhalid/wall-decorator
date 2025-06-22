"use client"

import { CustomizeForm } from "@/components/customize/customize-form"

export default function CustomizePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#2E2C2A] mb-4">Create Your Custom Design</h1>
          <p className="text-[#777] text-lg">
            Bring your vision to life with our custom wall decor service. Share your ideas and we'll craft something
            unique just for you.
          </p>
        </div>
        <CustomizeForm />
      </div>
    </div>
  )
}
