// "use client"

// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import type { Product } from "@/types/product"
// import { useDispatch } from "react-redux"
// import { addToCart } from "@/store/slices/cart-slice"
// import { ShoppingCart } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"

// interface ProductCardProps {
//   product: Product
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const dispatch = useDispatch()

//   const handleAddToCart = () => {
//     dispatch(
//       addToCart({
//         id: product.id,
//         name: product.name,
//         price: product.pricing.effectivePrice,
//         image: product.image,
//         quantity: 1,
//       }),
//     )
//   }

//   const formatPrice = (price: number, currency: string) => {
//     const symbol = currency === "USD" ? "$" : currency === "PKR" ? "₨" : ""
//     return `${symbol}${price}`
//   }

//   return (
//     <Link href={`/products/${product.id}`}>
//       <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white h-full">
//         <CardContent className="p-0 flex flex-col h-full">
//           <div className="relative aspect-square overflow-hidden rounded-t-lg">
//             <Image
//               src={product.image || "/placeholder.svg"}
//               alt={product.name}
//               fill
//               className="object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//             <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#9A7B4F] hover:bg-[#9A7B4F] text-xs">
//               {product.material}
//             </Badge>

//             {product.featured && (
//               <Badge className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-yellow-500 hover:bg-yellow-500 text-xs">
//                 Featured
//               </Badge>
//             )}

//             {product.pricing.isOnSale && (
//               <Badge className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-red-500 hover:bg-red-500 text-xs">
//                 Sale
//               </Badge>
//             )}

//             {!product.inStock && (
//               <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                 <Badge variant="destructive" className="text-xs">
//                   Out of Stock
//                 </Badge>
//               </div>
//             )}
//           </div>

//           <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-1">
//             <h3 className="font-semibold text-[#2E2C2A] mb-1 sm:mb-2 line-clamp-2 text-sm sm:text-base leading-tight">
//               {product.name}
//             </h3>
//             <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 flex-1">
//               {product.shortDescription}
//             </p>

//             <div className="mb-2 sm:mb-4">
//               {product.pricing.isOnSale && product.pricing.originalPrice ? (
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//                   <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-600 leading-none">
//                     {formatPrice(product.pricing.effectivePrice, product.pricing.currency)}
//                   </span>
//                   <span className="text-xs sm:text-sm text-gray-500 line-through">
//                     {formatPrice(product.pricing.originalPrice, product.pricing.currency)}
//                   </span>
//                 </div>
//               ) : (
//                 <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#9A7B4F] leading-none">
//                   {formatPrice(product.pricing.effectivePrice, product.pricing.currency)}
//                 </span>
//               )}
//             </div>

//             <Button
//               onClick={(e) => {
//                 e.preventDefault()
//                 e.stopPropagation()
//                 handleAddToCart()
//               }}
//               disabled={!product.inStock}
//               className="w-full bg-[#4A3F35] hover:bg-[#4A3F35]/90 disabled:opacity-50 text-xs sm:text-sm py-2 sm:py-2.5"
//             >
//               <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
//               {product.inStock ? "Add to Cart" : "Out of Stock"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   )
// }

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BlurhashCanvas } from "react-blurhash";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === "USD" ? "$" : currency === "PKR" ? "₨" : "";
    return `${symbol}${price}`;
  };

  // Get blurhash from the first image or use a default
  const blurhash =
    product.images?.[0]?.blurHash || "LKO2?U%2Tw=w]~RBVZRi};RPxuwH";

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white h-full">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            {!imageLoaded && (
              <BlurhashCanvas
                hash={blurhash}
                width={400}
                height={400}
                className="absolute inset-0 w-full h-full"
              />
            )}
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#9A7B4F] hover:bg-[#9A7B4F] text-xs z-10">
              {product.material}
            </Badge>

            {product.featured && (
              <Badge className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-yellow-500 hover:bg-yellow-500 text-xs z-10">
                Featured
              </Badge>
            )}

            {product.pricing.isOnSale && (
              <Badge className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-red-500 hover:bg-red-500 text-xs z-10">
                Sale
              </Badge>
            )}

            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-[#2E2C2A] mb-1 sm:mb-2 line-clamp-2 text-sm sm:text-base leading-tight">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 flex-1">
              {product.shortDescription}
            </p>

            <div className="mb-2 sm:mb-4">
              {product.pricing.isOnSale && product.pricing.originalPrice ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-600 leading-none">
                    {formatPrice(
                      product.pricing.effectivePrice,
                      product.pricing.currency
                    )}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    {formatPrice(
                      product.pricing.originalPrice,
                      product.pricing.currency
                    )}
                  </span>
                </div>
              ) : (
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#9A7B4F] leading-none">
                  {formatPrice(
                    product.pricing.effectivePrice,
                    product.pricing.currency
                  )}
                </span>
              )}
            </div>

            <Button
              onClick={() => router.push(`/products/${product.id}`)}
              variant="outline"
              className="w-full border-[#4A3F35] text-[#4A3F35] hover:bg-[#4A3F35] hover:text-white text-xs sm:text-sm py-2 sm:py-2.5"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
