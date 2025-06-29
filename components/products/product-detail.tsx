// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { addToCart } from "@/store/slices/cart-slice";
// import type { Product } from "@/types/product";
// import {
//   ShoppingCart,
//   Heart,
//   Share2,
//   Truck,
//   Shield,
//   RotateCcw,
//   Star,
//   Minus,
//   Plus,
//   CheckCircle,
//   XCircle,
//   Package,
//   Ruler,
//   Tag,
//   Info,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// interface ProductDetailProps {
//   product: Product;
// }

// export function ProductDetail({ product }: ProductDetailProps) {
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [touchStart, setTouchStart] = useState<number | null>(null);
//   const [touchEnd, setTouchEnd] = useState<number | null>(null);

//   // Use product images or fallback to main image
//   const productImages =
//     product.images.length > 0
//       ? product.images.map((img) => img.url)
//       : [product.image, product.image, product.image, product.image];

//   const handleAddToCart = () => {
//     dispatch(
//       addToCart({
//         id: product.id,
//         name: product.name,
//         price: product.pricing.effectivePrice,
//         image: product.image,
//         quantity: quantity,
//       })
//     );
//   };

//   const handleQuantityChange = (change: number) => {
//     const newQuantity = quantity + change;
//     const maxQuantity = product.stockQuantity || 10;
//     if (newQuantity >= 1 && newQuantity <= maxQuantity) {
//       setQuantity(newQuantity);
//     }
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: product.name,
//           text: product.shortDescription,
//           url: window.location.href,
//         });
//       } catch (err) {
//         console.log("Error sharing:", err);
//       }
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(window.location.href);
//     }
//   };

//   const formatPrice = (price: number, currency: string) => {
//     const symbol = currency === "USD" ? "$" : currency === "PKR" ? "₨" : "";
//     return `${symbol}${price.toFixed(2)}`;
//   };

//   const getAvailabilityBadge = () => {
//     switch (product.availability) {
//       case "in-stock":
//         return (
//           <Badge variant="outline" className="text-green-600 border-green-600">
//             In Stock
//           </Badge>
//         );
//       case "out-of-stock":
//         return <Badge variant="destructive">Out of Stock</Badge>;
//       case "pre-order":
//         return (
//           <Badge variant="outline" className="text-blue-600 border-blue-600">
//             Pre-order
//           </Badge>
//         );
//       case "discontinued":
//         return (
//           <Badge variant="outline" className="text-gray-600 border-gray-600">
//             Discontinued
//           </Badge>
//         );
//       default:
//         return null;
//     }
//   };

//   // Navigation functions for image carousel
//   const goToPreviousImage = () => {
//     setSelectedImage((prev) =>
//       prev === 0 ? productImages.length - 1 : prev - 1
//     );
//   };

