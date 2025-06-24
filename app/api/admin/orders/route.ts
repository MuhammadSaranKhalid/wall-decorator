import { type NextRequest, NextResponse } from "next/server"
// import { verifyAdminToken } from "@/lib/firebase-admin"
import { OrderService } from "@/lib/firebase-service"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split("Bearer ")[1]
    // await verifyAdminToken(token)

    const orders = await OrderService.getAllOrders()
    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
