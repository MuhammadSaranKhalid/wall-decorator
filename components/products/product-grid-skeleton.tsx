// import { ProductCardSkeleton } from "./product-card-skeleton"
import { ProductCardSkeleton } from "./product-card-skeleton"

interface ProductGridSkeletonProps {
  count?: number
}

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}