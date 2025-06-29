import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <Card className="border-0 bg-white h-full">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Image skeleton */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Skeleton className="w-full h-full" />
          {/* Badge skeletons */}
          <Skeleton className="absolute top-2 sm:top-3 left-2 sm:left-3 h-5 w-12 rounded-full" />
          <Skeleton className="absolute top-2 sm:top-3 right-2 sm:right-3 h-5 w-16 rounded-full" />
        </div>

        <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-1">
          {/* Title skeleton */}
          <div className="mb-1 sm:mb-2">
            <Skeleton className="h-4 sm:h-5 w-full mb-1" />
            <Skeleton className="h-4 sm:h-5 w-3/4" />
          </div>

          {/* Description skeleton */}
          <div className="mb-2 sm:mb-3 flex-1">
            <Skeleton className="h-3 sm:h-4 w-full mb-1" />
            <Skeleton className="h-3 sm:h-4 w-5/6" />
          </div>

          {/* Price skeleton */}
          <div className="mb-2 sm:mb-4">
            <Skeleton className="h-6 sm:h-7 md:h-8 w-20 sm:w-24" />
          </div>

          {/* Button skeleton */}
          <Skeleton className="w-full h-8 sm:h-9 md:h-10 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}
