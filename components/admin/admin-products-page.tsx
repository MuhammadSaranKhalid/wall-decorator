"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Package,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductFormDialog } from "./product-form-dialog";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { db } from "@/lib/firebase";

export function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [materialFilter, setMaterialFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, materialFilter, stockFilter]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      let loadedProducts: Product[] = [];

      // if (isFirebaseConfigured()) {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          loadedProducts.push({
            id: doc.id,
            ...doc.data(),
          } as Product);
        });

        console.log(
          "Loaded from Firestore:",
          loadedProducts.length,
          "products"
        );
      } catch (firebaseError) {
        console.log(
          "Firestore load failed, using localStorage:",
          firebaseError
        );
        // loadedProducts = loadFromLocalStorage()
      }
      // } else {
      //   console.log("Firebase not configured, using localStorage")
      //   // Load from localStorage for demo
      //   loadedProducts = loadFromLocalStorage()
      // }

      setProducts(loadedProducts);
    } catch (error) {
      console.error("Error loading products:", error);
      // Fallback to sample data
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Material filter
    if (materialFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.material === materialFilter
      );
    }

    // Stock filter
    if (stockFilter !== "all") {
      if (stockFilter === "in-stock") {
        filtered = filtered.filter((product) => product.inStock);
      } else if (stockFilter === "out-of-stock") {
        filtered = filtered.filter((product) => !product.inStock);
      }
    }

    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeletingProduct(product);
  };

  const confirmDelete = async () => {
    if (!deletingProduct) return;

    try {
      // if (isFirebaseConfigured()) {
      try {
        const productRef = doc(db, "products", deletingProduct.id);
        await deleteDoc(productRef);
        console.log("Deleted from Firestore successfully");
      } catch (firebaseError) {
        console.log(
          "Firestore delete failed, using localStorage:",
          firebaseError
        );
        deleteFromLocalStorage(deletingProduct.id);
      }

      // Refresh the products list
      await loadProducts();
      setDeletingProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Fallback to local state update
      const updatedProducts = products.filter(
        (p) => p.id !== deletingProduct.id
      );
      setProducts(updatedProducts);
      setDeletingProduct(null);
    }
  };

  const deleteFromLocalStorage = (productId: string) => {
    try {
      const products = JSON.parse(
        localStorage.getItem("demo-products") || "[]"
      );
      const updatedProducts = products.filter((p: any) => p.id !== productId);
      localStorage.setItem("demo-products", JSON.stringify(updatedProducts));
    } catch (error) {
      console.error("Error deleting from localStorage:", error);
    }
  };

  const toggleStock = async (product: Product) => {
    try {
      // if (isFirebaseConfigured()) {
      try {
        console.log("Attempting to update stock in Firestore...");
        // Try to update in Firestore

        const productRef = doc(db, "products", product.id);
        await updateDoc(productRef, {
          inStock: !product.inStock,
          updatedAt: new Date(),
        });
        console.log("Updated stock in Firestore successfully");
      } catch (firebaseError) {
        console.log(
          "Firestore update failed, using localStorage:",
          firebaseError
        );
        updateStockInLocalStorage(product.id, !product.inStock);
      }
      // } else {
      //   // Update in localStorage for demo
      //   updateStockInLocalStorage(product.id, !product.inStock)
      // }

      // Refresh the products list
      await loadProducts();
    } catch (error) {
      console.error("Error updating stock:", error);
      // Fallback to local state update
      const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, inStock: !p.inStock } : p
      );
      setProducts(updatedProducts);
    }
  };

  const updateStockInLocalStorage = (productId: string, inStock: boolean) => {
    try {
      const products = JSON.parse(
        localStorage.getItem("demo-products") || "[]"
      );
      const updatedProducts = products.map((p: any) =>
        p.id === productId
          ? { ...p, inStock, updatedAt: new Date().toISOString() }
          : p
      );
      localStorage.setItem("demo-products", JSON.stringify(updatedProducts));
    } catch (error) {
      console.error("Error updating stock in localStorage:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Button onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={materialFilter} onValueChange={setMaterialFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Materials</SelectItem>
                <SelectItem value="Glass">Glass</SelectItem>
                <SelectItem value="Wood">Wood</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Products ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                {products.length === 0
                  ? "Get started by adding your first product."
                  : "Try adjusting your search or filter criteria."}
              </p>
              {products.length === 0 && (
                <Button onClick={handleAddProduct}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Product
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      SKU
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Material
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Stock
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {product.shortDescription}
                            </p>
                            {(product as any).featured && (
                              <Badge variant="secondary" className="text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-mono">{product.sku}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">
                          {(product as any).category || "Uncategorized"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{product.material}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          {product.pricing.isOnSale &&
                          product.pricing.salePrice ? (
                            <div>
                              <span className="font-medium text-red-600">
                                {product.pricing.currency === "USD"
                                  ? "$"
                                  : product.pricing.currency === "PKR"
                                  ? "₨"
                                  : ""}
                                {product.pricing.effectivePrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-1">
                                {product.pricing.currency === "USD"
                                  ? "$"
                                  : product.pricing.currency === "PKR"
                                  ? "₨"
                                  : ""}
                                {product.pricing.originalPrice}
                              </span>
                            </div>
                          ) : (
                            <span className="font-medium">
                              {product.pricing.currency === "USD"
                                ? "$"
                                : product.pricing.currency === "PKR"
                                ? "₨"
                                : ""}
                              {product.pricing.effectivePrice}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <button
                            onClick={() => toggleStock(product)}
                            className={`text-sm px-2 py-1 rounded ${
                              product.inStock
                                ? "text-green-700 bg-green-100 hover:bg-green-200"
                                : "text-red-700 bg-red-100 hover:bg-red-200"
                            }`}
                          >
                            {product.stockQuantity || 0} units
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          <Badge
                            className={
                              product.inStock ? "bg-green-600" : "bg-red-600"
                            }
                          >
                            {product.availability
                              .replace("-", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {product.status.charAt(0).toUpperCase() +
                              product.status.slice(1)}
                          </Badge>
                          {product.pricing.isOnSale && (
                            <Badge variant="secondary" className="text-xs">
                              On Sale
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/products/${product.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => toggleStock(product)}
                                className={
                                  product.inStock
                                    ? "text-red-600"
                                    : "text-green-600"
                                }
                              >
                                <Package className="h-4 w-4 mr-2" />
                                {product.inStock
                                  ? "Mark Out of Stock"
                                  : "Mark In Stock"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteProduct(product)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Form Dialog */}
      <ProductFormDialog
        open={showProductForm}
        onOpenChange={setShowProductForm}
        product={editingProduct}
        onSave={loadProducts}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={!!deletingProduct}
        onOpenChange={() => setDeletingProduct(null)}
        title="Delete Product"
        description={`Are you sure you want to delete "${deletingProduct?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