//   const goToNextImage = () => {
//     setSelectedImage((prev) =>
//       prev === productImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   // Keyboard navigation
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "ArrowLeft") {
//       goToPreviousImage();
//     } else if (e.key === "ArrowRight") {
//       goToNextImage();
//     }
//   };

//   // Touch/swipe handling for mobile
//   const minSwipeDistance = 50;

//   const onTouchStart = (e: React.TouchEvent) => {
//     setTouchEnd(null);
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const onTouchMove = (e: React.TouchEvent) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;

//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > minSwipeDistance;
//     const isRightSwipe = distance < -minSwipeDistance;

//     if (isLeftSwipe && productImages.length > 1) {
//       goToNextImage();
//     }
//     if (isRightSwipe && productImages.length > 1) {
//       goToPreviousImage();
//     }
//   };

//   // Prevent body scroll on mobile when swiping images
//   useEffect(() => {
//     const preventDefault = (e: TouchEvent) => {
//       if (e.target && (e.target as Element).closest(".image-carousel")) {
//         e.preventDefault();
//       }
//     };

//     document.addEventListener("touchmove", preventDefault, { passive: false });
//     return () => document.removeEventListener("touchmove", preventDefault);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#F8F6F3]">
//       {/* Mobile-optimized container */}
//       <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
//         {/* Mobile: Single column, Desktop: Two columns */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
//           {/* Product Images - Mobile optimized */}
//           <div className="space-y-3 sm:space-y-4">
//             {/* Main Image with Touch Support */}
//             <div
//               className="image-carousel aspect-square relative rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-lg group"
//               onKeyDown={handleKeyDown}
//               onTouchStart={onTouchStart}
//               onTouchMove={onTouchMove}
//               onTouchEnd={onTouchEnd}
//               tabIndex={0}
//             >
//               {/* <Image
//                 src={productImages[selectedImage] || "/placeholder.svg"}
//                 alt={product.images[selectedImage]?.alt || product.name}
//                 // fill
//                 // className="object-cover"
//                               layout="responsive" 
//                                 width={500} // You can adjust the width based on your desired size
//                   height={500} // Adjust the height accordingly
//                 priority
//               /> */}
//               <div className="relative w-full h-full flex items-center justify-center">
//                 <Image
//                   src={productImages[selectedImage] || "/placeholder.svg"}
//                   alt={product.images[selectedImage]?.alt || product.name}
//                   layout="responsive" // keeps the image's natural aspect ratio
//                   width={500} // You can adjust the width based on your desired size
//                   height={500} // Adjust the height accordingly
//                   priority
//                 />
//               </div>

//               {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
//               {productImages.length > 1 && (
//                 <>
//                   {/* Left Arrow - Desktop only */}
//                   <button
//                     onClick={goToPreviousImage}
//                     className="hidden sm:block absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
//                     aria-label="Previous image"
//                   >
//                     <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
//                   </button>

//                   {/* Right Arrow - Desktop only */}
//                   <button
//                     onClick={goToNextImage}
//                     className="hidden sm:block absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
//                     aria-label="Next image"
//                   >
//                     <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
//                   </button>

//                   {/* Image Counter */}
//                   <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
//                     {selectedImage + 1} / {productImages.length}
//                   </div>
//                 </>
//               )}

//               {/* Overlay badges */}
//               {!product.inStock && (
//                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                   <Badge
//                     variant="destructive"
//                     className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2"
//                   >
//                     Out of Stock
//                   </Badge>
//                 </div>
//               )}

//               {product.pricing.isOnSale && (
//                 <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-red-500 hover:bg-red-500 text-xs sm:text-sm">
//                   Sale
//                 </Badge>
//               )}
//               {product.featured && (
//                 <Badge className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-500 hover:bg-yellow-500 text-xs sm:text-sm">
//                   Featured
//                 </Badge>
//               )}
//             </div>

//             {/* Image Thumbnails - Responsive grid */}
//             <div className="grid grid-cols-4 gap-2 sm:gap-3">
//               {productImages.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`aspect-square relative rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${
//                     selectedImage === index
//                       ? "border-[#9A7B4F] ring-1 sm:ring-2 ring-[#9A7B4F]/20"
//                       : "border-gray-200 hover:border-[#D1BFA7]"
//                   }`}
//                 >
//                   <Image
//                     src={image || "/placeholder.svg"}
//                     alt={
//                       product.images[index]?.alt ||
//                       `${product.name} view ${index + 1}`
//                     }
//                     fill
//                     className="object-cover"
//                   />
//                   {/* Thumbnail indicator */}
//                   {selectedImage === index && (
//                     <div className="absolute inset-0 bg-[#9A7B4F]/10 flex items-center justify-center">
//                       <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#9A7B4F] rounded-full"></div>
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* Navigation Dots for Mobile */}
//             {productImages.length > 1 && (
//               <div className="flex justify-center gap-2 sm:hidden">
//                 {productImages.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`w-2 h-2 rounded-full transition-colors ${
//                       selectedImage === index ? "bg-[#9A7B4F]" : "bg-gray-300"
//                     }`}
//                     aria-label={`Go to image ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Information - Mobile optimized */}
//           <div className="space-y-4 sm:space-y-6">
//             {/* Header */}
//             <div>
//               {/* Mobile: Stack badges vertically, Desktop: Horizontal */}
//               <div className="flex flex-wrap items-center gap-2 mb-3">
//                 <Badge className="bg-[#9A7B4F] hover:bg-[#9A7B4F] text-xs sm:text-sm">
//                   {product.material}
//                 </Badge>
//                 {getAvailabilityBadge()}
//                 <Badge variant="outline" className="text-xs sm:text-sm">
//                   {product.category
//                     .replace("-", " ")
//                     .replace(/\b\w/g, (l) => l.toUpperCase())}
//                 </Badge>
//               </div>

//               {/* Mobile: Smaller title, Desktop: Large title */}
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#2E2C2A] mb-2 sm:mb-4 leading-tight">
//                 {product.name}
//               </h1>
//               <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
//                 SKU: {product.sku}
//               </p>

//               {/* Rating - Mobile optimized */}
//               <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`h-4 w-4 sm:h-5 sm:w-5 ${
//                           i < Math.floor(product.rating)
//                             ? "fill-[#9A7B4F] text-[#9A7B4F]"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-[#777] text-sm">
//                     ({product.reviewCount})
//                   </span>
//                 </div>
//                 <span className="text-xs sm:text-sm text-gray-500">
//                   {product.viewCount} views
//                 </span>
//               </div>

//               {/* Pricing - Mobile optimized */}
//               <div className="mb-4 sm:mb-6">
//                 {product.pricing.isOnSale && product.pricing.originalPrice ? (
//                   <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
//                     <span className="text-3xl sm:text-4xl font-bold text-red-600">
//                       {formatPrice(
//                         product.pricing.effectivePrice,
//                         product.pricing.currency
//                       )}
//                     </span>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xl sm:text-2xl text-gray-500 line-through">
//                         {formatPrice(
//                           product.pricing.originalPrice,
//                           product.pricing.currency
//                         )}
//                       </span>
//                       <Badge className="bg-red-500 hover:bg-red-500 text-xs">
//                         Save{" "}
//                         {formatPrice(
//                           product.pricing.originalPrice -
//                             product.pricing.effectivePrice,
//                           product.pricing.currency
//                         )}
//                       </Badge>
//                     </div>
//                   </div>
//                 ) : (
//                   <span className="text-3xl sm:text-4xl font-bold text-[#9A7B4F]">
//                     {formatPrice(
//                       product.pricing.effectivePrice,
//                       product.pricing.currency
//                     )}
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Short Description */}
//             <div>
//               <p className="text-[#777] text-base sm:text-lg leading-relaxed">
//                 {product.shortDescription}
//               </p>
//             </div>

