import { type NextRequest, NextResponse } from "next/server"
import { ProductService } from "@/lib/firebase-service"
// import { verifyAdminToken } from "@/lib/firebaseAdmin"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    // await verifyAdminToken(token)

    const products = await ProductService.getAllProducts()
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    // const admin = await verifyAdminToken(token)

    const productData = await request.json()
    const productId = await ProductService.createProduct(productData, "admin-user")

    return NextResponse.json({
      success: true,
      productId,
      message: "Product created successfully",
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
