"use client"

import { CustomizeForm } from "@/components/customize/customize-form"

export default function CustomizePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F6F3]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#2E2C2A] mb-6 leading-tight">Bring Your Vision to Life</h1>
            <p className="text-[#777] text-xl leading-relaxed max-w-3xl mx-auto">
              Create something truly unique with our custom wall decor service. Our expert designers will work with you
              to transform your ideas into stunning, personalized art pieces that perfectly complement your space.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[#E5E5E5]">
              <div className="w-16 h-16 bg-[#F8F6F3] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4A3F35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#2E2C2A] mb-2">Expert Design</h3>
              <p className="text-[#777] text-sm">
                Professional designers with years of experience in custom wall art creation
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[#E5E5E5]">
              <div className="w-16 h-16 bg-[#F8F6F3] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4A3F35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#2E2C2A] mb-2">Premium Materials</h3>
              <p className="text-[#777] text-sm">
                High-quality materials including canvas, metal, wood, and acrylic options
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[#E5E5E5]">
              <div className="w-16 h-16 bg-[#F8F6F3] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4A3F35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#2E2C2A] mb-2">Fast Turnaround</h3>
              <p className="text-[#777] text-sm">
                Quick response times with most custom pieces completed within 1-2 weeks
              </p>
            </div>
          </div>

          {/* Main Form */}
          <CustomizeForm />
        </div>
      </div>
    </div>
  )
}
