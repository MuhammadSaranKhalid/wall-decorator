"use client";

import { ProductGrid } from "@/components/products/product-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/slices/products-slice";
import type { RootState, AppDispatch } from "@/store/store";
import { Loader2 } from "lucide-react";
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // if (loading) {
  //   return (
  //     <div className="container mx-auto px-4 py-16 flex items-center justify-center">
  //       <Loader2 className="h-8 w-8 animate-spin" />
  //       <span className="ml-2">Loading products...</span>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-600">Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-8">
      <div className="hidden md:flex flex-col mb-8">
        <h1 className=" text-4xl font-bold text-[#2E2C2A] mb-4">
          Our Collection
        </h1>
        <p className="text-[#777] text-lg">
          Discover our handcrafted wall decorative items made from premium glass
          and wood
        </p>
      </div>
      {loading ? (
        <div className="md:space-y-8">
          {/* Header skeleton for loading state */}
          <div className="hidden md:flex flex-col animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>

          {/* Product grid skeleton */}
          <ProductGridSkeleton count={12} />
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
      {/* <ProductGrid products={products} /> */}
    </div>
  );
}
