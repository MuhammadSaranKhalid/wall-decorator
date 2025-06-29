import Image from "next/image"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Logo with pulse animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#9A7B4F] rounded-full opacity-20 animate-ping"></div>
          <div className="relative bg-white rounded-full p-4 shadow-lg">
            <Image
              src="/wd-logo.png"
              alt="WallDecoratr"
              width={64}
              height={56}
              className="animate-pulse"
              priority
            />
          </div>
        </div>

        {/* Brand name with fade animation */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#4A3F35] animate-fade-in">WallDecoratr</h1>
          <p className="text-sm text-[#9A7B4F] animate-fade-in animation-delay-300">
            Transforming spaces, one wall at a time
          </p>
        </div>

        {/* Loading spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-[#9A7B4F] rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-[#9A7B4F] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#9A7B4F] rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-2 h-2 bg-[#9A7B4F] rounded-full animate-bounce animation-delay-200"></div>
        </div>

        {/* Loading text */}
        <p className="text-sm text-gray-600 animate-pulse">Loading your perfect wall solutions...</p>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border border-[#9A7B4F] rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-[#4A3F35] rounded-full animate-pulse animation-delay-500"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-[#9A7B4F] rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-32 right-10 w-12 h-12 border border-[#4A3F35] rounded-full animate-pulse animation-delay-700"></div>
      </div>
    </div>
  )
}