//             {/* Quantity and Add to Cart - Mobile optimized */}
//             <div className="space-y-4">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
//                 <span className="font-medium text-sm sm:text-base">
//                   Quantity:
//                 </span>
//                 <div className="flex items-center justify-between sm:justify-start">
//                   <div className="flex items-center border rounded-lg">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleQuantityChange(-1)}
//                       disabled={quantity <= 1}
//                       className="h-10 w-10 sm:h-10 sm:w-10"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
//                       {quantity}
//                     </span>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleQuantityChange(1)}
//                       disabled={quantity >= (product.stockQuantity || 10)}
//                       className="h-10 w-10 sm:h-10 sm:w-10"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                   {product.stockQuantity && (
//                     <span className="text-xs sm:text-sm text-gray-500 ml-3 sm:ml-0">
//                       Max: {product.stockQuantity}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Mobile: Stack buttons vertically, Desktop: Horizontal */}
//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//                 <Button
//                   onClick={handleAddToCart}
//                   disabled={
//                     !product.inStock || product.availability === "discontinued"
//                   }
//                   className="flex-1 bg-[#4A3F35] hover:bg-[#4A3F35]/90 py-3 sm:py-3 text-base sm:text-lg disabled:opacity-50 order-1"
//                 >
//                   <ShoppingCart className="h-5 w-5 mr-2" />
//                   {product.inStock ? "Add to Cart" : "Out of Stock"}
//                 </Button>

//                 {/* Mobile: Horizontal row for secondary actions */}
//                 <div className="flex gap-3 sm:gap-0 order-2 sm:order-none">
//                   {/* <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => setIsWishlisted(!isWishlisted)}
//                     className={`flex-1 sm:flex-none p-3 ${
//                       isWishlisted ? "text-red-500 border-red-500" : ""
//                     }`}
//                   >
//                     <Heart
//                       className={`h-5 w-5 ${
//                         isWishlisted ? "fill-current" : ""
//                       }`}
//                     />
//                     <span className="ml-2 sm:hidden">Wishlist</span>
//                   </Button> */}
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={handleShare}
//                     className="flex-1 sm:flex-none p-3"
//                   >
//                     <Share2 className="h-5 w-5" />
//                     <span className="ml-2 sm:hidden">Share</span>
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Shipping & Returns - Mobile optimized */}
//             <Card>
//               <CardContent className="p-4">
//                 <div className="space-y-3">
//                   <div className="flex items-start gap-3">
//                     <Truck className="h-5 w-5 text-[#9A7B4F] flex-shrink-0 mt-0.5" />
//                     <div className="min-w-0">
//                       <p className="font-medium text-sm sm:text-base">
//                         Shipping Info
//                       </p>
//                       <p className="text-xs sm:text-sm text-[#777] break-words">
//                         {product.shippingInfo || "Standard shipping available"}
//                       </p>
//                     </div>
//                   </div>
//                   {product.warranty && (
//                     <>
//                       <Separator />
//                       <div className="flex items-start gap-3">
//                         <Shield className="h-5 w-5 text-[#9A7B4F] flex-shrink-0 mt-0.5" />
//                         <div className="min-w-0">
//                           <p className="font-medium text-sm sm:text-base">
//                             Warranty
//                           </p>
//                           <p className="text-xs sm:text-sm text-[#777] break-words">
//                             {product.warranty}
//                           </p>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   {/* <Separator />
//                   <div className="flex items-start gap-3">
//                     <RotateCcw className="h-5 w-5 text-[#9A7B4F] flex-shrink-0 mt-0.5" />
//                     <div className="min-w-0">
//                       <p className="font-medium text-sm sm:text-base">
//                         30-Day Returns
//                       </p>
//                       <p className="text-xs sm:text-sm text-[#777]">
//                         Easy returns and exchanges
//                       </p>
//                     </div>
//                   </div> */}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Customization CTA - Mobile optimized */}
//             {product.isCustomizable && (
//               <Card className="bg-gradient-to-r from-[#4A3F35] to-[#9A7B4F] text-white">
//                 <CardContent className="p-4 sm:p-6 text-center">
//                   <h3 className="text-lg sm:text-xl font-semibold mb-2">
//                     Customizable Product
//                   </h3>
//                   <p className="mb-4 opacity-90 text-sm sm:text-base">
//                     This product can be customized to your specifications
//                   </p>
//                   <Button
//                     asChild
//                     variant="secondary"
//                     className="bg-white text-[#4A3F35] hover:bg-white/90 w-full sm:w-auto"
//                   >
//                     <Link href={`/customize/${product.id}`}>
//                       Customize This Product
//                     </Link>
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Custom Design CTA - Always shown */}
//             <Card className="bg-gradient-to-r from-[#4A3F35] to-[#9A7B4F] text-white">
//               <CardContent className="p-4 sm:p-6 text-center">
//                 <h3 className="text-lg sm:text-xl font-semibold mb-2">
//                   Want Something Custom?
//                 </h3>
//                 <p className="mb-4 opacity-90 text-sm sm:text-base">
//                   Create a personalized version of this design with your own
//                   specifications
//                 </p>
//                 <Button
//                   asChild
//                   variant="secondary"
//                   className="bg-white text-[#4A3F35] hover:bg-white/90 w-full sm:w-auto"
//                 >
//                   <Link href="/customize">Customize This Design</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Product Details Tabs - Mobile optimized */}
//         <div className="mt-8 sm:mt-16">
//           <Tabs defaultValue="details" className="w-full">
//             {/* Mobile: Smaller tabs */}
//             <TabsList className="grid w-full grid-cols-2 h-auto">
//               <TabsTrigger
//                 value="details"
//                 className="text-sm sm:text-base py-2 sm:py-3"
//               >
//                 Product Details
//               </TabsTrigger>
//               <TabsTrigger
//                 value="reviews"
//                 className="text-sm sm:text-base py-2 sm:py-3"
//               >
//                 Reviews ({product.reviewCount})
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="details" className="mt-4 sm:mt-8">
//               <div className="space-y-4 sm:space-y-6">
//                 {/* Long Description */}
//                 <Card>
//                   <CardContent className="p-4 sm:p-6">
//                     <div className="flex items-center gap-3 mb-3 sm:mb-4">
//                       <Info className="h-5 w-5 text-[#9A7B4F]" />
//                       <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">
//                         About This Product
//                       </h3>
//                     </div>
//                     <p className="text-[#777] leading-relaxed text-sm sm:text-base">
//                       {product.description}
//                     </p>
//                   </CardContent>
//                 </Card>

