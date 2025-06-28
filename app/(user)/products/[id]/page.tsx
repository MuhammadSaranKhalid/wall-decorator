"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { RelatedProducts } from "@/components/products/related-products";
import type { Product } from "@/types/product";
import { Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!params.id) {
        setError("Product ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const productId = params.id as string;

        // Fetch the main product
        const productRef = doc(db, "products", productId);
        const docSnapshot = await getDoc(productRef);

        if (!docSnapshot.exists()) {
          setError("Product not found");
          return;
        }

        const data = docSnapshot.data();
        const fetchedProduct: Product = {
          id: docSnapshot.id,
          ...data,
          // Handle Firestore Timestamp conversion
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        } as Product;

        setProduct(fetchedProduct);

        // Fetch related products based on category or material
        await fetchRelatedProducts(fetchedProduct, productId);

      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (currentProduct: Product, productId: string) => {
      try {
        // Query related products by category first, then by material as fallback
        let relatedQuery = query(
          collection(db, "products"),
          where("category", "==", currentProduct.category),
          limit(5) // Get 5 to filter out current product
        );

        let querySnapshot = await getDocs(relatedQuery);
        let related: Product[] = [];

        querySnapshot.forEach((doc) => {
          if (doc.id !== productId) { // Exclude current product
            const data = doc.data();
            related.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate?.() || data.createdAt,
              updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
            } as Product);
          }
        });

        // If not enough related products by category, try by material
        if (related.length < 4 && currentProduct.material) {
          const materialQuery = query(
            collection(db, "products"),
            where("material", "==", currentProduct.material),
            limit(5)
          );

          const materialSnapshot = await getDocs(materialQuery);
          materialSnapshot.forEach((doc) => {
            if (doc.id !== productId && !related.find(p => p.id === doc.id)) {
              const data = doc.data();
              related.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate?.() || data.createdAt,
                updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
              } as Product);
            }
          });
        }

        // Limit to 4 related products
        setRelatedProducts(related.slice(0, 4));
      } catch (err) {
        console.error("Error fetching related products:", err);
        // Don't set error state for related products failure
        setRelatedProducts([]);
      }
    };

    fetchProductData();
  }, [params.id]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2E2C2A]" />
        <span className="ml-2 text-[#2E2C2A]">Loading product...</span>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-[#2E2C2A] mb-4">
          {error?.includes("not found") ? "Product Not Found" : "Something went wrong"}
        </h1>
        <p className="text-[#777] mb-6">
          {error || "The product you're looking for doesn't exist."}
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-[#2E2C2A] text-white rounded-md hover:bg-[#3E3C3A] transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <ProductDetail product={product} />
      
      {/* Show related products if available */}
      {/* {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <RelatedProducts products={relatedProducts} />
        </div>
      )} */}
    </div>
  );
}