//                 {/* Key Features */}
//                 {product.features && product.features.length > 0 && (
//                   <Card>
//                     <CardContent className="p-4 sm:p-6">
//                       <div className="flex items-center gap-3 mb-3 sm:mb-4">
//                         <CheckCircle className="h-5 w-5 text-green-600" />
//                         <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">
//                           Key Features
//                         </h3>
//                       </div>
//                       {/* Mobile: Single column, Desktop: Two columns */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
//                         {product.features.map((feature, index) => (
//                           <div
//                             key={index}
//                             className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
//                           >
//                             <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
//                             <span className="text-[#2E2C2A] text-sm sm:text-base">
//                               {feature}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )}

//                 {/* Specifications */}
//                 <Card>
//                   <CardContent className="p-4 sm:p-6">
//                     <div className="flex items-center gap-3 mb-3 sm:mb-4">
//                       <Package className="h-5 w-5 text-[#9A7B4F]" />
//                       <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">
//                         Specifications
//                       </h3>
//                     </div>
//                     {/* Mobile: Single column, Desktop: Two columns */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                       <div>
//                         <h4 className="font-medium text-[#2E2C2A] mb-3 text-sm sm:text-base">
//                           Product Information
//                         </h4>
//                         <div className="space-y-2">
//                           <div className="flex justify-between py-2 border-b border-gray-100">
//                             <span className="text-[#777] text-sm sm:text-base">
//                               Material:
//                             </span>
//                             <span className="font-medium text-sm sm:text-base">
//                               {product.material}
//                             </span>
//                           </div>
//                           <div className="flex justify-between py-2 border-b border-gray-100">
//                             <span className="text-[#777] text-sm sm:text-base">
//                               Category:
//                             </span>
//                             <span className="font-medium text-sm sm:text-base">
//                               {product.category
//                                 .replace("-", " ")
//                                 .replace(/\b\w/g, (l) => l.toUpperCase())}
//                             </span>
//                           </div>
//                           <div className="flex justify-between py-2 border-b border-gray-100">
//                             <span className="text-[#777] text-sm sm:text-base">
//                               SKU:
//                             </span>
//                             <span className="font-mono text-xs sm:text-sm break-all">
//                               {product.sku}
//                             </span>
//                           </div>
//                           <div className="flex justify-between py-2">
//                             <span className="text-[#777] text-sm sm:text-base">
//                               Customizable:
//                             </span>
//                             <span className="font-medium text-sm sm:text-base">
//                               {product.isCustomizable ? "Yes" : "No"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <div>
//                         <h4 className="font-medium text-[#2E2C2A] mb-3 text-sm sm:text-base">
//                           Availability
//                         </h4>
//                         <div className="space-y-2">
//                           <div className="flex justify-between py-2 border-b border-gray-100">
//                             <span className="text-[#777] text-sm sm:text-base">
//                               Status:
//                             </span>
//                             <span className="font-medium capitalize text-sm sm:text-base">
//                               {product.availability.replace("-", " ")}
//                             </span>
//                           </div>
//                           <div className="flex justify-between py-2 border-b border-gray-100">
//                             <span className="text-[#777] text-sm sm:text-base">
//                               In Stock:
//                             </span>
//                             <div className="flex items-center gap-2">
//                               {product.inStock ? (
//                                 <CheckCircle className="h-4 w-4 text-green-600" />
//                               ) : (
//                                 <XCircle className="h-4 w-4 text-red-600" />
//                               )}
//                               <span
//                                 className={`font-medium text-sm sm:text-base ${
//                                   product.inStock
//                                     ? "text-green-600"
//                                     : "text-red-600"
//                                 }`}
//                               >
//                                 {product.inStock ? "Yes" : "No"}
//                               </span>
//                             </div>
//                           </div>
//                           {product.stockQuantity && (
//                             <div className="flex justify-between py-2">
//                               <span className="text-[#777] text-sm sm:text-base">
//                                 Quantity Available:
//                               </span>
//                               <span className="font-medium text-sm sm:text-base">
//                                 {product.stockQuantity} units
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Dimensions */}
//                 {product.dimensions &&
//                   Object.values(product.dimensions).some((v) => v) && (
//                     <Card>
//                       <CardContent className="p-4 sm:p-6">
//                         <div className="flex items-center gap-3 mb-3 sm:mb-4">
//                           <Ruler className="h-5 w-5 text-[#9A7B4F]" />
//                           <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">
//                             Dimensions
//                           </h3>
//                         </div>
//                         {/* Mobile: 2 columns, Desktop: 4 columns */}
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
//                           {product.dimensions.width && (
//                             <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
//                               <p className="text-xs sm:text-sm text-[#777] mb-1">
//                                 Width
//                               </p>
//                               <p className="font-medium text-sm sm:text-base">
//                                 {product.dimensions.width}
//                               </p>
//                             </div>
//                           )}
//                           {product.dimensions.height && (
//                             <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
//                               <p className="text-xs sm:text-sm text-[#777] mb-1">
//                                 Height
//                               </p>
//                               <p className="font-medium text-sm sm:text-base">
//                                 {product.dimensions.height}
//                               </p>
//                             </div>
//                           )}
//                           {product.dimensions.depth && (
//                             <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
//                               <p className="text-xs sm:text-sm text-[#777] mb-1">
//                                 Depth
//                               </p>
//                               <p className="font-medium text-sm sm:text-base">
//                                 {product.dimensions.depth}
//                               </p>
//                             </div>
//                           )}
//                           {product.dimensions.weight && (
//                             <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
//                               <p className="text-xs sm:text-sm text-[#777] mb-1">
//                                 Weight
//                               </p>
//                               <p className="font-medium text-sm sm:text-base">
//                                 {product.dimensions.weight}
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                 {/* Tags */}
//                 {product.tags && product.tags.length > 0 && (
//                   <Card>
//                     <CardContent className="p-4 sm:p-6">
//                       <div className="flex items-center gap-3 mb-3 sm:mb-4">
//                         <Tag className="h-5 w-5 text-[#9A7B4F]" />
//                         <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">
//                           Tags
//                         </h3>
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         {product.tags.map((tag, index) => (
//                           <Badge
//                             key={index}
//                             variant="outline"
//                             className="text-xs sm:text-sm"
//                           >
//                             {tag}
//                           </Badge>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )}

//                 {/* Care Instructions */}
//                 {product.careInstructions && (
//                   <Card>
//                     <CardContent className="p-4 sm:p-6">
//                       <div className="flex items-center gap-3 mb-3 sm:mb-4">
//                         <Shield className="h-5 w-5 text-[#9A7B4F]" />
//                         <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">
//                           Care Instructions
//                         </h3>
//                       </div>
//                       <p className="text-[#777] leading-relaxed text-sm sm:text-base">
//                         {product.careInstructions}
//                       </p>
//                     </CardContent>
//                   </Card>
//                 )}

//                 {/* Customization Options */}
//                 {product.customizationOptions &&
//                   product.customizationOptions.length > 0 && (
//                     <Card>
//                       <CardContent className="p-4 sm:p-6">
//                         <div className="flex items-center gap-3 mb-3 sm:mb-4">
//                           <Settings className="h-5 w-5 text-[#9A7B4F]" />
//                           <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">
//                             Customization Options
//                           </h3>
//                         </div>
//                         <div className="space-y-3 sm:space-y-4">
//                           {product.customizationOptions.map((option, index) => (
//                             <div
//                               key={index}
//                               className="p-3 sm:p-4 bg-gray-50 rounded-lg"
//                             >
//                               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
//                                 <h4 className="font-medium text-sm sm:text-base">
//                                   {option.label}
//                                 </h4>
//                                 <div className="flex items-center gap-2">
//                                   <Badge variant="outline" className="text-xs">
//                                     {option.type}
//                                   </Badge>
//                                   {option.required && (
//                                     <Badge
//                                       variant="destructive"
//                                       className="text-xs"
//                                     >
//                                       Required
//                                     </Badge>
//                                   )}
//                                 </div>
//                               </div>
//                               {option.values && option.values.length > 0 && (
//                                 <div className="flex flex-wrap gap-1">
//                                   {option.values.map((value, i) => (
//                                     <Badge
//                                       key={i}
//                                       variant="secondary"
//                                       className="text-xs"
//                                     >
//                                       {value}
//                                     </Badge>
//                                   ))}
//                                 </div>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}
//               </div>
//             </TabsContent>

//             <TabsContent value="reviews" className="mt-4 sm:mt-8">
//               <div className="space-y-4 sm:space-y-6">
//                 {/* Reviews Summary */}
//                 <Card>
//                   <CardContent className="p-4 sm:p-6">
//                     {/* Mobile: Single column, Desktop: Two columns */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                       <div className="text-center">
//                         <div className="text-3xl sm:text-4xl font-bold text-[#9A7B4F] mb-2">
//                           {product.rating.toFixed(1)}
//                         </div>
//                         <div className="flex items-center justify-center mb-2">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`h-4 w-4 sm:h-5 sm:w-5 ${
//                                 i < Math.floor(product.rating)
//                                   ? "fill-[#9A7B4F] text-[#9A7B4F]"
//                                   : "text-gray-300"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                         <p className="text-[#777] text-sm sm:text-base">
//                           Based on {product.reviewCount} reviews
//                         </p>
//                       </div>
//                       <div className="space-y-2">
//                         {[5, 4, 3, 2, 1].map((stars) => {
//                           const percentage =
//                             stars === 5
//                               ? 60
//                               : stars === 4
//                               ? 25
//                               : stars === 3
//                               ? 10
//                               : 5;
//                           const count = Math.floor(
//                             (percentage / 100) * product.reviewCount
//                           );
//                           return (
//                             <div
//                               key={stars}
//                               className="flex items-center gap-2"
//                             >
//                               <span className="text-xs sm:text-sm w-6 sm:w-8">
//                                 {stars}★
//                               </span>
//                               <div className="flex-1 bg-gray-200 rounded-full h-2">
//                                 <div
//                                   className="bg-[#9A7B4F] h-2 rounded-full"
//                                   style={{ width: `${percentage}%` }}
//                                 ></div>
//                               </div>
//                               <span className="text-xs sm:text-sm text-[#777] w-6 sm:w-8">
//                                 {count}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Placeholder for individual reviews */}
//                 <Card>
//                   <CardContent className="p-4 sm:p-6 text-center">
//                     <p className="text-[#777] text-sm sm:text-base">
//                       Individual reviews will be displayed here when review
//                       system is implemented.
//                     </p>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addToCart } from "@/store/slices/cart-slice"
import type { Product } from "@/types/product"
import {
  ShoppingCart,
  Share2,
  Truck,
  Shield,
  Star,
  Minus,
  Plus,
  CheckCircle,
  XCircle,
  Package,
  Ruler,
  Tag,
  Info,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isOrderingNow, setIsOrderingNow] = useState(false)

  // Use product images or fallback to main image
  const productImages =
    product.images.length > 0
      ? product.images.map((img) => img.url)
      : [product.image, product.image, product.image, product.image]

  const handleAddToCart = async () => {
    // Validate product pricing
    if (!product.pricing?.effectivePrice) {
      toast.error("Product pricing information is missing")
      return
    }

    setIsAddingToCart(true)

    try {
      // Create cart item with simplified structure
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.pricing.effectivePrice,
        image: product.image,
        quantity: quantity,
      }

      dispatch(addToCart(cartItem))
      toast.success(`Added ${product.name} to cart`)
    } catch (error) {
      toast.error("Failed to add item to cart")
      console.error("Add to cart error:", error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleOrderNow = async () => {
    // Validate product pricing
    if (!product.pricing?.effectivePrice) {
      toast.error("Product pricing information is missing")
      return
    }

    setIsOrderingNow(true)

    try {
      // Create cart item with simplified structure
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.pricing.effectivePrice,
        image: product.image,
        quantity: quantity,
      }

      // Add to cart
      dispatch(addToCart(cartItem))

      // Show success message
      toast.success(`Added ${product.name} to cart`)

      // Redirect to checkout after a brief delay
      setTimeout(() => {
        router.push("/checkout")
      }, 500)
    } catch (error) {
      toast.error("Failed to process order")
      console.error("Order now error:", error)
      setIsOrderingNow(false)
    }
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    const maxQuantity = product.stockQuantity || 10
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === "USD" ? "$" : currency === "PKR" ? "₨" : ""
    return `${symbol}${price.toFixed(2)}`
  }

  const getAvailabilityBadge = () => {
    switch (product.availability) {
      case "in-stock":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            In Stock
          </Badge>
        )
      case "out-of-stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      case "pre-order":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Pre-order
          </Badge>
        )
      case "discontinued":
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-600">
            Discontinued
          </Badge>
        )
      default:
        return null
    }
  }

  // Navigation functions for image carousel
  const goToPreviousImage = () => {
    setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  const goToNextImage = () => {
    setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPreviousImage()
    } else if (e.key === "ArrowRight") {
      goToNextImage()
    }
  }

  // Touch/swipe handling for mobile
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && productImages.length > 1) {
      goToNextImage()
    }
    if (isRightSwipe && productImages.length > 1) {
      goToPreviousImage()
    }
  }

  // Prevent body scroll on mobile when swiping images
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.target && (e.target as Element).closest(".image-carousel")) {
        e.preventDefault()
      }
    }

    document.addEventListener("touchmove", preventDefault, { passive: false })
    return () => document.removeEventListener("touchmove", preventDefault)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      {/* Mobile-optimized container */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Mobile: Single column, Desktop: Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Product Images - Mobile optimized */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image with Touch Support */}
            <div
              className="image-carousel aspect-square relative rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-lg group"
              onKeyDown={handleKeyDown}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              tabIndex={0}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={productImages[selectedImage] || "/placeholder.svg"}
                  alt={product.images[selectedImage]?.alt || product.name}
                  layout="responsive"
                  width={500}
                  height={500}
                  priority
                />
              </div>

              {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
              {productImages.length > 1 && (
                <>
                  {/* Left Arrow - Desktop only */}
                  <button
                    onClick={goToPreviousImage}
                    className="hidden sm:block absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
                  </button>

                  {/* Right Arrow - Desktop only */}
                  <button
                    onClick={goToNextImage}
                    className="hidden sm:block absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    {selectedImage + 1} / {productImages.length}
                  </div>
                </>
              )}

              {/* Overlay badges */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}

              {product.pricing.isOnSale && (
                <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-red-500 hover:bg-red-500 text-xs sm:text-sm">
                  Sale
                </Badge>
              )}
              {product.featured && (
                <Badge className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-500 hover:bg-yellow-500 text-xs sm:text-sm">
                  Featured
                </Badge>
              )}
            </div>

            {/* Image Thumbnails - Responsive grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-[#9A7B4F] ring-1 sm:ring-2 ring-[#9A7B4F]/20"
                      : "border-gray-200 hover:border-[#D1BFA7]"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={product.images[index]?.alt || `${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {/* Thumbnail indicator */}
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-[#9A7B4F]/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#9A7B4F] rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Navigation Dots for Mobile */}
            {productImages.length > 1 && (
              <div className="flex justify-center gap-2 sm:hidden">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedImage === index ? "bg-[#9A7B4F]" : "bg-gray-300"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Information - Mobile optimized */}
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div>
              {/* Mobile: Stack badges vertically, Desktop: Horizontal */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-[#9A7B4F] hover:bg-[#9A7B4F] text-xs sm:text-sm">{product.material}</Badge>
                {getAvailabilityBadge()}
                <Badge variant="outline" className="text-xs sm:text-sm">
                  {product.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              </div>

              {/* Mobile: Smaller title, Desktop: Large title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#2E2C2A] mb-2 sm:mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">SKU: {product.sku}</p>

              {/* Rating - Mobile optimized */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          i < Math.floor(product.rating) ? "fill-[#9A7B4F] text-[#9A7B4F]" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#777] text-sm">({product.reviewCount})</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">{product.viewCount} views</span>
              </div>

              {/* Pricing - Mobile optimized */}
              <div className="mb-4 sm:mb-6">
                {product.pricing.isOnSale && product.pricing.originalPrice ? (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-3xl sm:text-4xl font-bold text-red-600">
                      {formatPrice(product.pricing.effectivePrice, product.pricing.currency)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl text-gray-500 line-through">
                        {formatPrice(product.pricing.originalPrice, product.pricing.currency)}
                      </span>
                      <Badge className="bg-red-500 hover:bg-red-500 text-xs">
                        Save{" "}
                        {formatPrice(
                          product.pricing.originalPrice - product.pricing.effectivePrice,
                          product.pricing.currency,
                        )}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <span className="text-3xl sm:text-4xl font-bold text-[#9A7B4F]">
                    {formatPrice(product.pricing.effectivePrice, product.pricing.currency)}
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <div>
              <p className="text-[#777] text-base sm:text-lg leading-relaxed">{product.shortDescription}</p>
            </div>

            {/* Quantity and Add to Cart - Mobile optimized */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <span className="font-medium text-sm sm:text-base">Quantity:</span>
                <div className="flex items-center justify-between sm:justify-start">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="h-10 w-10 sm:h-10 sm:w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (product.stockQuantity || 10)}
                      className="h-10 w-10 sm:h-10 sm:w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {product.stockQuantity && (
                    <span className="text-xs sm:text-sm text-gray-500 ml-3 sm:ml-0">Max: {product.stockQuantity}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons - Mobile optimized */}
              <div className="space-y-3">
                {/* Primary Actions - Mobile: Stack vertically, Desktop: Horizontal */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || product.availability === "discontinued" || isAddingToCart}
                    className="flex-1 bg-[#4A3F35] hover:bg-[#4A3F35]/90 py-3 sm:py-3 text-base sm:text-lg disabled:opacity-50"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {isAddingToCart ? "Adding..." : product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>

                  <Button
                    onClick={handleOrderNow}
                    disabled={!product.inStock || product.availability === "discontinued" || isOrderingNow}
                    className="flex-1 bg-[#9A7B4F] hover:bg-[#9A7B4F]/90 py-3 sm:py-3 text-base sm:text-lg disabled:opacity-50"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    {isOrderingNow ? "Processing..." : "Order Now"}
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleShare} className="flex-1 sm:flex-none bg-transparent">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Shipping & Returns - Mobile optimized */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-[#9A7B4F] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">Shipping Info</p>
                      <p className="text-xs sm:text-sm text-[#777] break-words">
                        {product.shippingInfo || "Standard shipping available"}
                      </p>
                    </div>
                  </div>
                  {product.warranty && (
                    <>
                      <Separator />
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-[#9A7B4F] flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="font-medium text-sm sm:text-base">Warranty</p>
                          <p className="text-xs sm:text-sm text-[#777] break-words">{product.warranty}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Customization CTA - Mobile optimized */}
            {product.isCustomizable && (
              <Card className="bg-gradient-to-r from-[#4A3F35] to-[#9A7B4F] text-white">
                <CardContent className="p-4 sm:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Customizable Product</h3>
                  <p className="mb-4 opacity-90 text-sm sm:text-base">
                    This product can be customized to your specifications
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-white text-[#4A3F35] hover:bg-white/90 w-full sm:w-auto"
                  >
                    <Link href={`/customize/${product.id}`}>Customize This Product</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Custom Design CTA - Always shown */}
            <Card className="bg-gradient-to-r from-[#4A3F35] to-[#9A7B4F] text-white">
              <CardContent className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Want Something Custom?</h3>
                <p className="mb-4 opacity-90 text-sm sm:text-base">
                  Create a personalized version of this design with your own specifications
                </p>
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white text-[#4A3F35] hover:bg-white/90 w-full sm:w-auto"
                >
                  <Link href="/customize">Customize This Design</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs - Mobile optimized */}
        <div className="mt-8 sm:mt-16">
          <Tabs defaultValue="details" className="w-full">
            {/* Mobile: Smaller tabs */}
            <TabsList className="grid w-full grid-cols-2 h-auto">
              <TabsTrigger value="details" className="text-sm sm:text-base py-2 sm:py-3">
                Product Details
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-sm sm:text-base py-2 sm:py-3">
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4 sm:mt-8">
              <div className="space-y-4 sm:space-y-6">
                {/* Long Description */}
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <Info className="h-5 w-5 text-[#9A7B4F]" />
                      <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">About This Product</h3>
                    </div>
                    <p className="text-[#777] leading-relaxed text-sm sm:text-base">{product.description}</p>
                  </CardContent>
                </Card>

                {/* Key Features */}
                {product.features && product.features.length > 0 && (
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">Key Features</h3>
                      </div>
                      {/* Mobile: Single column, Desktop: Two columns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-[#2E2C2A] text-sm sm:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Specifications */}
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <Package className="h-5 w-5 text-[#9A7B4F]" />
                      <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">Specifications</h3>
                    </div>
                    {/* Mobile: Single column, Desktop: Two columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h4 className="font-medium text-[#2E2C2A] mb-3 text-sm sm:text-base">Product Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-[#777] text-sm sm:text-base">Material:</span>
                            <span className="font-medium text-sm sm:text-base">{product.material}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-[#777] text-sm sm:text-base">Category:</span>
                            <span className="font-medium text-sm sm:text-base">
                              {product.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-[#777] text-sm sm:text-base">SKU:</span>
                            <span className="font-mono text-xs sm:text-sm break-all">{product.sku}</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-[#777] text-sm sm:text-base">Customizable:</span>
                            <span className="font-medium text-sm sm:text-base">
                              {product.isCustomizable ? "Yes" : "No"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#2E2C2A] mb-3 text-sm sm:text-base">Availability</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-[#777] text-sm sm:text-base">Status:</span>
                            <span className="font-medium capitalize text-sm sm:text-base">
                              {product.availability.replace("-", " ")}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-[#777] text-sm sm:text-base">In Stock:</span>
                            <div className="flex items-center gap-2">
                              {product.inStock ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              <span
                                className={`font-medium text-sm sm:text-base ${
                                  product.inStock ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {product.inStock ? "Yes" : "No"}
                              </span>
                            </div>
                          </div>
                          {product.stockQuantity && (
                            <div className="flex justify-between py-2">
                              <span className="text-[#777] text-sm sm:text-base">Quantity Available:</span>
                              <span className="font-medium text-sm sm:text-base">{product.stockQuantity} units</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dimensions */}
                {product.dimensions && Object.values(product.dimensions).some((v) => v) && (
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <Ruler className="h-5 w-5 text-[#9A7B4F]" />
                        <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">Dimensions</h3>
                      </div>
                      {/* Mobile: 2 columns, Desktop: 4 columns */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        {product.dimensions.width && (
                          <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs sm:text-sm text-[#777] mb-1">Width</p>
                            <p className="font-medium text-sm sm:text-base">{product.dimensions.width}</p>
                          </div>
                        )}
                        {product.dimensions.height && (
                          <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs sm:text-sm text-[#777] mb-1">Height</p>
                            <p className="font-medium text-sm sm:text-base">{product.dimensions.height}</p>
                          </div>
                        )}
                        {product.dimensions.depth && (
                          <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs sm:text-sm text-[#777] mb-1">Depth</p>
                            <p className="font-medium text-sm sm:text-base">{product.dimensions.depth}</p>
                          </div>
                        )}
                        {product.dimensions.weight && (
                          <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs sm:text-sm text-[#777] mb-1">Weight</p>
                            <p className="font-medium text-sm sm:text-base">{product.dimensions.weight}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <Tag className="h-5 w-5 text-[#9A7B4F]" />
                        <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">Tags</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs sm:text-sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Care Instructions */}
                {product.careInstructions && (
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <Shield className="h-5 w-5 text-[#9A7B4F]" />
                        <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">Care Instructions</h3>
                      </div>
                      <p className="text-[#777] leading-relaxed text-sm sm:text-base">{product.careInstructions}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Customization Options */}
                {product.customizationOptions && product.customizationOptions.length > 0 && (
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <Settings className="h-5 w-5 text-[#9A7B4F]" />
                        <h3 className="text-lg sm:text-xl font-semibold text-[#2E2C2A]">Customization Options</h3>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {product.customizationOptions.map((option, index) => (
                          <div key={index} className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                              <h4 className="font-medium text-sm sm:text-base">{option.label}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {option.type}
                                </Badge>
                                {option.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    Required
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {option.values && option.values.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {option.values.map((value, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {value}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4 sm:mt-8">
              <div className="space-y-4 sm:space-y-6">
                {/* Reviews Summary */}
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    {/* Mobile: Single column, Desktop: Two columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-[#9A7B4F] mb-2">
                          {product.rating.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 sm:h-5 sm:w-5 ${
                                i < Math.floor(product.rating) ? "fill-[#9A7B4F] text-[#9A7B4F]" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-[#777] text-sm sm:text-base">Based on {product.reviewCount} reviews</p>
                      </div>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const percentage = stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : 5
                          const count = Math.floor((percentage / 100) * product.reviewCount)
                          return (
                            <div key={stars} className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm w-6 sm:w-8">{stars}★</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-[#9A7B4F] h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs sm:text-sm text-[#777] w-6 sm:w-8">{count}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Placeholder for individual reviews */}
                <Card>
                  <CardContent className="p-4 sm:p-6 text-center">
                    <p className="text-[#777] text-sm sm:text-base">
                      Individual reviews will be displayed here when review system is implemented.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
